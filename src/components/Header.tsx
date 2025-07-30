import React from "react";
// No Link import needed as we are using a prop for modal trigger

interface HeaderProps {
  onSignupClick: () => void; // New prop for handling signup button click
}

const Header: React.FC<HeaderProps> = ({ onSignupClick }) => {
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
        <nav className="flex items-center space-x-6">
          <a href="#home" className="text-white hover:text-primary transition font-medium">
            Home
          </a>
          <a href="#about" className="text-white hover:text-primary transition font-medium">
            About
          </a>
          <a href="#trips" className="text-white hover:text-primary transition font-medium">
            Destinations
          </a>
          <a href="#contact" className="text-white hover:text-primary transition font-medium">
            Contact
          </a>
          {/* Signup Button - now triggers the modal */}
          <button
            onClick={onSignupClick} // Call the prop function on click
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground
                       hover:bg-accent hover:text-accent-foreground transition-colors duration-300
                       shadow-lg font-semibold"
          >
            Signup
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
