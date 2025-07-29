import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TripGuideSection from "@/components/TripGuideSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>
                <section id="home">
                    <HeroSection />
                </section>
                <section id="about">
                    <AboutSection />
                </section>
                <section id="trips">
                    <TripGuideSection />
                </section>
                <section id="contact">
                    <ContactSection />
                </section>
            </main>
        </div>
    );
};

export default Index;

