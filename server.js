// ===================== BEGIN: server.js (/api/book) =====================

import 'dotenv/config'
                     // <-- load .env
import express from 'express'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import { createEvent } from 'ics'
import { parseISO } from 'date-fns'

const app = express()
app.use(express.json())

// --- Optional: allow your frontend only (CORS-light) ---
const allowed = process.env.ALLOWED_ORIGIN || '*'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowed)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Booking-Key')
  if (req.method === 'OPTIONS') return res.status(204).end()
  next()
})

// --- Stripe ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// --- Identity used in emails/ICS ---
const YOUR_FROM_EMAIL   = 'austinamadi.e@gmail.com'  // <-- fixed quote
const YOUR_DISPLAY_NAME = 'Austin Amadi'

// --- SMTP transport ---
const smtpPort = Number(process.env.SMTP_PORT || 587)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,                   // 465 = SMTPS
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
})

// --- Helper: build ICS (UTC) ---
function makeIcs({ name, email, start, durationMins }) {
  const y  = start.getUTCFullYear()
  const m  = start.getUTCMonth() + 1
  const d  = start.getUTCDate()
  const hh = start.getUTCHours()
  const mm = start.getUTCMinutes()
  return new Promise((resolve, reject) => {
    createEvent({
      title: 'Coaching Session',
      description: 'Your life coaching session with Austin Amadi.',
      organizer: { name: YOUR_DISPLAY_NAME, email: YOUR_FROM_EMAIL },
      attendees: [{ name, email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }],
      start: [y, m, d, hh, mm],               // UTC
      duration: { minutes: durationMins },
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      productId: 'AustinAmadiSite',
      calName: 'Coaching Sessions'
    }, (err, value) => err ? reject(err) : resolve(value))
  })
}

// --- Booking endpoint ---
app.post('/api/book', async (req, res) => {
  try {
    // Optional shared secret to block random posts
    if (process.env.BOOKING_SECRET) {
      const key = req.headers['x-booking-key']
      if (!key || key !== process.env.BOOKING_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
    }

    const { session_id, name, email, date, time, duration = 60 } = req.body || {}
    if (!session_id || !name || !email || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields.' })
    }

    // 1) Verify paid in Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not verified.' })
    }

    // 2) Convert local date+time to UTC
    const startLocal = parseISO(`${date}T${time}:00`)             // local
    const startUtc   = new Date(startLocal.getTime() - startLocal.getTimezoneOffset() * 60000)

    // 3) Create ICS
    const ics = await makeIcs({ name, email, start: startUtc, durationMins: Number(duration) })
    const attachments = [{ filename: 'coaching-session.ics', content: ics, contentType: 'text/calendar; charset=utf-8' }]

    // 4) Send to client
    await transporter.sendMail({
      from: `"${YOUR_DISPLAY_NAME}" <${YOUR_FROM_EMAIL}>`,
      to: email,
      subject: 'Your Coaching Session Confirmation',
      text: `Hi ${name},\n\nYour session is booked for ${date} ${time}. An invite is attached.\n\n— ${YOUR_DISPLAY_NAME}`,
      html: `<p>Hi ${name},</p><p>Your session is booked for <strong>${date} ${time}</strong>. An invite is attached.</p><p>— ${YOUR_DISPLAY_NAME}</p>`,
      attachments
    })

    // 5) Send copy to you
    await transporter.sendMail({
      from: `"${YOUR_DISPLAY_NAME}" <${YOUR_FROM_EMAIL}>`,
      to: YOUR_FROM_EMAIL,
      subject: `New booking: ${name} — ${date} ${time}`,
      text: `Client: ${name} <${email}>\nDate: ${date}\nTime: ${time}\nDuration: ${duration} minutes`,
      html: `<p><strong>Client:</strong> ${name} &lt;${email}&gt;</p><p><strong>Date:</strong> ${date}</p><p><strong>Time:</strong> ${time}</p><p><strong>Duration:</strong> ${duration} minutes</p>`,
      attachments
    })

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Booking failed. Please try again.' })
  }
})
