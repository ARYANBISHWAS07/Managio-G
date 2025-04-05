"use client";
import GSTIN from "../assets/gstin.jpg";
import GST from "../assets/gstTreat.svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import hello from "../assets/helloworld.jpg";
import gear from "../assets/blueStrip.png";
import hear from "../assets/dots.png"
// Components to Render
function ComponentOne() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 p-6 rounded-lg">
      <motion.div 
        initial={{ x: "-50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full md:w-3/5 flex items-center justify-center"
      > 
        <img src={GST} className="w-4/5 max-w-md shadow-lg rounded-lg" alt="GST Illustration" />
      </motion.div>
      
      <motion.div 
        initial={{ x: "50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
        className="w-full md:w-2/5 text-center md:text-left"
      >
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">
          Save GSTINs
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          Keep a central record of the GSTIN for the registered
          businesses and save time from manually entering it every
          time.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all"
        >
          Learn More
        </motion.button>
      </motion.div>
    </div>
  );
}

function ComponentTwo() {
  return (
    <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-8 p-6 rounded-lg">
      <motion.div 
        initial={{ x: "50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full md:w-3/5 flex items-center justify-center"
      > 
        <div className="w-4/5 max-w-md h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-cyan-800 shadow-lg shadow-cyan-900/20">
          <div className="text-center p-6">
            <span className="text-2xl font-bold text-cyan-300 block mb-3">HSN/SAC Codes</span>
            <p className="text-gray-300">Quickly search and apply the right codes to your products</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ x: "-50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
        className="w-full md:w-2/5 text-center md:text-left"
      >
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">
          HSN/SAC Codes
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          Easily assign accurate HSN/SAC codes to all your products and services.
          Make tax calculations simpler and ensure compliance with GST regulations.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all"
        >
          View Codes
        </motion.button>
      </motion.div>
    </div>
  );
}

function ComponentThree() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 p-6 rounded-lg">
      <motion.div 
        initial={{ x: "-50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full md:w-3/5 flex items-center justify-center"
      > 
        <div className="w-4/5 max-w-md h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-blue-800 shadow-lg shadow-blue-900/20">
          <div className="text-center p-6">
            <span className="text-2xl font-bold text-blue-300 block mb-3">Invoice Generator</span>
            <p className="text-gray-300">Professional, compliant invoices in seconds</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ x: "50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
        className="w-full md:w-2/5 text-center md:text-left"
      >
        <h3 className="text-3xl font-bold text-blue-400 mb-4">
          GST Invoices
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          Generate GST-compliant invoices with all required fields automatically 
          populated. Customize templates to match your brand identity.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-all"
        >
          Create Invoice
        </motion.button>
      </motion.div>
    </div>
  );
}

function ComponentFour() {
  return (
    <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-8 p-6 rounded-lg">
      <motion.div 
        initial={{ x: "50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full md:w-3/5 flex items-center justify-center"
      > 
        <div className="w-4/5 max-w-md h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-cyan-800 shadow-lg shadow-cyan-900/20">
          <div className="text-center p-6">
            <span className="text-2xl font-bold text-cyan-300 block mb-3">Tax Calculator</span>
            <p className="text-gray-300">Automatic calculations based on item category and location</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ x: "-50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
        className="w-full md:w-2/5 text-center md:text-left"
      >
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">
          Tax Management
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          Automatically calculate correct tax rates based on item category and customer location.
          Generate tax reports to simplify your GST filing process.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all"
        >
          Calculate Taxes
        </motion.button>
      </motion.div>
    </div>
  );
}

// First View
function FirstView() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  
  const handleTask = (component) => {
    setSelectedComponent(component);
  };
  
  useEffect(() => {
    handleTask(<ComponentOne />);
  }, []);

  return (
    <section className="h-200 flex items-center justify-center py-16 relative bg-gradient-to-b from-black to-gray-900">
      {/* Background image with reduced opacity */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 z-0"
          style={{
            backgroundImage: `url(${gear})`,
            height: '50%',
            backgroundSize: 3000,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.1, 
            backdropFilter: 'blur(500px)',
            backgroundOrigin: 'border-box',
          }}
      ></div>
      
      <div className="w-5/5 max-w-7xl mx-auto bg-black bg-opacity-80 rounded-xl p-8 z-10 relative
    border-2 border-cyan-500
    shadow-[0_0_20px_rgba(6,182,212,0.5),0_0_40px_rgba(6,182,212,0.3)]
    backdrop-filter backdrop-blur-md">
        <div className="w-full flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-cyan-400 text-center mb-12"
          >
            What makes Managio Inventory GST Compliant
          </motion.h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap w-full mb-10 gap-2">
            <TabButton
              label="GSTIN"
              onClick={() => handleTask(<ComponentOne />)}
              bgColor="bg-gray-800"
              hoverColor="bg-cyan-900"
              accentColor="bg-cyan-500"
            />
            <TabButton
              label="HSN/SAC CODES"
              onClick={() => handleTask(<ComponentTwo />)}
              bgColor="bg-gray-800"
              hoverColor="bg-cyan-900"
              accentColor="bg-cyan-500"
            />
            <TabButton
              label="INVOICES"
              onClick={() => handleTask(<ComponentThree />)}
              bgColor="bg-gray-800"
              hoverColor="bg-blue-900"
              accentColor="bg-blue-500"
            />
            <TabButton
              label="TAXES"
              onClick={() => handleTask(<ComponentFour />)}
              bgColor="bg-gray-800"
              hoverColor="bg-cyan-900"
              accentColor="bg-cyan-500"
            />
          </div>
          
          {/* Rendered Component Below */}
          {selectedComponent && (
            <div className="w-full">{selectedComponent}</div>
          )}
        </div>
      </div>
    </section>
  );
}

// Tab Button Component
function TabButton({ label, onClick, bgColor, hoverColor, accentColor }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`flex-1 min-w-[150px] py-4 px-2 m-1 rounded-lg text-gray-300 font-bold transition-all ${bgColor} hover:${hoverColor} hover:text-white relative overflow-hidden
        after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:${accentColor}
        after:scale-x-0 after:origin-center 
        after:transition-transform after:duration-300 after:ease-in-out 
        hover:after:scale-x-100 shadow-md`}
    >
      {label}
    </motion.button>
  );
}

// Second View
function SecondView() {
  return (
    <section id="features" className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-900 "
  
    >
      <div className="w-4/5 max-w-7xl mx-auto rounded-lg p-8">
        <div className="w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg mb-12 border-b border-cyan-800"
          >
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Explore the Features</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <FeatureCard 
              title="Stock Management" 
              icon="📦" 
              color="border-cyan-700" 
              description="Real-time inventory tracking and management"
            />
            <FeatureCard 
              title="Supplier Management" 
              icon="🤝" 
              color="border-blue-700" 
              description="Track all your supplier relationships in one place"
            />
            <FeatureCard 
              title="Order Processing" 
              icon="🛒" 
              color="border-cyan-700" 
              description="Streamline your order fulfillment workflow"
            />
            <FeatureCard 
              title="Reporting" 
              icon="📊" 
              color="border-blue-700" 
              description="Detailed insights and analytics for better decisions"
            />
            <FeatureCard 
              title="Multi-location" 
              icon="🏢" 
              color="border-cyan-700" 
              description="Manage inventory across multiple warehouses"
            />
            <FeatureCard 
              title="Mobile Access" 
              icon="📱" 
              color="border-blue-700" 
              description="Access your inventory system from anywhere"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Card Component
function FeatureCard({ title, icon, color, description }) {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer border-t ${color} shadow-lg hover:shadow-xl`}
    >
      <span className="text-5xl mb-4">{icon}</span>
      <span className="text-xl font-bold text-gray-200 mb-2">{title}</span>
      <p className="text-gray-400 text-center">{description}</p>
    </motion.div>
  );
}

// Third View
function ThirdView() {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-r from-cyan-900 via-blue-950 to-cyan-900">
      <div className="w-4/5 max-w-6xl mx-auto bg-black bg-opacity-70 rounded-xl shadow-2xl p-8 border border-cyan-800">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-cyan-400 mb-8"
          >
            Powerful Inventory Management
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-8"
          >
            Track stock levels, manage suppliers, and optimize your inventory with ease.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center border border-cyan-900 shadow-lg shadow-cyan-900/20"
          >
            <span className="text-2xl font-bold text-cyan-300">Inventory Dashboard</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Navbar = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show navbar when scrolled down 100px from the top
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-md border-b border-cyan-900 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-cyan-400 flex items-center">
            <span className="text-xl mr-2">📦</span>
            Managio
          </a>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-200 hover:text-cyan-400 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Home</a>
            <a href="#features" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-gray-300 font-medium">
                  {user.name || 'User'}
                </div>
                <div className="relative group">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="h-10 w-10 rounded-full overflow-hidden border-2 border-cyan-500 cursor-pointer shadow-md"
                  >
                    {user.profileImg ? (
                      <img 
                        src={user.profileImg} 
                        alt={user.name || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-cyan-700 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                        {(user.name?.charAt(0) || 'U').toUpperCase()}
                      </div>
                    )}
                  </motion.div>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-700">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400 transition-colors">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400 transition-colors">Settings</a>
                    <a href="/logout" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400 transition-colors">Logout</a>
                  </div>
                </div>
              </div>
            ) : (
              <motion.button 
                onClick={() => window.location.href = "/login"} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-lg text-gray-100 font-medium hover:from-cyan-600 hover:to-cyan-500 transition-all shadow-md"
              >
                Login/Sign Up
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md transition-colors">
                Home
              </a>
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                Pricing
              </a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                Contact
              </a>
            </div>
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border-2 border-cyan-500 shadow-md">
                    {user.profileImg ? (
                      <img 
                        src={user.profileImg} 
                        alt={user.name || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-cyan-700 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                        {(user.name?.charAt(0) || 'U').toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.name || 'User'}</div>
                    <div className="text-sm font-medium text-gray-400">{user.email || ''}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <a href="/profile" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                    Profile
                  </a>
                  <a href="/settings" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                    Settings
                  </a>
                  <a href="/logout" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex justify-center">
                  <button 
                    onClick={() => window.location.href = "/login"} 
                    className="w-full mx-3 px-4 py-2 bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-lg text-gray-100 font-medium hover:from-cyan-600 hover:to-cyan-500 transition-all shadow-md"
                  >
                    Login/Sign Up
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

// Main Parallax Component
export default function InventoryManagement({user}) {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navbar - appears on scroll */}
      <Navbar user={user}/>
      
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-700 filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-700 filter blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-50 drop-shadow-lg">
            Inventory Management Software
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-cyan-100 mb-4">
            Designed for Indian Businesses
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            A complete GST-compliant solution to manage your inventory, suppliers, and orders efficiently.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <motion.a 
              onClick={() => window.location.href = "/login"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-lg text-lg font-bold hover:from-cyan-600 hover:to-cyan-500 transition-all shadow-lg"
            >
              Access to Managio
            </motion.a>
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 rounded-lg text-lg font-bold border border-cyan-800 hover:bg-gray-700 transition-all shadow-lg"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Parallax Views Container */}
      <div id="" className="flex flex-col">
        <FirstView />
        <SecondView />
        {/* <ThirdView /> */}
        {/* <FourthView /> */}
        {/* <FifthView /> */}
      </div>
      
      {/* Footer */}
      <footer className="bg-black py-10 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <div className="w-4/5 max-w-6xl mx-auto bg-black bg-opacity-80 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cyan-400 mb-8">Get Started Today</h2>
              <p className="text-xl text-gray-300 mb-10">
                Join thousands of Indian businesses already using Managio Inventory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  onClick={() => window.location.href = "/login"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cyan-600 text-white font-bold text-xl rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-800 text-cyan-300 font-bold text-xl rounded-lg hover:bg-gray-700 transition-colors border border-cyan-700"
                >
                  Watch Demo
                </motion.button>
              </div>
            </div>
          </div>
          <p>© 2025 Managio Inventory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}