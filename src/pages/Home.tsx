import React, { useState } from "react";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TripGuideSection from "@/components/TripGuideSection";
import ContactSection from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import LoginSignupModal from "@/components/LoginSignupModal"; // ✅ import your modal

const Home = () => {
  const [showModal, setShowModal] = useState(false); // ✅ state to toggle modal

  return (
    <main className="relative overflow-hidden">

      {/* Background tech lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/tech-lines.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      />

      {/* PAGE CONTENT */}
      <section className="relative z-10">
        <AboutSection />
        <TripGuideSection />
        <ContactSection />

        {/* Trigger Button */}
        <div className="flex justify-center my-10">
          <button
            className="px-6 py-3 bg-primary text-white rounded-full shadow hover:bg-accent transition"
            onClick={() => setShowModal(true)}
          >
            Launch Login / Signup
          </button>
        </div>

        <Footer />
      </section>

      {/* MODAL MOUNTED HERE */}
      <LoginSignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
};

export default Home;
