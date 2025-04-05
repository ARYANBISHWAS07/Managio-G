import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import ProductLoadingScreen from "./loadingScreens/ProductLoadingScreen";
import DashboardLoadingScreen from "./loadingScreens/DashboardLoadingScreen";
import PurchaseOrderSkeleton from "./loadingScreens/PurchaseOrderLoading";
import CustomerLoadingScreen from "./loadingScreens/CustomerLoadingScreen";
import WarehouseLoadingSkeleton from "./loadingScreens/warehouseLoading";
// Import other loading screens as needed

export default function Bar({ user }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  // Handle click outside sidebar on mobile to close it
  const handleOverlayClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };


  const renderLoadingScreen = () => {
    const path = location.pathname;
    
    if (path.includes('product')) {
      return <ProductLoadingScreen/>;
    } 
    else if (path.includes('sales/order')) {
      return <PurchaseOrderSkeleton />;
    } 
    else if (path.includes('sales/customer')) {
      return <CustomerLoadingScreen />;
    } 
    else if (path.includes('purchase/vendor')) {
      return <CustomerLoadingScreen />;
    }
    else if (path.includes('purchase/order')) {
      return <PurchaseOrderSkeleton />;
    }
    else if(path.includes('warehouse')) {
      return <WarehouseLoadingSkeleton/>
    }
     else {
      // Default dashboard loading screen
      return <DashboardLoadingScreen />;
    }
  };

  return (
    <div className="fixed flex  md:flex-row w-screen h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-[4%]' : 'md:w-[12%]'}
          w-64 md:w-auto
          transition-all duration-300
          bg-gray-100 h-screen
          z-30
        `}
      >
        <Sidebar user={user}
          toggleSidebar={toggleSidebar} 
          isCollapsed={isSidebarCollapsed} 
          renderLoadingScreen={renderLoadingScreen}
        />
      </div>

      {/* Main content */}
      <div className=" flex flex-col h-full w-full ">
        {/* <Navbar 
          user={user} 
          onMenuClick={toggleSidebar}
        /> */}
        
        {loading ? (
          renderLoadingScreen()
        ) : (
          <div className="  overflow-y-auto h-[calc(105vh-71px)] hide-scrollbar">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}