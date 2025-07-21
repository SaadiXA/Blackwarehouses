import React from 'react';
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react';
import { companyInfo, contactInfo, services } from '../mock/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'gallery', label: 'معرض الأعمال' },
    { id: 'reviews', label: 'آراء العملاء' },
    { id: 'contact', label: 'تواصل معنا' }
  ];

  const mainServices = services.slice(0, 4);

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gold mb-4">
                {companyInfo.name}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {companyInfo.tagline}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                نحول أحلامك إلى واقع بلمسة فنية متميزة تجمع بين الأصالة والحداثة في جميع أنحاء المملكة العربية السعودية.
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex space-x-1 space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-gold fill-current" />
                ))}
              </div>
              <span className="text-gold font-semibold">{companyInfo.rating}/5</span>
              <span className="text-gray-400 text-sm">({companyInfo.reviewCount} تقييم)</span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 space-x-reverse">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 
                         transform hover:scale-110 transition-all duration-300"
              >
                <i className="fab fa-whatsapp text-lg"></i>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 
                         transform hover:scale-110 transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 
                         transform hover:scale-110 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gold mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-gold transition-colors duration-300 
                             text-right w-full text-start"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gold mb-4">خدماتنا</h4>
            <ul className="space-y-3">
              {mainServices.map((service) => (
                <li key={service.id}>
                  <div className="text-gray-300 hover:text-gold transition-colors duration-300 
                                text-right cursor-pointer flex items-center space-x-2 space-x-reverse">
                    <i className={`${service.icon} text-gold text-sm`}></i>
                    <span>{service.title}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => scrollToSection('services')}
              className="text-gold hover:text-yellow-400 transition-colors duration-300 
                       font-medium text-sm"
            >
              عرض جميع الخدمات ←
            </button>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gold mb-4">معلومات التواصل</h4>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                <div>
                  <a href={`tel:${contactInfo.phone}`} 
                     className="text-gray-300 hover:text-gold transition-colors duration-300">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                <div>
                  <a href={`mailto:${contactInfo.email}`} 
                     className="text-gray-300 hover:text-gold transition-colors duration-300">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3 space-x-reverse">
                <Clock className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">{contactInfo.workingHours.weekdays}</p>
                  <p className="text-gray-300 text-sm">{contactInfo.workingHours.friday}</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
              <h5 className="text-gold font-semibold mb-2">خدمة الطوارئ</h5>
              <p className="text-gray-300 text-sm">
                متاحون للاستشارات العاجلة على مدار الساعة
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} شركة المستودعات السوداء المحدودة. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                مسجلة في وزارة التجارة والاستثمار - المملكة العربية السعودية
              </p>
            </div>

            {/* Built with */}
            <div className="flex items-center space-x-2 space-x-reverse text-gray-500 text-xs">
              <span>تم التطوير بواسطة</span>
              <span className="text-gold font-medium">Emergent</span>
              <span>❤️</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 space-x-reverse text-xs">
              <button className="text-gray-400 hover:text-gold transition-colors duration-300">
                سياسة الخصوصية
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-gray-400 hover:text-gold transition-colors duration-300">
                الشروط والأحكام
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-20 right-6 bg-gradient-to-r from-gold to-yellow-500 
                 text-black p-4 rounded-full shadow-2xl hover:from-yellow-500 hover:to-gold 
                 transform hover:scale-110 transition-all duration-300 z-40"
      >
        <i className="fas fa-arrow-up text-lg"></i>
      </button>

    </footer>
  );
};

export default Footer;