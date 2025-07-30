import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"; // Import Chevron icons

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; // For navigation arrows
import 'swiper/css/pagination'; // For dots indicator
import 'swiper/css/autoplay';   // For autoplay

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import TripDetailsModal from "@/components/TripDetailsModal";

// --- TripCard (Memoized) ---
const TripCard = memo(({ trip, onPlanNowClick }: { trip: Trip, onPlanNowClick: (trip: Trip) => void }) => {
    return (
        <div className="glass p-6 rounded-2xl overflow-hidden card-hover group h-full flex flex-col
                       border-2 border-primary glow-primary will-change-transform-opacity"> {/* ADDED: will-change-transform-opacity */}
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={trip.image}
                    alt={trip.title}
                    loading="lazy" // Native lazy loading is already good
                    width={400} // Helps browser reserve space, reducing layout shifts
                    height={256} // Helps browser reserve space, reducing layout shifts
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {trip.duration}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">{trip.title}</h3>
                    <div className="text-2xl font-bold text-primary">{trip.price}</div>
                </div>
                <div className="flex items-center text-foreground-muted mb-3">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {trip.location}
                </div>
                <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-primary fill-current mr-1" />
                    <span className="text-foreground font-medium">{trip.rating}</span>
                    <span className="text-foreground-muted ml-1">({trip.reviews})</span>
                </div>
                <p className="text-foreground-muted mb-4 line-clamp-2">{trip.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {trip.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-primary/20 text-primary">
                            {highlight}
                        </Badge>
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={() => onPlanNowClick(trip)}
                >
                    <Calendar className="w-4 h-4 mr-2" />
                    Plan Now
                </Button>
            </div>
        </div>
    );
});

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

// --- TripGuideSection ---
const TripGuideSection = () => {
    const [activeFilter, setActiveFilter] = useState("recommended");

    // Modal states
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    const trips: Trip[] = [
        {
            id: 1,
            title: "Bali Paradise",
            location: "Bali, Indonesia",
            rating: 4.9,
            reviews: 2847,
            price: "$1,299",
            duration: "7 days",
            category: ["recommended", "budget"],
            image: "/assets/destinations/destination1.webp",
            description: "Experience the magic of Bali with temple visits, rice terrace tours, and beach relaxation.",
            highlights: ["Temple Tours", "Rice Terraces", "Beach Resorts", "Cultural Immersion"],
            priceTiers: { '3-star': 1299, '4-star': 1899, '5-star': 2599 }
        },
        {
            id: 2,
            title: "Swiss Alpine Adventure",
            location: "Swiss Alps, Switzerland",
            rating: 4.8,
            reviews: 1923,
            price: "$2,899",
            duration: "10 days",
            category: ["recommended", "adventure"],
            image: "/assets/destinations/destination2.webp",
            description: "Conquer the Swiss Alps with hiking, skiing, and breathtaking mountain views.",
            highlights: ["Mountain Hiking", "Luxury Chalets", "Scenic Railways", "Adventure Sports"],
            priceTiers: { '3-star': 2899, '4-star': 3599, '5-star': 4299 }
        },
        {
            id: 3,
            title: "Tokyo Neon Nights",
            location: "Tokyo, Japan",
            rating: 4.7,
            reviews: 3156,
            price: "$1,899",
            duration: "8 days",
            category: ["recommended", "adventure"],
            image: "/assets/destinations/destination3.webp",
            description: "Dive into the future with Tokyo's cyberpunk culture, cuisine, and technology.",
            highlights: ["Tech Districts", "Anime Culture", "Fine Dining", "Night Life"],
            priceTiers: { '3-star': 1899, '4-star': 2499, '5-star': 3199 }
        },
        {
            id: 4,
            title: "Cairo Ancient Wonders",
            location: "Cairo, Egypt",
            rating: 4.6,
            reviews: 1500,
            price: "$1,550",
            duration: "6 days",
            category: ["recommended", "cultural"],
            image: "/assets/destinations/destination4.webp",
            description: "Uncover the mysteries of ancient Egypt with tours of pyramids, sphinx, and historical museums.",
            highlights: ["Pyramids of Giza", "Nile River Cruise", "Egyptian Museum", "Khan el-Khalili Bazaar"],
            priceTiers: { '3-star': 1550, '4-star': 2050, '5-star': 2750 }
        },
        {
            id: 5,
            title: "Greek Island Hopping",
            location: "Santorini, Greece",
            rating: 4.9,
            reviews: 2100,
            price: "$2,100",
            duration: "9 days",
            category: ["recommended", "beach"],
            image: "/assets/destinations/destination5.webp",
            description: "Explore the stunning blue domes and crystal-clear waters of the Greek islands.",
            highlights: ["Santorini Sunsets", "Mykonos Beaches", "Ancient Ruins", "Mediterranean Cuisine"],
            priceTiers: { '3-star': 2100, '4-star': 2700, '5-star': 3400 }
        },
        {
            id: 6,
            title: "India Golden Triangle",
            location: "Delhi, Agra, Jaipur, India",
            rating: 4.7,
            reviews: 1750,
            price: "$1,400",
            duration: "8 days",
            category: ["recommended", "cultural"],
            image: "/assets/destinations/destination6.webp",
            description: "A cultural journey through India's iconic cities, including the Taj Mahal.",
            highlights: ["Taj Mahal", "Red Fort", "Amber Fort", "Local Markets"],
            priceTiers: { '3-star': 1400, '4-star': 1900, '5-star': 2600 }
        },
        {
            id: 7,
            title: "Iceland Northern Lights",
            location: "Reykjavik, Iceland",
            rating: 4.8,
            reviews: 1800,
            price: "$3,200",
            duration: "7 days",
            category: ["recommended", "adventure"],
            image: "/assets/destinations/destination7.webp",
            description: "Witness the spectacular Northern Lights and explore Iceland's unique landscapes.",
            highlights: ["Aurora Borealis", "Blue Lagoon", "Golden Circle", "Glacier Hiking"],
            priceTiers: { '3-star': 3200, '4-star': 3900, '5-star': 4600 }
        }
    ];

    const filters = [
        { id: "recommended", label: "Recommended", icon: Star },
        { id: "adventure", label: "Adventure", icon: MapPin },
        { id: "budget", label: "Budget-Friendly", icon: DollarSign }
    ];

    const filteredTrips = trips.filter((trip) =>
        trip.category.includes(activeFilter)
    );

    // Function to handle opening the modal
    const handlePlanNowClick = (trip: Trip) => {
        setSelectedTrip(trip);
        setShowDetailsModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowDetailsModal(false);
        setSelectedTrip(null);
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Semi-transparent overlay to provide a slight tint over the SVG background */}
            <div className="absolute inset-0 bg-background-dark/80 -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        Discover Your Next{" "}
                        <span className="bg-gradient-primary bg-clip-text text-transparent">Adventure</span>
                    </h2>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                        From mystical temples to futuristic cities, explore destinations that will transform your perspective
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map(({ id, label, icon: Icon }) => (
                        <Button
                            key={id}
                            variant={activeFilter === id ? "default" : "glass"}
                            size="lg"
                            onClick={() => setActiveFilter(id)}
                            className="transition-all duration-300"
                        >
                            <Icon className="w-4 h-4 mr-2" />
                            {label}
                        </Button>
                    ))}
                </div>

                {/* Trip Cards - Swiper Carousel */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={32}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="mySwiper"
                    >
                        {filteredTrips.map((trip) => (
                            <SwiperSlide key={trip.id} className="pb-10">
                                <TripCard trip={trip} onPlanNowClick={handlePlanNowClick} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows (outside Swiper component but linked via el) */}
                    <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full bg-background-dark/50 hover:bg-background-dark/80 cursor-pointer transition-colors duration-200">
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-background-dark/50 hover:bg-background-dark/80 cursor-pointer transition-colors duration-200">
                        <ChevronRight className="w-6 h-6 text-foreground" />
                    </div>
                </div>
            </div>

            {/* Floating Glow Effects */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            {/* Trip Details Modal */}
            {showDetailsModal && selectedTrip && (
                <TripDetailsModal trip={selectedTrip} onClose={handleCloseModal} />
            )}
        </section>
    );
};

export default TripGuideSection;
