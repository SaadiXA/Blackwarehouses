import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'gold', message = null }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colorClasses = {
    gold: 'text-gold',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        
        {/* Pulsing ring effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} opacity-20 animate-ping rounded-full`}></div>
      </div>
      
      {message && (
        <div className={`text-center ${colorClasses[color]} font-medium`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;