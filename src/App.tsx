// src/App.tsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Eagerly loaded components (always visible, not performance critical to lazy load)
import Header from "@/components/Header"; // The main navigation header

// Assume Loader is a small, essential component for loading states
import { Loader2 } from "lucide-react"; // Using Loader2 from lucide-react as a generic spinner

// Lazy load the main page component (which contains all sections)
// This helps reduce the initial bundle size.
const LazyIndexPage = lazy(() => import('@/pages/Index')); // Renamed from LazyHome to LazyIndexPage for clarity

// Lazy load the Footer component as it's usually at the bottom
const LazyFooter = lazy(() => import('@/components/Footer').then(module => ({ default: module.Footer })));


function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app-wide loading (e.g., fetching global data, authentication checks)
    // This loader is for the very first load of the entire application.
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); // Simulate a 1-second initial load time
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // Show a global loader while the initial app setup is in progress
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <Router>
      {/*
        The Header is placed outside <Routes> and <Suspense> because it's a global component
        that should always be visible regardless of the route or lazy loading status of page content.
      */}
      <Header />

      <div className="App">
        {/*
          Suspense is required to wrap any components that are lazy-loaded.
          It provides a fallback UI (like a loading spinner) while the lazy-loaded component's code chunk is being fetched.
          Here, it wraps the entire <Routes> because the main page (LazyIndexPage) is lazy-loaded.
        */}
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <Loader2 className="animate-spin text-primary w-12 h-12" />
            </div>
          }
        >
          <Routes>
            {/*
              The <Route> element prop correctly renders the lazy-loaded component using JSX syntax:
              element={<LazyIndexPage />}
              This ensures that React knows to render the component, not just pass an object.
            */}
            <Route path="/" element={<LazyIndexPage />} />
            {/*
              Add other routes here if your application grows.
              Example of another lazy-loaded route:
              <Route path="/dashboard" element={
                <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>}>
                  <LazyDashboardPage />
                </Suspense>
              } />
            */}
          </Routes>
        </Suspense>

        {/*
          The Footer is also placed outside <Routes> and <Suspense> for the main page content,
          but it is itself lazy-loaded. It will show its own fallback if it's still loading.
        */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-8 bg-background">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
          }
        >
          <LazyFooter />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
