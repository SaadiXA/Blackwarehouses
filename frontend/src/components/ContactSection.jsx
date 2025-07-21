import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageSquare, User, Briefcase, Send } from 'lucide-react';
import { useApiSubmit } from '../hooks/useApi';
import { contactApi } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const { submit, loading, error, success, reset } = useApiSubmit(contactApi.submit);

  const contactInfo = {
    phone: "+966 56 897 9993",
    whatsapp: "+966568979993",
    email: "info@alsawda-warehouses.sa",
    address: "ضحضاح، نجران 66271، المملكة العربية السعودية",
    mapUrl: "https://g.co/kgs/wxTrhyM",
    workingHours: {
      weekdays: "السبت - الخميس: 8:00 ص - 11:00 م",
      friday: "الجمعة: 4:00 م - 10:00 م"
    }
  };

  const services = [
    "ديكور داخلي",
    "ديكور خارجي",
    "المقاولات العامة",
    "التصميم المعماري",
    "التشطيبات الفاخرة",
    "تجهيز المنشآت التقنية"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (error || success) {
      reset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await submit(formData);
    
    if (result.success) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            تواصل معنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن في خدمتك على مدار الساعة. تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">معلومات التواصل</h3>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4 space-x-reverse p-6 bg-white rounded-xl 
                              shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-gold to-yellow-500 text-black p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">العنوان</h4>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 space-x-reverse p-6 bg-white rounded-xl 
                              shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-gold to-yellow-500 text-black p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">الهاتف</h4>
                    <a href={`tel:${contactInfo.phone}`} 
                       className="text-gold hover:text-yellow-600 transition-colors font-medium">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 space-x-reverse p-6 bg-white rounded-xl 
                              shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-gold to-yellow-500 text-black p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">البريد الإلكتروني</h4>
                    <a href={`mailto:${contactInfo.email}`} 
                       className="text-gold hover:text-yellow-600 transition-colors font-medium">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4 space-x-reverse p-6 bg-white rounded-xl 
                              shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-gold to-yellow-500 text-black p-3 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">ساعات العمل</h4>
                    <p className="text-gray-600">{contactInfo.workingHours.weekdays}</p>
                    <p className="text-gray-600">{contactInfo.workingHours.friday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">تواصل سريع</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 space-x-reverse 
                           bg-green-500 text-white px-6 py-3 rounded-xl 
                           hover:bg-green-600 transition-colors duration-300 font-medium"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  <span>واتساب</span>
                </a>
                
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center justify-center space-x-2 space-x-reverse 
                           bg-blue-500 text-white px-6 py-3 rounded-xl 
                           hover:bg-blue-600 transition-colors duration-300 font-medium"
                >
                  <Phone className="h-5 w-5" />
                  <span>اتصال مباشر</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              احصل على عرض سعر مجاني
            </h3>

            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-800 text-center">
                تم إرسال طلبك بنجاح! سنتواصل معك في أقرب وقت.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-800 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="flex items-center space-x-2 space-x-reverse text-gray-700 font-medium mb-2">
                  <User className="h-5 w-5 text-gold" />
                  <span>الاسم الكامل *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-gold focus:border-gold 
                           transition-colors duration-300"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="flex items-center space-x-2 space-x-reverse text-gray-700 font-medium mb-2">
                  <Phone className="h-5 w-5 text-gold" />
                  <span>رقم الهاتف *</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-gold focus:border-gold 
                           transition-colors duration-300"
                  placeholder="+966 5X XXX XXXX"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center space-x-2 space-x-reverse text-gray-700 font-medium mb-2">
                  <Mail className="h-5 w-5 text-gold" />
                  <span>البريد الإلكتروني</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-gold focus:border-gold 
                           transition-colors duration-300"
                  placeholder="example@email.com"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="flex items-center space-x-2 space-x-reverse text-gray-700 font-medium mb-2">
                  <Briefcase className="h-5 w-5 text-gold" />
                  <span>نوع الخدمة المطلوبة</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-gold focus:border-gold 
                           transition-colors duration-300"
                >
                  <option value="">اختر الخدمة</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="flex items-center space-x-2 space-x-reverse text-gray-700 font-medium mb-2">
                  <MessageSquare className="h-5 w-5 text-gold" />
                  <span>تفاصيل المشروع</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-gold focus:border-gold 
                           transition-colors duration-300 resize-none"
                  placeholder="اكتب تفاصيل مشروعك هنا..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black py-4 
                         rounded-lg text-lg font-bold hover:from-yellow-500 hover:to-gold 
                         transform hover:scale-105 transition-all duration-300 
                         shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed 
                         flex items-center justify-center space-x-2 space-x-reverse"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-black border-t-transparent"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>إرسال الطلب</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 text-center border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">موقعنا على الخريطة</h3>
              <p className="text-gray-600">زر مقرنا في ضحضاح، نجران أو تواصل معنا لترتيب موعد</p>
            </div>
            
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gold mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">خريطة تفاعلية</p>
                <p className="text-gray-600">{contactInfo.address}</p>
                <a
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 space-x-reverse mt-4 
                           text-gold hover:text-yellow-600 transition-colors font-medium"
                >
                  <span>عرض على خرائط Google</span>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;