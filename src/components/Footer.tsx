import {
  Facebook,
  Instagram,
  Linkedin,
  X,
  ArrowUp,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#D1E4DC] py-6 px-4 scroll-smooth"> {/* Reduced py-10 to py-6 */}
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl text-white p-6 overflow-hidden border-2" /* Reduced p-10 to p-6 */
          style={{
            backgroundColor: '#0B3F3C',
            borderColor: '#F4B43E', // Yellow border
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap for more compactness */}
            {/* Logo & Mission */}
            <div>
              <img
                src="/assets/logo.png"
                alt="Skiva Logo"
                className="w-20 h-20 mb-2" // Reduced logo size from w-28 h-28 to w-20 h-20
              />
              <h2 className="text-xl font-bold mb-1">SKIVA</h2> {/* Slightly smaller text */}
              <p className="text-xs leading-snug mb-3"> {/* Smaller text and tighter line height */}
                Unlock your next great adventure. Skiva brings you closer to the world through personalized travel experiences.
              </p>
              <div className="flex space-x-3"> {/* Reduced space-x-4 to space-x-3 */}
                <X className="w-4 h-4" /> {/* Smaller icons */}
                <Linkedin className="w-4 h-4" />
                <Instagram className="w-4 h-4" />
                <Facebook className="w-4 h-4" />
              </div>
              {/* Scroll to Hero Section */}
              <a href="#home"> {/* Changed #hero to #home for consistency with Index.tsx */}
                <button className="mt-3 flex items-center text-xs border border-white px-3 py-1.5 rounded-full hover:bg-white hover:text-[#0B3F3C] transition"> {/* Smaller button padding */}
                  <ArrowUp className="w-3 h-3 mr-1.5" /> {/* Smaller icon */}
                  BACK TO TOP
                </button>
              </a>
            </div>

            {/* Sitemap */}
            <div>
              <h4 className="text-base font-semibold mb-2">Site Map</h4> {/* Slightly smaller text */}
              <ul className="space-y-1 text-xs text-gray-300"> {/* Smaller text */}
                <li><a href="#home" className="hover:underline">Homepage</a></li> {/* Added hrefs */}
                <li><a href="#trips" className="hover:underline">Destinations</a></li> {/* Added hrefs */}
                <li><a href="#" className="hover:underline">Experiences</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#contact" className="hover:underline">Contact Us</a></li> {/* Added hrefs */}
                <li><a href="#" className="hover:underline">Login</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-base font-semibold mb-2">Legal</h4> {/* Slightly smaller text */}
              <ul className="space-y-1 text-xs text-gray-300"> {/* Smaller text */}
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-xs text-gray-600 py-2"> {/* Reduced mt-6 to mt-4, added py-2 */}
          Copyright © {new Date().getFullYear()}, skiva.ai.com. All Rights Reserved. <br />
          Developed by ⭐ Anamitra Roy for Techno India University.
        </div>
      </div>
    </footer>
  );
};
