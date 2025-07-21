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

function App() {
  useEffect(() => {
    // Set RTL direction for the entire document
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    
    // Add Arabic fonts and FontAwesome
    const fontsLink = document.createElement('link');
    fontsLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Amiri:wght@400;700&display=swap';
    fontsLink.rel = 'stylesheet';
    document.head.appendChild(fontsLink);

    const fontAwesome = document.createElement('link');
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    fontAwesome.rel = 'stylesheet';
    document.head.appendChild(fontAwesome);

    return () => {
      // Cleanup
      document.head.removeChild(fontsLink);
      document.head.removeChild(fontAwesome);
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