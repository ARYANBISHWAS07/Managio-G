import React from 'react';

const ProductLoadingScreen = () => {
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center mb-[100px]">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mr-4"></div>
        <div className="flex ml-auto space-x-4">
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex mb-6 items-center justify-center">
        <div className="h-10 w-[1000px] mr-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-48 ml-4 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6 m-9">
        {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item) => (
          <div 
            key={item} 
            className="m-4 bg-gray-100 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between mb-4 h-24 w-20">
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLoadingScreen;