import React from 'react';

const WarehouseLoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-6">
      <div className="flex space-x-4">
        {/* Sidebar Loading Skeleton */}
        <div className="w-[400px] space-y-4 mt-10">
          <div className="h-10 bg-gray-300 rounded"></div>
          
          {/* Warehouse List Skeleton */}
          {[1, 2,3,4,5].map((item) => (
            <div key={item} className="bg-gray-200 h-[100px] rounded-lg mt-10"></div>
          ))}
        </div>

        {/* Main Content Loading Skeleton */}
        <div className="flex-1 space-y-6 mt-10">
          {/* Warehouse Name */}
          {/* <div className="h-8 bg-gray-300 w-1/2 rounded"></div> */}

          {/* Location and Capacity Sections */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-200 h-40 rounded-lg"></div>
            <div className="bg-gray-200 h-40 rounded-lg"></div>
          </div>

          {/* Items Table Skeleton */}
          <div className="bg-gray-200 h-[500px] rounded-lg">
            <div className="grid grid-cols-2 gap-4 p-4">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="flex justify-between">
                  <div className="h-15 bg-gray-300 w-1/2 rounded"></div>
                  <div className="h-15 bg-gray-300 w-1/4 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseLoadingSkeleton;