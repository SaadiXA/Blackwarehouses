import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Animation Systems
import CinematicAnimations from "./animations/CinematicAnimations";
import AdvancedEffects from "./animations/AdvancedEffects";
import ResponsiveAnimations from "./animations/ResponsiveAnimations";

function App() {
  useEffect(() => {
    // Set RTL direction for the entire document
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    
    // Initialize animation systems after DOM is ready
    const initAnimations = () => {
      // Initialize cinematic animations
      window.cinematicAnimations = new CinematicAnimations();
      
      // Initialize advanced effects
      window.advancedEffects = new AdvancedEffects();
      
      // Initialize responsive animations
      window.responsiveAnimations = new ResponsiveAnimations();
      
      console.log('🎬 Cinematic animations initialized');
    };

    // Initialize animations after a short delay to ensure DOM is fully ready
    setTimeout(initAnimations, 100);

    // Cleanup function
    return () => {
      // Cleanup animations if needed
      if (window.cinematicAnimations) {
        // Cleanup Three.js resources
        if (window.cinematicAnimations.renderer) {
          window.cinematicAnimations.renderer.dispose();
        }
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-white" dir="rtl">
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Services Section */}
          <ServicesSection />

          {/* Gallery Section */}
          <GallerySection />

          {/* Reviews Section */}
          <ReviewsSection />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;