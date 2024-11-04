import React from "react";




const LoadingSpinner: React.FC = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-60 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

export default LoadingSpinner;