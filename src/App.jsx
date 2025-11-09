
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import LandingHero from "@/components/LandingHero";

const PAYLINKS = {
  "emotional-intelligence": "https://buy.stripe.com/xxx_emotional_intelligence",
  "domestic-conflict-resolution": "https://buy.stripe.com/xxx_domestic_conflict_resolution",
  "back-to-basics": "https://buy.stripe.com/xxx_back_to_basics",
  "clarity-coaching": "https://buy.stripe.com/xxx_clarity_coaching"
};

function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "About", path: createPageUrl("About") },
    { name: "Methodology", path: createPageUrl("Methodology") },
    { name: "Publications", path: createPageUrl("Publications") },
    { name: "Contact", path: createPageUrl("Contact") },
  ];
  return (
    <div className="min-h-screen bg-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled?"backdrop-blur bg-white/80 shadow border-b border-white/40":"bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
              <img
                src="/profile.jpg"
                alt="Austin Amadi"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  Austin Amadi
                </span>
                <span className="text-xs text-gray-500 font-medium">Life Transformation Coach</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl ${location.pathname===item.path?"text-white":"text-gray-900 hover:text-indigo-600"}`}>
                  {location.pathname===item.path && (<span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl"/>)}
                  <span className="relative">{item.name}</span>
                </Link>
              ))}
              <Link to={createPageUrl("BookSession")} className="ml-4">
                <Button className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white border-0 px-6">
                  <span className="relative z-10 flex items-center"><Calendar className="w-4 h-4 mr-2"/>Book Session</span>
                </Button>
              </Link>
            </nav>
            <button onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
              {isMobileMenuOpen? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur bg-white/90 border-t">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={()=>setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl font-semibold hover:bg-gray-50">{item.name}</Link>
              ))}
              <Link to={createPageUrl("BookSession")} onClick={()=>setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-xl text-white mt-2">
                  <Calendar className="w-4 h-4 mr-2"/>Book Session
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
      

      <main className="pt-20">{children}</main>
      <footer className="bg-gray-900 text-white mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div><div className="text-2xl font-bold">Austin Amadi</div><p className="text-gray-400 mt-2">Empowering individuals to unlock their full potential through transformative life coaching.</p></div>
            <div><div className="font-bold mb-2">Quick Links</div><ul className="space-y-2">{navItems.map(i=>(<li key={i.name}><Link to={i.path} className="text-gray-300 hover:text-white">{i.name}</Link></li>))}</ul></div>
            <div><div className="font-bold mb-2">Get Started</div><Link to={createPageUrl("BookSession")}><Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mb-3">Book a Session</Button></Link><Link to={createPageUrl("Publications")}><Button variant="outline" className="w-full">Publications</Button></Link></div>
          </div>
          <div className="mt-6 text-sm text-gray-400">© {new Date().getFullYear()} Austin Amadi. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// ===================== BEGIN: NEW SELLING POINTS BAND (MOVED OUT OF HERO) =====================
function SellingPoints(){
  return (
    <section id="selling-points" className="py-16 relative border-y border-black/5 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">What you’ll get</h2>
        <p className="flex flex-wrap gap-3 justify-center mb-4">
          <span className="inline-flex items-center font-bold px-3 py-2 rounded-full text-gray-900"
                style={{background: "linear-gradient(135deg,#FFE28A,#FFB86C)"}}>
            Life transformation coaching
          </span>
          <span className="inline-flex items-center font-bold px-3 py-2 rounded-full text-gray-900"
                style={{background: "linear-gradient(135deg,#A9F1DF,#FFBBBB)"}}>
            Evidence-based
          </span>
          <span className="inline-flex items-center font-bold px-3 py-2 rounded-full text-gray-900"
                style={{background: "linear-gradient(135deg,#B7A0FF,#77E2FE)"}}>
            Lasting results
          </span>
        </p>
        <p className="text-center text-slate-700 max-w-2xl mx-auto">
          Practical frameworks, compassionate accountability, and tools grounded in science—so breakthroughs <em>stick</em>.
        </p>
      </div>
    </section>
  );
}
// ====================== END: NEW SELLING POINTS BAND (MOVED OUT OF HERO) ======================

// ===================== BEGIN: HOME PAGE =====================
function HomePage(){
  return (
    <div className="overflow-hidden bg-white">
      {/* Landing hero - uses public/BACKGROUND.png
         - We KEEP your hero LOOK.
         - We REMOVE the booking button from the hero by passing ctaPrimary={null}.
         - The disliked text is NOT rendered here; it's moved to SellingPoints below.
      */}
      {/* Landing hero - keep look, remove that section */}
<LandingHero
  ctaPrimary={null}           // hides "Book a session" in hero
  ctaSecondary={null}         // hides "Explore publications" in hero
  buttonColor="bg-blue-700"
  hideTagline                 // hides: Life transformation coaching • Evidence-based • Lasting results
  hideBooking                 // (safe no-op if unsupported)
/>
      {/* NEW: The three-pillars text moved to its own colored band below */}
      <SellingPoints />

      {/* Remaining sections below the hero */}
      <IntroVideo />
      <Methodology />
      <Publications />
      <Contact />
    </div>
  );
}
// ====================== END: HOME PAGE ======================

// Pages kept the same
function AboutPage(){ return (<><IntroVideo /></>); }
function MethodologyPage(){ return (<><Methodology /></>); }
function PublicationsPage(){ return (<><Publications /></>); }
function ContactPage(){ return (<><Contact /></>); }

function BookSessionPage(){
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center">Book a Session</h1>
      <p className="text-slate-700 mt-2 text-center">Choose 30 or 60 minutes. You'll receive confirmation by email.</p>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-xl font-semibold">30 minutes</div>
          <div className="text-3xl font-black mt-1">$50</div>
          <a
            href="https://buy.stripe.com/test_bJe9AT0uf0OW1Blari7Vm02"
            className="mt-4 inline-flex items-center rounded-2xl px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow"
          >
            Select
          </a>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-xl font-semibold">60 minutes</div>
          <div className="text-3xl font-black mt-1">$70</div>
          <a
            href="https://buy.stripe.com/test_aFa7sL7WH55c2FpeHy7Vm01"
            className="mt-4 inline-flex items-center rounded-2xl px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow"
          >
            Select
          </a>
        </div>
      </div>
    </section>
  );
}

// Sections (unchanged)
function IntroVideo(){
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">About Austin</h2>
          <p className="text-slate-700">Certified life coach with a background in behavioral science and systems design.</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>ICF-aligned coaching practices</li>
            <li>Evidence-based tools and warm accountability</li>
            <li>Flexible, outcome-oriented packages</li>
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden ring-1 ring-black/10 bg-white shadow-xl">
          <div className="aspect-video bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center"><Play className="w-12 h-12 ml-2" /></div>
              <p className="text-xl font-bold mb-2">Watch My Introduction</p>
              <p className="text-sm opacity-80">3 minutes that could change your life</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Methodology(){
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Methodology</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Clarity Mapping", text: "Define meaningful goals and success metrics." },
            { title: "System Design", text: "Create weekly routines that fit your reality." },
            { title: "Accountability", text: "Stay consistent with structured check-ins." },
            { title: "Resilience", text: "Operate under pressure with confidence." },
          ].map((card) => (
            <div key={card.title} className="bg-white/10 rounded-2xl p-6">
              <div className="text-xl font-semibold">{card.title}</div>
              <div className="text-white/90 mt-2">{card.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const books = [
  { slug: "foundations-of-clarity", title: "Foundations of Clarity", price: 19, cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1600&auto=format&fit=crop", description: "A practical guide to goal clarity and weekly planning.", downloadUrl: "/downloads/foundations-of-clarity.pdf" },
  { slug: "habits-that-stick", title: "Habits That Stick", price: 24, cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop", description: "Build reliable habits without willpower theatrics.", downloadUrl: "/downloads/habits-that-stick.pdf" },
  { slug: "systems-for-creatives", title: "Systems for Creatives", price: 21, cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=1600&auto=format&fit=crop", description: "Organize your creative energy into consistent output.", downloadUrl: "/downloads/systems-for-creatives.pdf" },
];

function Publications(){
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-6">Events & Publications</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b)=>(<BookCard key={b.slug} book={b} />))}
      </div>
    </section>
  );
}

function BookCard({ book }){
  const [open, setOpen] = useState(false);
  return (
    <div className="group rounded-2xl overflow-hidden ring-1 ring-black/10 bg-white shadow-sm hover:shadow-lg transition-shadow">
      <img src={book.cover} alt={book.title} className="h-48 w-full object-cover"/>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-slate-700 text-sm">{book.description}</p>
          </div>
          <div className="font-bold">${book.price}</div>
        </div>
        <div className="flex gap-3">
          <button onClick={()=>setOpen(true)} className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-sky-600 text-white shadow hover:opacity-95">Buy</button>
          <a href="#contact" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 ring-1 ring-slate-300">Ask a question</a>
        </div>
      </div>
      {open && <CheckoutModal book={book} onClose={()=>setOpen(false)} />}
    </div>
  );
}

function CheckoutModal({ book, onClose }){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(true);
  const [processing, setProcessing] = useState(false);
  const simulate = true; // keep true for demo

  const handlePay = async () => {
    setProcessing(true);
    if (simulate) {
      await new Promise(r=>setTimeout(r,1000));
      // fake "download after payment"
      triggerDownload(book.downloadUrl, `${book.slug}.pdf`);
      onClose();
      alert("Payment successful! Your download has started.");
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl bg-white ring-1 ring-black/10 shadow-2xl">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Buy: {book.title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Full name" value={name} onChange={setName} placeholder="Jane Doe" />
          <Field label="Email" value={email} onChange={setEmail} placeholder="jane@example.com" type="email" />
          <div className="flex items-center gap-2">
            <input id="agree" type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="h-4 w-4"/>
            <label htmlFor="agree" className="text-sm text-slate-700">I agree to receive the download link via email.</label>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">Total: ${book.price}.00</div>
            <button disabled={!name || !email || !agree || processing} onClick={handlePay} className="inline-flex items-center rounded-2xl px-4 py-2 bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow disabled:opacity-50">
              {processing ? "Processing…" : "Pay & Download"}
            </button>
          </div>
          <p className="text-xs text-slate-500">Secure checkout powered by Stripe (connect later).</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type="text" }){
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-2xl ring-1 ring-slate-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 outline-none"/>
    </label>
  );
}

function triggerDownload(url, filename){
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
}

function Contact(){
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>
      <p className="text-slate-700 mb-4">Ready to level up? Send a message and I’ll reply within 24 hours.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Name" value={""} onChange={()=>{}} placeholder="Your name" />
        <Field label="Email" value={""} onChange={()=>{}} placeholder="you@example.com" type="email" />
      </div>
      <label className="block mt-4">
        <span className="text-sm font-medium">Message</span>
        <textarea rows="4" className="mt-1 w-full rounded-2xl ring-1 ring-slate-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="Tell me about your goals"></textarea>
      </label>
      <Button className="mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">Send</Button>
    </section>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Layout><HomePage /></Layout>} />
        <Route path="/About" element={<Layout><AboutPage /></Layout>} />
        <Route path="/Methodology" element={<Layout><MethodologyPage /></Layout>} />
        <Route path="/Publications" element={<Layout><PublicationsPage /></Layout>} />
        <Route path="/Contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/BookSession" element={<Layout><BookSessionPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
// ====================== END: MINIMAL UPDATE (KEEP LANDING PAGE) ======================
