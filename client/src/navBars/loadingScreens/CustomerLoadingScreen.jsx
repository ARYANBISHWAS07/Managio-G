

const CustomerLoadingScreen = () => {
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Subheader */}
      <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mb-10"></div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-[1100px] bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 mb-4 pb-2 border-b">
        {['h-5 w-32', 'h-5 w-24', 'h-5 w-48', 'h-5 w-40', 'h-5 w-16'].map((width, index) => (
          <div key={index} className={`${width} bg-gray-200 animate-pulse rounded`}></div>
        ))}
      </div>

      {/* Table Rows */}
      {[1, 2,3,4,5,6,7,8,9,10].map((item) => (
        <div 
          key={item} 
          className="grid grid-cols-5 gap-4 items-center py-4 border-b"
        >
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded justify-self-end"></div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoadingScreen;