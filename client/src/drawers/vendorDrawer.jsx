import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';



const AddvendorModal = ({ isOpen, onClose, onAddvendor }) => {
  const [formData, setFormData] = React.useState({
    gsinNo: '',
    contactNo: '',
    emailAddress: '',
    address: ''
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
//   const validateForm = () => {
//     const newErrors = {};
    

//     if (!formData.gsinNo.match(/^GSTIN\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}Z\d{1}$/)) {
//       newErrors.gsinNo = "Please enter a valid GSTIN (Format: GSTIN27AADCB2230M1ZY)";
//     }
    
//     // Contact number validation
//     if (!formData.contactNo.match(/^\+91\s\d{5}\s\d{5}$/)) {
//       newErrors.contactNo = "Please enter a valid contact number (Format: +91 98765 43210)";
//     }
    
//     // Email validation
//     if (!formData.emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       newErrors.emailAddress = "Please enter a valid email address";
//     }
    
//     // Address validation
//     if (formData.address.trim().length < 10) {
//       newErrors.address = "Address should be at least 10 characters long";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if (!validateForm()) {
    //   return;
    // }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate a new ID (in a real app, this would come from the backend)
      const newvendor = {
        ...formData,
        id: Math.floor(Math.random() * 1000) + 11 // Simple ID generation for demo
      };
      
      onAddvendor(newvendor);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding vendor:", error);
      setErrors({ form: "Failed to add vendor. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      gsinNo: '',
      contactNo: '',
      emailAddress: '',
      address: ''
    });
    setErrors({});
  };
  

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Vendor</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {errors.form && (
            <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-700 text-sm">
              {/* <toast className="h-5 w-5 text-red-500 mt-0.5" /> */}
              <p>{errors.form}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="gsinNo" className="text-gray-700">GSTIN Number <span className="text-red-500">*</span></Label>
            <Input
              id="gsinNo"
              name="gsinNo"
              value={formData.gsinNo}
              onChange={handleChange}
              placeholder="GSTIN27AADCB2230M1ZY"
              className={errors.gsinNo ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.gsinNo && <p className="text-sm text-red-500">{errors.gsinNo}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactNo" className="text-gray-700">Contact Number <span className="text-red-500">*</span></Label>
            <Input
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={errors.contactNo ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.contactNo && <p className="text-sm text-red-500">{errors.contactNo}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-gray-700">Email Address <span className="text-red-500">*</span></Label>
            <Input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="vendor@example.com"
              className={errors.emailAddress ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.emailAddress && <p className="text-sm text-red-500">{errors.emailAddress}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700">Business Address <span className="text-red-500">*</span></Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full business address..."
              rows={3}
              className={errors.address ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-400 hover:bg-cyan-900 transition-colors"
            >
              {isSubmitting ? "Adding..." : "Add vendor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddvendorModal;