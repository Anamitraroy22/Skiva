import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, DollarSign } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 text-2xl font-bold"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        <h3 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">{trip.title}</h3>
        <p className="text-white/80 mb-4">{trip.description}</p>

        <div className="grid grid-cols-2 gap-4 text-white/80 mb-6">
          <div>
            <MapPin className="inline-block w-4 h-4 mr-2 text-pink-400" />
            <span className="font-medium">Location:</span> {trip.location}
          </div>
          <div>
            <Calendar className="inline-block w-4 h-4 mr-2 text-yellow-300" />
            <span className="font-medium">Duration:</span> {trip.duration}
          </div>
          <div>
            <Star className="inline-block w-4 h-4 mr-2 text-green-400" />
            <span className="font-medium">Rating:</span> {trip.rating} ({trip.reviews} reviews)
          </div>
          <div>
            <DollarSign className="inline-block w-4 h-4 mr-2 text-blue-400" />
            <span className="font-medium">Base Price:</span> {trip.price}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-lg mb-2 text-white">Pricing Tiers:</h4>
          <ul className="list-disc list-inside text-white/80 space-y-1">
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
              className="text-xs border-white/20 text-white/80 backdrop-blur-md bg-white/5"
            >
              {highlight}
            </Badge>
          ))}
        </div>

        <Button onClick={onClose} className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition">
          Select Trip Plan
        </Button>
      </motion.div>
    </div>
  );
};

export default TripDetailsModal;
