import { Rocket, Globe, Heart, Star } from "lucide-react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // For dots indicator
import 'swiper/css/autoplay';   // For autoplay

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';


// Define the interface for a customer review
interface CustomerReview {
    id: number;
    customerName: string;
    rating: number; // e.g., 4.5, 5
    tripName: string;
    reviewText: string;
}

// Dummy data for customer reviews (15 cards as requested)
const customerReviews: CustomerReview[] = [
    {
        id: 1,
        customerName: "Alice M.",
        rating: 5,
        tripName: "Bali Paradise",
        reviewText: "Absolutely magical! The Bali trip exceeded all expectations. The cultural immersion was profound, and the beaches were stunning. Highly recommend Skiva for an unforgettable experience!"
    },
    {
        id: 2,
        customerName: "Bob J.",
        rating: 4.5,
        tripName: "Swiss Alpine Adventure",
        reviewText: "The Swiss Alps adventure was breathtaking. Incredible hikes and the luxury chalets were a dream. Lost half a star for a slight delay in one transfer, but overall, a fantastic trip!"
    },
    {
        id: 3,
        customerName: "Charlie K.",
        rating: 5,
        tripName: "Tokyo Neon Nights",
        reviewText: "Tokyo was an absolute blast! The neon lights, the food, the vibrant culture – Skiva planned everything perfectly. A truly futuristic and unforgettable journey. Can't wait for the next one!"
    },
    {
        id: 4,
        customerName: "Diana L.",
        rating: 4,
        tripName: "Cairo Ancient Wonders",
        reviewText: "Uncovering the mysteries of ancient Egypt was a lifelong dream, and Skiva made it a reality. The pyramids were awe-inspiring. Some parts felt a bit rushed, but the overall historical experience was incredible."
    },
    {
        id: 5,
        customerName: "Eve P.",
        rating: 5,
        tripName: "Greek Island Hopping",
        reviewText: "Santorini and Mykonos were pure bliss! The blue domes, the sunsets, the clear waters... every moment was picture-perfect. Skiva handled all the logistics seamlessly. Five stars!"
    },
    {
        id: 6,
        customerName: "Frank R.",
        rating: 4.5,
        tripName: "India Golden Triangle",
        reviewText: "A truly enriching cultural journey through India. The Taj Mahal was magnificent. The local markets were vibrant. The guides were knowledgeable. A very well-organized trip, minor hiccup with one hotel, but quickly resolved."
    },
    {
        id: 7,
        customerName: "Grace S.",
        rating: 5,
        tripName: "Iceland Northern Lights",
        reviewText: "Witnessing the Aurora Borealis was an out-of-this-world experience! Iceland's landscapes are stunning. Skiva's planning ensured we had the best chances to see the lights. Absolutely fantastic!"
    },
    {
        id: 8,
        customerName: "Henry T.",
        rating: 4,
        tripName: "Amazon Rainforest Expedition",
        reviewText: "An incredible deep dive into the Amazon. Saw so much wildlife! Accommodation was basic but expected. The guides were excellent. A raw, authentic adventure, but not for the faint of heart."
    },
    {
        id: 9,
        customerName: "Ivy U.",
        rating: 5,
        tripName: "Kyoto Cherry Blossom Tour",
        reviewText: "The cherry blossoms in Kyoto were beyond beautiful. Every temple and garden was a serene experience. Skiva's itinerary allowed us to fully immerse ourselves. Perfect trip for nature and culture lovers."
    },
    {
        id: 10,
        customerName: "Jack V.",
        rating: 4.5,
        tripName: "Patagonia Trek",
        reviewText: "Challenging but rewarding trek in Patagonia. The scenery was epic! Good organization for the most part, though some trails were tougher than expected. Still, an amazing adventure."
    },
    {
        id: 11,
        customerName: "Karen W.",
        rating: 5,
        tripName: "Moroccan Souk & Sahara",
        reviewText: "Morocco was a sensory delight! The vibrant souks, the peaceful desert night under the stars... Skiva curated an authentic and magical experience. Loved every moment!"
    },
    {
        id: 12,
        customerName: "Liam X.",
        rating: 4,
        tripName: "Canadian Rockies Ski",
        reviewText: "Fantastic skiing in the Rockies, truly world-class slopes. The resort was great. A bit pricey, but the experience was worth it. Skiva handled all the bookings efficiently."
    },
    {
        id: 13,
        customerName: "Mia Y.",
        rating: 5,
        tripName: "Galapagos Wildlife Cruise",
        reviewText: "A once-in-a-lifetime journey to the Galapagos. The wildlife encounters were incredible and so close! The cruise was comfortable and the naturalists were brilliant. Skiva made it effortless."
    },
    {
        id: 14,
        customerName: "Noah Z.",
        rating: 4.5,
        tripName: "New Zealand South Island",
        reviewText: "Stunning landscapes and thrilling activities on the South Island. Bungee jumping, Milford Sound... so much to see and do! Skiva's itinerary was packed but allowed flexibility. Minor issue with car rental, but quickly fixed."
    },
    {
        id: 15,
        customerName: "Olivia A.",
        rating: 5,
        tripName: "Vietnam Food & Culture",
        reviewText: "Vietnam was an explosion of flavors and rich history. The food tours were amazing, and the cultural sites were fascinating. Skiva provided excellent local insights. A truly immersive trip!"
    }
];

