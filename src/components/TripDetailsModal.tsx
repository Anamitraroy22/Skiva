import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Ensure AnimatePresence is imported if used
import { Star, MapPin, Calendar, DollarSign, X } from "lucide-react"; // Added X for close button
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Trip {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  category: string[];
  image: string;
  description: string;
  highlights: string[];
  priceTiers: {
    '3-star': number;
    '4-star': number;
    '5-star': number;
  };
}

interface TripDetailsModalProps {
  trip: Trip;
  onClose: () => void;
}

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ trip, onClose }) => {
  if (!trip) return null;

  return (
    <AnimatePresence> {/* Wrap with AnimatePresence for exit animations */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          // Applied glass, golden border, and glow classes
          className="glass p-8 max-w-2xl w-full mx-auto shadow-2xl relative overflow-hidden
                     border-2 border-primary rounded-3xl glow-primary" // ADDED: Golden border and glow
        >
          <div className="absolute top-4 right-4 z-10">
            <Button // Using the Button component for consistency
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-foreground hover:bg-white/20 rounded-full" // Use foreground for icon color
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <h3 className="text-3xl font-bold mb-3 text-foreground drop-shadow-lg">{trip.title}</h3> {/* Use text-foreground */}
          <p className="text-foreground-muted mb-4">{trip.description}</p> {/* Use text-foreground-muted */}

          <div className="grid grid-cols-2 gap-4 text-foreground-muted mb-6"> {/* Use text-foreground-muted */}
            <div>
              <MapPin className="inline-block w-4 h-4 mr-2 text-primary" /> {/* Use text-primary */}
              <span className="font-medium">Location:</span> {trip.location}
            </div>
            <div>
              <Calendar className="inline-block w-4 h-4 mr-2 text-primary" /> {/* Use text-primary */}
              <span className="font-medium">Duration:</span> {trip.duration}
            </div>
            <div>
              <Star className="inline-block w-4 h-4 mr-2 text-primary" /> {/* Use text-primary */}
              <span className="font-medium">Rating:</span> {trip.rating} ({trip.reviews} reviews)
            </div>
            <div>
              <DollarSign className="inline-block w-4 h-4 mr-2 text-primary" /> {/* Use text-primary */}
              <span className="font-medium">Base Price:</span> {trip.price}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-2 text-foreground">Pricing Tiers:</h4> {/* Use text-foreground */}
            <ul className="list-disc list-inside text-foreground-muted space-y-1"> {/* Use text-foreground-muted */}
              <li>3-star: ${trip.priceTiers['3-star']}</li>
              <li>4-star: ${trip.priceTiers['4-star']}</li>
              <li>5-star: ${trip.priceTiers['5-star']}</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {trip.highlights.map((highlight, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs border-primary/20 text-primary" // UPDATED: Golden border and text for badges
              >
                {highlight}
              </Badge>
            ))}
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300" // UPDATED: Golden button style
            size="lg" // Ensure size is set for consistency
          >
            Select Trip Plan
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TripDetailsModal;