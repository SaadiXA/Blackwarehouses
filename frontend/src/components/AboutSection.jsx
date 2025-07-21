import React from 'react';
import { aboutInfo, galleryImages } from '../mock/mockData';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {aboutInfo.title}
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                {aboutInfo.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Company Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {aboutInfo.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 space-x-reverse p-4 bg-white rounded-lg shadow-md 
                           border-r-4 border-gold hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-2xl">{highlight.icon}</span>
                  <span className="text-gray-800 font-medium">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-gold/10 to-yellow-100 p-6 rounded-xl border border-gold/20">
              <h3 className="text-xl font-bold text-gray-900 mb-3">رؤيتنا</h3>
              <p className="text-gray-700">
                أن نكون الشركة الرائدة في مجال الديكور والمقاولات في المملكة العربية السعودية، 
                نحول كل مساحة إلى تحفة فنية تعكس الذوق الرفيع والجودة العالية.
              </p>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Main large image */}
            <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-2xl group">
              <img
                src={galleryImages[0].url}
                alt={galleryImages[0].title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-bold text-lg">{galleryImages[0].title}</h4>
                <p className="text-sm text-gray-200">{galleryImages[0].description}</p>
              </div>
            </div>

            {/* Two smaller images */}
            {galleryImages.slice(1, 3).map((image, index) => (
              <div key={image.id} className="relative overflow-hidden rounded-xl shadow-xl group">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h5 className="font-semibold text-sm">{image.title}</h5>
                </div>
              </div>
            ))}

            {/* Stats overlay */}
            <div className="col-span-2 bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl shadow-2xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-gold mb-1">100+</div>
                  <div className="text-sm text-gray-300">مشروع منجز</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold mb-1">4.8</div>
                  <div className="text-sm text-gray-300">تقييم العملاء</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold mb-1">24/7</div>
                  <div className="text-sm text-gray-300">خدمة العملاء</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;