import React, { useEffect } from 'react';
import { ArrowDown, Star, MapPin, Phone } from 'lucide-react';
import { companyInfo } from '../mock/mockData';

const HeroSection = () => {
  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: linear-gradient(45deg, #FFD700, #FFA500);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
        opacity: 0.7;
      `;
      
      const particleContainer = document.querySelector('.hero-particles');
      if (particleContainer) {
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 5000);
      }
    };

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 300);
    
    return () => clearInterval(particleInterval);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>

      {/* Animated particles */}
      <div className="hero-particles absolute inset-0 pointer-events-none"></div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <i className="fas fa-home absolute text-gold/30 text-2xl animate-pulse" 
           style={{top: '20%', left: '10%', animationDelay: '0s'}}></i>
        <i className="fas fa-tree absolute text-gold/30 text-3xl animate-pulse" 
           style={{top: '60%', left: '80%', animationDelay: '2s'}}></i>
        <i className="fas fa-drafting-compass absolute text-gold/30 text-2xl animate-pulse" 
           style={{top: '30%', left: '85%', animationDelay: '4s'}}></i>
        <i className="fas fa-paint-brush absolute text-gold/30 text-2xl animate-pulse" 
           style={{top: '70%', left: '15%', animationDelay: '6s'}}></i>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Company highlights */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-sm text-gold">
            <div className="flex items-center space-x-1 space-x-reverse bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-current" />
              <span>{companyInfo.rating}/5 ({companyInfo.reviewCount} تقييم)</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>نجران، السعودية</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <Phone className="h-4 w-4" />
              <span>{companyInfo.phone}</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
              {companyInfo.name}
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-gray-200">
              {companyInfo.tagline}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {companyInfo.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-bold 
                       hover:from-yellow-500 hover:to-gold transform hover:scale-105 transition-all duration-300 
                       shadow-2xl hover:shadow-gold/50"
            >
              احصل على استشارة مجانية
            </button>
            
            <button
              onClick={scrollToAbout}
              className="border-2 border-gold text-gold px-8 py-4 rounded-full text-lg font-bold 
                       hover:bg-gold hover:text-black transition-all duration-300 
                       backdrop-blur-sm bg-black/20"
            >
              اعرف المزيد عنا
            </button>
          </div>

          {/* WhatsApp floating button */}
          <a
            href={`https://wa.me/${companyInfo.phone.replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 bg-green-500 text-white p-4 rounded-full shadow-2xl 
                     hover:bg-green-600 transform hover:scale-110 transition-all duration-300 z-50"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 text-gold" />
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;