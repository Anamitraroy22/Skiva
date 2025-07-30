// src/App.tsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Eagerly loaded components
import Header from "@/components/Header"; // The main navigation header
import LoginSignupModal from "@/components/LoginSignupModal"; // Import the modal component

// Assume Loader is a small, essential component for loading states
import { Loader2 } from "lucide-react";

// Lazy load the main page component (which contains all sections)
const LazyIndexPage = lazy(() => import('@/pages/Index'));

// Lazy load the Footer component
const LazyFooter = lazy(() => import('@/components/Footer').then(module => ({ default: module.Footer })));


function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);
  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);


  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-site-bg">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <Router>
      {/* Header is always visible and now passes the openModal function */}
      <Header onSignupClick={openModal} /> {/* FIXED: Passing the required onSignupClick prop */}

      {/* Main content area, including the background */}
      <div className="App bg-site-bg bg-tech-lines bg-repeat bg-[length:400px_400px] min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-site-bg">
              <Loader2 className="animate-spin text-primary w-12 h-12" />
            </div>
          }
        >
          <Routes>
            {/* Only the main index page route remains */}
            <Route path="/" element={<LazyIndexPage />} />
          </Routes>
        </Suspense>

        {/* Footer is always visible */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-8 bg-site-bg">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
          }
        >
          <LazyFooter />
        </Suspense>
      </div>

      {/* Render the LoginSignupModal conditionally */}
      <LoginSignupModal isOpen={isModalOpen} onClose={closeModal} />
    </Router>
  );
}

export default App;
