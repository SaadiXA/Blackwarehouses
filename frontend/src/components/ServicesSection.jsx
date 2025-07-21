import React from 'react';
import { useApi } from '../hooks/useApi';
import { servicesApi } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ServicesSection = () => {
  const { data: servicesData, loading, error, refetch } = useApi(
    () => servicesApi.getAll(1, 20), // Get all services
    []
  );

  const services = servicesData?.data || [];
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات عالية الجودة في مجال الديكور والمقاولات 
            لتحويل أحلامك إلى واقع بلمسة فنية متميزة
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl 
                       transition-all duration-500 transform hover:-translate-y-2 
                       border border-gray-100 overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-yellow-100/30 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 
                              bg-gradient-to-r from-gold to-yellow-500 text-black 
                              rounded-2xl mb-6 transform group-hover:scale-110 
                              transition-transform duration-300 shadow-lg">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 
                             group-hover:text-gray-800 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-lg 
                             group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover Border */}
                <div className="absolute bottom-0 right-0 left-0 h-1 
                              bg-gradient-to-r from-gold to-yellow-500 
                              transform scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-500 origin-right"></div>
              </div>

              {/* Service Number */}
              <div className="absolute top-4 left-4 w-8 h-8 
                            bg-gradient-to-r from-gold to-yellow-500 text-black 
                            rounded-full flex items-center justify-center 
                            font-bold text-sm shadow-lg">
                {service.id}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              هل تحتاج لخدمة مخصصة؟
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              نحن هنا لنساعدك في تحقيق رؤيتك. تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-4 
                       rounded-full text-lg font-bold hover:from-yellow-500 hover:to-gold 
                       transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              احصل على عرض سعر مجاني
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;