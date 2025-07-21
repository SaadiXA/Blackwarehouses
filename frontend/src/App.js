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

// Animation Systems will be loaded dynamically

function App() {
  useEffect(() => {
    // Set RTL direction for the entire document
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    
    // Load and initialize animations via script tag
    const loadAnimations = () => {
      const script = document.createElement('script');
      script.src = '/animations/SimpleAnimations.js';
      script.onload = () => {
        console.log('🎬 Animation system loaded');
      };
      script.onerror = () => {
        console.warn('⚠️ Animation system failed to load, continuing without animations');
      };
      document.head.appendChild(script);
    };

    // Load animations after a short delay
    setTimeout(loadAnimations, 500);

    // Cleanup function
    return () => {
      // Cleanup any global animation references
      if (window.cinematicAnimations) {
        delete window.cinematicAnimations;
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