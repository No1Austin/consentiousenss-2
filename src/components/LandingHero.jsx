// src/components/LandingHero.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingHero({ ctaPrimary = "/BookSession", ctaSecondary = "/Publications", buttonColor = "bg-blue-700" }) {
  // parallax offset
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.18); // subtle parallax
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image (absolute) - parallax transform */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          
          transform: `translateY(${offset}px) scale(1.02)`,
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* overlay for legibility */}
      <div className="absolute inset-0 bg-black/45" />

      {/* content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 100, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-5xl text-center"
        >
          {/* floating centered logo (uses same image to preserve look) */}
          <motion.img
            src="/BACKGROUND.png"
            alt="MindShift"
            className="mx-auto w-[820px] max-w-full pointer-events-none select-none"
            initial={{ scale: 0.997 }}
            animate={{ scale: [0.995, 1.01, 1.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 18px 40px rgba(255, 255, 255, 1))" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
