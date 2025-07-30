import { useState, useEffect, Suspense } from "react";
import { CalendarDays, MapPin, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const phrases = [
  { text: "Explore. Dream. Discover.", color: "text-primary", fontClass: "font-playfair" }, // Using text-primary for golden
  { text: "Relax. Refresh. Reconnect.", color: "text-accent", fontClass: "font-raleway" },   // Using text-accent for darker golden
  { text: "Wander. Wonder. Wow.", color: "text-primary", fontClass: "font-poppins" },
  { text: "Adventure. Awaits. Always.", color: "text-accent", fontClass: "font-playfair" },
  { text: "Plan. Pack. Go.", color: "text-primary", fontClass: "font-poppins" },
  { text: "Fly. Roam. Repeat.", color: "text-accent", fontClass: "font-raleway" },
  { text: "Breathe. Travel. Live.", color: "text-primary", fontClass: "font-playfair" },
  { text: "Escape. Explore. Experience.", color: "text-accent", fontClass: "font-raleway" },
  { text: "Sail. Surf. Soar.", color: "text-primary", fontClass: "font-poppins" },
  { text: "Go. See. Smile.", color: "text-accent", fontClass: "font-playfair" },
];

interface HeroSectionProps {
  onGetTravelGuideClick: () => void; // New prop for handling "Get Travel Guide" button click
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetTravelGuideClick }) => {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    let currentCharIndex = 0;
    const fullText = phrases[currentPhraseIndex].text;

    const typeInterval = setInterval(() => {
      if (currentCharIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentCharIndex));
        currentCharIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentPhraseIndex]);

  // Function to handle scrolling to the TripGuideSection
  const scrollToTrips = () => {
    const tripsSection = document.getElementById('trips');
    if (tripsSection) {
      tripsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 flex justify-center items-center gap-2 text-white text-glow-white-delicate">
            Your Next Great Adventure Starts Here
          </h1>

          {/* Typewriter Text */}
          <div className="text-xl md:text-2xl mb-8 h-10 font-light">
            <span
              className={`inline-block px-4 py-1 rounded-xl font-bold backdrop-blur-md animate-fade-in transition-all duration-300 ${phrases[currentPhraseIndex].color}`}
            >
              {typewriterText}
              {typewriterText.length < phrases[currentPhraseIndex].text.length && (
                <span className="animate-blink-caret ml-1">|</span>
              )}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="xl"
              className="explore-button flex items-center justify-center gap-2 text-lg sm:text-xl px-6 py-3 font-semibold tracking-wide transition-transform transform active:translate-y-1"
              onClick={scrollToTrips}
            >
              <MapPin className="w-5 h-5" />
              Explore Trips
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={onGetTravelGuideClick} // ADDED: onClick handler to trigger the modal
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              Get Travel Guide
            </Button>
          </div>

          {/* Search Bar */}
          <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <div className="mx-auto max-w-5xl px-6 py-8 rounded-3xl bg-white/10 backdrop-blur-xl shadow-xl animate-scale-in border border-white/20 glass transition-all duration-300">
              <form className="grid grid-cols-1 gap-4 md:grid-cols-4 items-center">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Where to?"
                    aria-label="Destination"
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-white border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-primary rounded-xl"
                  />
                </div>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="date"
                    aria-label="Date"
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-white border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-primary rounded-xl"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="number"
                    min={1}
                    placeholder="Travelers"
                    aria-label="Number of travelers"
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-white border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-primary rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </form>
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
