import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { customerReviews, companyInfo } from '../mock/mockData';

const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(customerReviews.length / reviewsPerSlide);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const getCurrentReviews = () => {
    const startIndex = currentSlide * reviewsPerSlide;
    return customerReviews.slice(startIndex, startIndex + reviewsPerSlide);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating 
            ? 'text-gold fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            آراء عملائنا الكرام
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            ثقة عملائنا هي أساس نجاحنا. اطلع على تجارب العملاء الحقيقية مع خدماتنا
          </p>
          
          {/* Overall Rating */}
          <div className="inline-flex items-center space-x-4 space-x-reverse bg-white rounded-2xl 
                        px-8 py-4 shadow-xl border border-gray-100">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-1">{companyInfo.rating}</div>
              <div className="flex justify-center space-x-1 space-x-reverse mb-2">
                {renderStars(Math.floor(companyInfo.rating))}
              </div>
              <div className="text-sm text-gray-600">من أصل 5 نجوم</div>
            </div>
            <div className="w-px h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{companyInfo.reviewCount}</div>
              <div className="text-sm text-gray-600">تقييم على Google</div>
            </div>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-8"></div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentSlide * -100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {customerReviews
                      .slice(slideIndex * reviewsPerSlide, (slideIndex + 1) * reviewsPerSlide)
                      .map((review) => (
                        <div
                          key={review.id}
                          className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl 
                                   transition-all duration-500 border border-gray-100 
                                   transform hover:-translate-y-1 relative group"
                        >
                          {/* Quote Icon */}
                          <div className="absolute -top-4 right-8">
                            <div className="bg-gradient-to-r from-gold to-yellow-500 
                                          text-black p-3 rounded-full shadow-lg">
                              <Quote className="h-6 w-6" />
                            </div>
                          </div>

                          {/* Stars */}
                          <div className="flex space-x-1 space-x-reverse mb-4 justify-center">
                            {renderStars(review.rating)}
                          </div>

                          {/* Review Text */}
                          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                            "{review.text}"
                          </p>

                          {/* Reviewer Info */}
                          <div className="border-t border-gray-100 pt-4">
                            <div className="text-center">
                              <h4 className="font-bold text-gray-900 text-lg mb-1">
                                {review.name}
                              </h4>
                              <div className="flex items-center justify-center space-x-2 space-x-reverse 
                                            text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(review.date)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Google Badge */}
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center space-x-1 space-x-reverse text-xs text-gray-400">
                              <i className="fab fa-google text-blue-500"></i>
                              <span>Google</span>
                            </div>
                          </div>

                          {/* Hover Border */}
                          <div className="absolute inset-0 border-2 border-gold rounded-2xl 
                                        opacity-0 group-hover:opacity-100 transition-opacity 
                                        duration-300 pointer-events-none"></div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
                     bg-white text-gray-700 hover:text-gold p-3 rounded-full 
                     shadow-xl hover:shadow-2xl transition-all duration-300 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 
                     bg-white text-gray-700 hover:text-gold p-3 rounded-full 
                     shadow-xl hover:shadow-2xl transition-all duration-300 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 space-x-reverse mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-gold shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gold/10 to-yellow-100 rounded-2xl p-8 
                        border border-gold/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              انضم إلى عملائنا الراضين
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              نحن نسعد بخدمتك وتحويل أحلامك إلى واقع مميز
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-3 
                       rounded-full text-lg font-bold hover:from-yellow-500 hover:to-gold 
                       transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              ابدأ مشروعك الآن
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;