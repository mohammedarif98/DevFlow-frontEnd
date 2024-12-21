import React from 'react';



const ServerError: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold">500 - Internal Server Error</h1>
        <p className="text-white text-lg mt-2">
          Oops! Something went wrong on our end. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default ServerError;