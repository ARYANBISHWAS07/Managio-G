const PurchaseOrderSkeleton = () => {
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mr-4"></div>
        <div className="flex ml-auto space-x-4">
          <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-28 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-36 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <div className="ml-6 mr-6 h-10 mt-20 w-[1000px] bg-gray-200 animate-pulse rounded mb-6"></div>
      <div className="ml-6 mr-6 h-10 mt-20 w-[200px] bg-gray-200 animate-pulse rounded mb-6"></div>

      </div>
      

      {/* Purchase Order Entries */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div 
          key={item} 
          className="ml-6 mr-6 bg-gray-100 rounded-lg p-4 mb-4 border border-gray-200 flex items-center"
        >
          <div className="flex-grow">
            <div className="flex space-x-4 mb-2">
              <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-5 w-40 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-5 w-28 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseOrderSkeleton;