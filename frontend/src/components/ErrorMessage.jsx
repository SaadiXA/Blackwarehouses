import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ 
  error, 
  onRetry = null, 
  showRetry = true,
  title = "حدث خطأ",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {error || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 space-x-reverse bg-gold text-black px-6 py-3 
                   rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-300
                   shadow-md hover:shadow-lg"
        >
          <RefreshCw className="h-5 w-5" />
          <span>إعادة المحاولة</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;