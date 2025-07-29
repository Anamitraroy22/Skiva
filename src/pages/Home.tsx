import {
  Facebook,
  Instagram,
  Linkedin,
  X,
  ArrowUp,
} from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#D1E4DC] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0B3F3C] relative rounded-3xl text-white p-10 overflow-hidden">
          {/* Angled lines background using SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="70" x2="100" y2="0" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="40" x2="100" y2="0" stroke="white" strokeWidth="0.2" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Logo & Mission */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold mb-2">SKIVA</h2>
              <p className="text-sm mb-4">
                Empowering physicians with advanced multi-modal tools to improve treatment
                selection and patient outcomes.
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="X"><X className="w-5 h-5" /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href="#" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              </div>
              <button
                onClick={scrollToTop}
                className="mt-4 flex items-center text-xs border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#0B3F3C] transition"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                BACK TO TOP
              </button>
            </div>

            {/* Sitemap */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Site Map</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#">Homepage</a></li>
                <li><a href="#">Technology</a></li>
                <li><a href="#">Skiva Breast</a></li>
                <li><a href="#">Resources & News</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Portal</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Legal</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Lawyer’s Corner</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom yellow strip */}
          <div className="absolute left-0 right-0 bottom-0 h-2 bg-[#F4B43E] rounded-b-3xl" />
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-xs text-gray-600">
          Copyright © 2022, <strong>Skiva.ai</strong>. All Rights Reserved.
          <br />
          Developed by <strong>★ Anamitra Roy</strong> for Techno India University
        </div>
      </div>
    </footer>
  );
};
