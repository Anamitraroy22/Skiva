// src/pages/Index.tsx

import React, { Suspense, lazy, Component, ReactNode, useState } from "react"; // Added useState
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Loader2 } from "lucide-react";
import LoginSignupModal from "@/components/LoginSignupModal"; // NEW: Import the LoginSignupModal

// --- Error Boundary for lazy loading ---
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- Lazy-loaded Sections ---
const AboutSection = lazy(() => import("../components/AboutSection"));
const TripGuideSection = lazy(() => import("../components/TripGuideSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
// REMOVED: Footer import from here, as it's rendered in App.tsx
// const Footer = lazy(() => import("../components/Footer").then(module => ({ default: module.Footer })));


// --- Main Index Page ---
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW: State to control modal visibility

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // Set the main app background to the new background-dark
    // and default text to foreground for dark backgrounds
    <div className="min-h-screen bg-background-dark text-foreground">
      {/* Header is rendered in App.tsx, NOT here */}
      {/* <Header /> */}

      <main>
        {/* Hero Section - Pass the modal open function */}
        <section id="home">
          <HeroSection onGetTravelGuideClick={openModal} /> {/* UPDATED: Pass onGetTravelGuideClick prop */}
        </section>

        {/* About Section - Use background-light-section for contrast */}
        <ErrorBoundary
          fallback={
            <div className="flex justify-center items-center h-64 bg-red-100 text-red-700 p-4 rounded-lg m-4">
              Failed to load About Section.
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64 bg-background-light-section rounded-lg m-4">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
              </div>
            }
          >
            <section id="about" className="bg-background-light-section">
              <AboutSection />
            </section>
          </Suspense>
        </ErrorBoundary>

        {/* Trip Guide Section - Use a subtle gradient from background-dark to background-light-section */}
        <ErrorBoundary
          fallback={
            <div className="flex justify-center items-center h-96 bg-red-100 text-red-700 p-4 rounded-lg m-4">
              Failed to load Trip Guide Section.
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-96 bg-background-dark rounded-lg m-4">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
              </div>
            }
          >
            <section id="trips" className="bg-gradient-to-br from-background-dark to-background-light-section">
              <TripGuideSection />
            </section>
          </Suspense>
        </ErrorBoundary>

        {/* Contact Section - Use background-lighter-still for a brighter contrast */}
        <ErrorBoundary
          fallback={
            <div className="flex justify-center items-center h-64 bg-red-100 text-red-700 p-4 rounded-lg m-4">
              Failed to load Contact Section.
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64 bg-background-lighter-still rounded-lg m-4">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
              </div>
            }
          >
            <section id="contact" className="bg-background-lighter-still text-dark-text">
              <ContactSection />
            </section>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer - Its own background is defined within Footer.tsx */}
      {/* REMOVED: Footer component from here as it's rendered in App.tsx */}
      {/*
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-8 bg-background-lighter-still">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        }
      >
        <Footer />
      </Suspense>
      */}

      {/* NEW: Render the LoginSignupModal conditionally */}
      <LoginSignupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Index;