// ReviewCard component to display individual customer reviews
const ReviewCard = ({ review }: { review: CustomerReview }) => (
    <div className="glass p-6 rounded-2xl h-full flex flex-col justify-between shadow-lg">
        <div>
            {/* Star Rating */}
            <div className="relative flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${
                            i < Math.floor(review.rating)
                                ? 'text-yellow-400 fill-current' // Full star - using a direct yellow for clarity
                                : 'text-gray-300' // Empty star
                        }`}
                    />
                ))}
                {/* Render a half star if rating is not an integer */}
                {review.rating % 1 !== 0 && (
                    <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(review.rating % 1) * 100}%` }}>
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                )}
            </div>
            {/* Review Text - Uses foreground-muted for good contrast on dark backgrounds */}
            <p className="text-sm italic text-foreground-muted mb-4 line-clamp-4">"{review.reviewText}"</p>
        </div>
        {/* Customer Name and Trip Mention - Uses foreground for name, primary for trip name */}
        <div>
            <p className="font-semibold text-foreground mt-2">{review.customerName}</p>
            <p className="text-xs text-primary mt-1">Trip to {review.tripName}</p>
        </div>
    </div>
);


const AboutSection = () => {
    // Features data remains the same
    const features = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Network",
            description: "Access to 200+ destinations with local expert guides"
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Future-Ready",
            description: "AI-powered recommendations for personalized adventures"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Sustainable Travel",
            description: "Eco-friendly journeys that protect our planet"
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Premium Experience",
            description: "Luxury accommodations and unique experiences"
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden"> {/* Background controlled by Index.tsx */}
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in">
                    {/* Text colors here are already correct based on Index.tsx's bg-background-light-section and text-foreground */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        About Our <span className="bg-gradient-primary bg-clip-text text-transparent">Journey</span>
                    </h2>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
                        We connect explorers with unforgettable journeys, using cutting-edge technology
                        to create personalized adventures that inspire and transform lives.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass p-6 rounded-2xl text-center card-hover group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Icon Container: Added filter for glow effect */}
                            <div className="text-primary mb-4 group-hover:text-accent transition-colors duration-300 flex justify-center
                                          filter drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)] group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.7)]">
                                {feature.icon}
                            </div>
                            {/* Title: Uses text-foreground for strong contrast */}
                            <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                            {/* Description: Uses text-foreground-muted for softer contrast */}
                            <p className="text-foreground-muted">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Customer Reviews Section - New Carousel */}
                <div className="mb-20">
                    {/* Text colors here are already correct based on Index.tsx's bg-background-light-section and text-foreground */}
                    <h3 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Travelers Say</h3>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        loop={true} // Infinite loop
                        autoplay={{
                            delay: 1000, // 1-second interval
                            disableOnInteraction: false, // Keep autoplaying even after user interaction
                        }}
                        spaceBetween={24} // Gap between cards
                        slidesPerView={1} // Default: 1 card on small screens
                        pagination={{ clickable: true }} // Dots indicator
                        breakpoints={{ // Responsive settings for 3 or 4 cards
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: { // Optional: for very large screens, show 4
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        className="myReviewSwiper" // Class for custom styling (CSS for this is in index.css)
                    >
                        {customerReviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>

            {/* Background Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl -z-10"></div>
        </section>
    );
};

export default AboutSection;
