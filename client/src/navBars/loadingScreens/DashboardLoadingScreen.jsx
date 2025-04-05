import React from 'react';

const DashboardLoadingScreen = () => {
  return (
    <div 
      className="p-8 w-full min-h-[900px]" 
      style={{ 
        width: '1600px', 
        maxWidth: '1928px', 
        height: '600px',
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <div className="h-12 w-96 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-6 w-72 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-12 w-40 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-12 w-40 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Date Filters and Actions */}
      <div className="flex items-center space-x-6 mb-12">
        <div className="h-14 w-64 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-14 w-64 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-14 w-40 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-14 w-40 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-4 gap-8 mb-12">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="h-36 bg-gray-200 animate-pulse rounded-xl p-6 flex flex-col justify-between"
          >
            <div className="h-6 w-24 bg-gray-300 animate-pulse rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded"></div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Top Purchases */}
        <div className="bg-gray-200 animate-pulse rounded-xl p-6 ">
          <div className="h-10 w-64 bg-gray-300 animate-pulse rounded mb-6"></div>
          <div className="h-[420px] w-full bg-gray-300 animate-pulse rounded"></div>
        </div>

        {/* Right Column - Top Customers */}
        <div className="bg-gray-200 animate-pulse rounded-xl p-6">
          <div className="h-10 w-64 bg-gray-300 animate-pulse rounded mb-6"></div>
          <div className="h-[420px] w-full bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-4 gap-8 mt-8">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="h-48 bg-gray-200 animate-pulse rounded-xl"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLoadingScreen;