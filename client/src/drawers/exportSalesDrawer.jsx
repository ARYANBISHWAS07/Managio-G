import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Schema validation function
const validateAgainstSchema = (data) => {
  const errors = [];
  
  // Check if data is an array
  if (!Array.isArray(data)) {
    return { isValid: false, errors: ["Data must be an array of sales details"] };
  }
  
  // Validate each sales detail entry
  data.forEach((sale, saleIndex) => {
    // Check for required structure
    if (!sale.customerDetails) {
      errors.push(`Row ${saleIndex + 1}: Missing customerDetails`);
    } else {
      // Validate customerDetails
      if (typeof sale.customerDetails.name !== 'string' && sale.customerDetails.name !== undefined) {
        errors.push(`Row ${saleIndex + 1}: customerDetails.name must be a string`);
      }
      if (typeof sale.customerDetails.contactNo !== 'string' && sale.customerDetails.contactNo !== undefined) {
        errors.push(`Row ${saleIndex + 1}: customerDetails.contactNo must be a string`);
      }
      if (typeof sale.customerDetails.email !== 'string' && sale.customerDetails.email !== undefined) {
        errors.push(`Row ${saleIndex + 1}: customerDetails.email must be a string`);
      }
    }

    // Validate invoiceNo
    if (typeof sale.invoiceNo !== 'string' && sale.invoiceNo !== undefined) {
      errors.push(`Row ${saleIndex + 1}: invoiceNo must be a string`);
    }

    // Validate date
    if (sale.date && !(sale.date instanceof Date) && isNaN(new Date(sale.date).getTime())) {
      errors.push(`Row ${saleIndex + 1}: Invalid date format`);
    }

    // Validate items
    if (!Array.isArray(sale.items)) {
      errors.push(`Row ${saleIndex + 1}: items must be an array`);
    } else {
      sale.items.forEach((item, itemIndex) => {
        if (typeof item.name !== 'string' && item.name !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: name must be a string`);
        }
        if (typeof item.hsnCode !== 'string' && item.hsnCode !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: hsnCode must be a string`);
        }
        if (typeof item.itemCode !== 'string' && item.itemCode !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: itemCode must be a string`);
        }
        if (isNaN(Number(item.units)) && item.units !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: units must be a number`);
        }
        if (isNaN(Number(item.unitCost)) && item.unitCost !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: unitCost must be a number`);
        }
        if (isNaN(Number(item.gstPer)) && item.gstPer !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: gstPer must be a number`);
        }
        if (isNaN(Number(item.discountPer)) && item.discountPer !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: discountPer must be a number`);
        }
        if (isNaN(Number(item.amt)) && item.amt !== undefined) {
          errors.push(`Row ${saleIndex + 1}, Item ${itemIndex + 1}: amt must be a number`);
        }
      });
    }

    // Validate taxAmt and finalAmt
    if (isNaN(Number(sale.taxAmt)) && sale.taxAmt !== undefined) {
      errors.push(`Row ${saleIndex + 1}: taxAmt must be a number`);
    }
    if (isNaN(Number(sale.finalAmt)) && sale.finalAmt !== undefined) {
      errors.push(`Row ${saleIndex + 1}: finalAmt must be a number`);
    }
  });

  return { 
    isValid: errors.length === 0, 
    errors 
  };
};

// Function to transform Excel data to schema-compatible format
const transformExcelData = (excelData) => {
  return excelData.map(row => {
    // Check if the row has necessary properties to be a valid sales entry
    if (!row.invoiceNo || !row.customerName) {
      return null; // Skip invalid rows
    }

    const salesDetail = {
      customerDetails: {
        name: row.customerName || '',
        contactNo: row.customerContactNo || '',
        email: row.customerEmail || '',
      },
      date: row.date ? new Date(row.date) : new Date(),
      invoiceNo: row.invoiceNo || '',
      items: [],
      taxAmt: parseFloat(row.taxAmt) || 0,
      finalAmt: parseFloat(row.finalAmt) || 0,
    };

    // Handle items
    // This assumes the Excel format has itemName1, itemHSN1, etc. columns for multiple items
    const itemCount = 1;
    for (let i = 1; i <= itemCount; i++) {
      const itemPrefix = `item${i}`;
      
      if (row[`${itemPrefix}Name`]) {
        salesDetail.items.push({
          name: row[`${itemPrefix}Name`] || '',
          hsnCode: row[`${itemPrefix}HSN`] || '',
          itemCode: row[`${itemPrefix}Code`] || '',
          units: parseFloat(row[`${itemPrefix}Units`]) || 0,
          unitCost: parseFloat(row[`${itemPrefix}UnitCost`]) || 0,
          gstPer: parseFloat(row[`${itemPrefix}GSTPer`]) || 0,
          discountPer: parseFloat(row[`${itemPrefix}DiscountPer`]) || 0,
          amt: parseFloat(row[`${itemPrefix}Amt`]) || 0,
          warehouseID: row[`${itemPrefix}WarehouseID`] ? [row[`${itemPrefix}WarehouseID`]] : [],
        });
      }
    }

    return salesDetail;
  }).filter(Boolean); // Remove null entries
};

// Maintain the original Excel data for preview
const readExcelData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const excelJson = XLSX.utils.sheet_to_json(worksheet);
        
        resolve(excelJson);
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Function to generate sample Excel file
const generateSampleExcel = () => {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  
  // Sample data
  const sampleData = [
    {
      invoiceNo: "INV-001",
      date: new Date().toISOString().split('T')[0],
      customerName: "John Doe",
      customerContactNo: "1234567890",
      customerEmail: "john@example.com",
      item1Name: "Product A",
      item1HSN: "HSN001",
      item1Code: "PROD-A",
      item1Units: 2,
      item1UnitCost: 100,
      item1GSTPer: 18,
      item1DiscountPer: 5,
      item1Amt: 190,
      item1WarehouseID: "warehouserandomid123",
      taxAmt: 34.2,
      finalAmt: 224.2
    },
    {
      invoiceNo: "INV-002",
      date: new Date().toISOString().split('T')[0],
      customerName: "Jane Smith",
      customerContactNo: "9876543210",
      customerEmail: "jane@example.com",
      item1Name: "Product B",
      item1HSN: "HSN002",
      item1Code: "PROD-B",
      item1Units: 1,
      item1UnitCost: 200,
      item1GSTPer: 12,
      item1DiscountPer: 0,
      item1Amt: 200,
      item1WarehouseID: "warehouserandomid456",
      taxAmt: 24,
      finalAmt: 224
    }
  ];
  
  // Convert to worksheet
  const ws = XLSX.utils.json_to_sheet(sampleData);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "SalesData");
  
  // Generate Excel file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
  // Create Blob and download
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sales_template.xlsx';
  a.click();
  
  URL.revokeObjectURL(url);
};

const ExcelImportSalesDrawer = ({ onImportComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setErrors([]);
    
    if (selectedFile) {
      processExcelFile(selectedFile);
    }
  };


  const processExcelFile = async (file) => {
    setIsLoading(true);
    
    try {

      const originalExcelData = await readExcelData(file);
      setExcelData(originalExcelData);
      

      const transformedData = transformExcelData(originalExcelData);
      const validation = validateAgainstSchema(transformedData);
      
      if (validation.isValid) {
        setJsonData(transformedData);
        setErrors([]);
      } else {
        setErrors(validation.errors);
        setJsonData(null);
      }
    } catch (err) {
      setErrors(["Failed to parse Excel file. Please ensure it's a valid Excel document."]);
      setJsonData(null);
      setExcelData(null);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (jsonData) {

      onImportComplete(jsonData);
      

      setIsOpen(false);

      setFile(null);
    } else {
      setErrors(["Please import a valid Excel file with the correct format"]);
    }
  };


  const getTableHeaders = () => {
    if (!excelData || excelData.length === 0) return [];
    

    const allKeys = excelData.reduce((keys, row) => {
      Object.keys(row).forEach(key => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
      return keys;
    }, []);

    const priorityKeys = [
      'invoiceNo', 
      'date', 
      'customerName', 
      'customerContactNo', 
      'customerEmail',
      'item1Name',
      'taxAmt',
      'finalAmt'
    ];

    const sortedKeys = [
      ...priorityKeys.filter(key => allKeys.includes(key)),
      ...allKeys.filter(key => !priorityKeys.includes(key))
    ];
    

    return sortedKeys.slice(0, 8);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import Sales Data
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerHeader>
            <DrawerTitle>Import Sales Data</DrawerTitle>
            <DrawerDescription>
              Upload an Excel file with sales details. Make sure it follows the required format.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            <div className="flex justify-between mb-4">
              <Input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="w-3/4"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={generateSampleExcel}
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Template
              </Button>
            </div>
            
            {errors.length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  <div className="text-sm font-medium mb-1">The Excel file has the following errors:</div>
                  <ul className="text-xs list-disc pl-4">
                    {errors.slice(0, 5).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                    {errors.length > 5 && (
                      <li>...and {errors.length - 5} more errors</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            
            {isLoading && <p className="text-sm text-gray-500">Processing file...</p>}
            
            {excelData && excelData.length > 0 && (
              <Card className="mb-4">
                <CardContent className="pt-4 px-2">
                  <div className="text-sm font-medium mb-2">Excel Data Preview</div>
                  <div className="max-h-64 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {getTableHeaders().map((header, index) => (
                            <TableHead key={index} className="text-xs py-2">
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {excelData.slice(0, 5).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {getTableHeaders().map((header, colIndex) => (
                              <TableCell key={colIndex} className="text-xs py-2">
                                {row[header] !== undefined ? String(row[header]) : ''}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {excelData.length > 5 && (
                      <p className="text-xs text-gray-500 mt-2 px-4 pb-2">
                        ... and {excelData.length - 5} more rows
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <DrawerFooter>
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-gray-500">
                {jsonData ? 
                  `${jsonData.length} valid records ready to import` : 
                  'No valid records found'}
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={!jsonData || isLoading}
                >
                  Import Data
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default ExcelImportSalesDrawer;