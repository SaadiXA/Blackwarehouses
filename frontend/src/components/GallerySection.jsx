import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../mock/mockData';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            معرض أعمالنا المتميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            استكشف مجموعة من أفضل مشاريعنا المنجزة بأعلى معايير الجودة والإبداع
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-6"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-xl 
                       hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 
                       cursor-pointer bg-white"
              onClick={() => openLightbox(image, index)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 md:h-72 object-cover transform group-hover:scale-110 
                           transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 
                              group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-gold text-black p-3 rounded-full transform scale-75 
                                group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 right-0 left-0 p-6 text-white transform 
                              translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* Project Number */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-gold to-yellow-500 
                            text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                #{String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-4 
                     rounded-full text-lg font-bold hover:from-yellow-500 hover:to-gold 
                     transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            شاهد المزيد من أعمالنا
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 left-6 text-white hover:text-gold 
                     transition-colors duration-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 
                     text-white hover:text-gold transition-colors duration-300 z-10"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <button
            onClick={goToNext}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 
                     text-white hover:text-gold transition-colors duration-300 z-10"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          {/* Image Content */}
          <div className="max-w-5xl max-h-full flex flex-col items-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="text-center text-white mt-6 max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg text-gray-300">{selectedImage.description}</p>
              <div className="mt-4 text-gold font-medium">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
          ></div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;