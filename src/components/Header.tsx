import React from "react";

const Header = () => {
  return (
    <header
      className="fixed top-4 left-1/2 transform -translate-x-1/2 
                 w-[calc(100%-2rem)] max-w-screen-xl 
                 z-50 bg-white/10 backdrop-blur-md shadow-md h-20 
                 rounded-full"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3 h-full">
          <img
            src="/assets/logo.png"
            alt="Skiva Logo"
            className="max-h-full object-contain"
          />
          <span className="text-3xl font-bold text-white">Skiva</span>
        </div>

        {/* Navigation (Updated to use anchor tags for in-page scroll) */}
        <nav className="space-x-6">
          <a href="#home" className="text-white hover:text-blue-300 transition font-medium">
            Home
          </a>
          <a href="#about" className="text-white hover:text-blue-300 transition font-medium">
            About
          </a>
          <a href="#trips" className="text-white hover:text-blue-300 transition font-medium">
            Destinations
          </a>
          <a href="#contact" className="text-white hover:text-blue-300 transition font-medium">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
