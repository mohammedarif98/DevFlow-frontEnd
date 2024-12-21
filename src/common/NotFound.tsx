import React from 'react';



const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className='flex items-center'>
        <p className="text-white font-medium text-lg">404 - Error </p>
        <div className='mx-3 h-8 border-r-2 border-gray-50'></div>
        <p className='text-white font-bold text-3xl'>Page Not Found</p>
      </div>
    </div>
  );
};


export default NotFound;