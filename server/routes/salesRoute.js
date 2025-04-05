import express from "express";
import mongoose from "mongoose";

import { User } from "../models/user.js";
import { Warehouse } from "../models/warehouse.js";
import { Sales } from "../models/sales.js";
import { Item } from "../models/items.js";
import { Customer } from "../models/customers.js";

const router = express.Router();

async function calculateCosts(items) {
  let finalAmt = 0;
  let taxAmt = 0;

  items.forEach((item) => {
    const amt = item.units * item.unitCost;
    const tax = (amt * item.gstPer) / 100;

    item.amt = amt + tax;
    finalAmt += amt + tax;
    taxAmt += tax;
  });

  return { finalAmt, taxAmt };
}

async function addNewEntries(salesDetails) {
  const {
    userID,
    customerDetails,
    invoiceNo,
    items,
    warehouseID,
    finalAmt,
    taxAmt,
  } = salesDetails;

  let existingItems = await Item.findOne({ userID: userID });
  items.forEach((item) => {
    item._id = existingItems.itemDetails.find(
      (existingItem) => existingItem.name === item.name
    )?._id;
    item.amt =
      item.units *
      item.unitCost *
      (1 - item.discountPer / 100) *
      (1 + item.gstPer / 100);
  });

  /* adding new sales to db */
  const newSales = new Sales({
    userID: userID,
    salesDetails: [
      {
        customerDetails: customerDetails,
        invoiceNo: invoiceNo,
        items: items,
        taxAmt: taxAmt,
        finalAmt: finalAmt,
        warehosuseID: warehouseID,
      },
    ],
  });

  await newSales.save();

  salesDetails = newSales.salesDetails[0];
  // console.log(salesDetails);

  /* updating the warehouse details */
  let query = Warehouse.findOne({
    userID: userID,
    "warehouseDetails._id": warehouseID,
  });
  let doc = await query.exec();

  const warehouseDetails = doc.warehouseDetails.find(
    (warehouse) => warehouse._id == warehouseID
  );
  //   console.log(warehouseDetails)

  for (const item of salesDetails.items) {
    warehouseDetails.capacity = Number(warehouseDetails.capacity) + item.units;
    warehouseDetails.totalUnits =
      Number(warehouseDetails.totalUnits) - item.units;

    if (warehouseDetails.totalUnits < 0) warehouseDetails.totalUnits = 0;

    const warehouseItem = warehouseDetails.items.find(
      (warehouseItem) => warehouseItem._id.toString() === item._id.toString()
    );

    if (warehouseItem) {
      warehouseItem.units = Number(warehouseItem.units) - item.units;
      if (warehouseItem.units < 0) warehouseItem.units = 0;
    }
  }

  await doc.save();

  /* updating items in the db */
  existingItems = await Item.findOne({ userID: userID });

  for (const item of salesDetails.items) {
    const existingItem = existingItems.itemDetails.find(
      (existingItem) => existingItem._id.toString() === item._id.toString()
    );

    if (existingItem) {
      existingItem.totalUnits -= item.units;
      const warehouse = existingItem.warehouses.find(
        (warehouse) => warehouse._id.toString() === warehouseID
      );

      if (warehouse) {
        warehouse.units -= item.units;
      }
    }
  }

  await existingItems.save();

  /* adding customer details to the db */
  const newCustomer = new Customer({
    userID: userID,
    customerDetails: [
      {
        salesID: [salesDetails._id],
        ...salesDetails.customerDetails,
      },
    ],
  });

  await newCustomer.save();
}

async function updateEntries(salesDetails) {
  let {
    userID,
    customerDetails,
    invoiceNo,
    items,
    finalAmt,
    taxAmt,
    warehouseID,
  } = salesDetails;

  /* updating the sales details */

  const salesQuery = Sales.findOne({ userID: userID });
  const user = await salesQuery.exec();

  let existingCustomers = await Customer.findOne({
    userID: userID,
    "customerDetails.name": customerDetails.name,
  }); // this will return null if no such customer is found!
  let customerExists = false;

  /* retrieving customerID if it exists! */
  if (existingCustomers) {
    customerExists = true;
    customerDetails._id = existingCustomers.customerDetails.find(
      (customer) => customer.email === customerDetails.email
    )?._id;
  }

  /* retrieving itemID if they exist */
  let existingItems = await Item.findOne({ userID: userID });
  items.forEach((item) => {
    item._id = existingItems.itemDetails.find(
      (existingItem) => existingItem.name === item.name
    )?._id;
    item.amt = item.units * item.unitCost * (1 - item.discountPer / 100);
  });

  user.salesDetails.push({
    customerDetails: customerDetails,
    invoiceNo: invoiceNo,
    items: items,
    taxAmt: taxAmt,
    finalAmt: finalAmt,
    warehouseID: warehouseID,
  });
  await user.save();

  const lastSalesDetails = user.salesDetails[user.salesDetails.length - 1];
  items = lastSalesDetails.items;
  customerDetails._id = lastSalesDetails.customerDetails._id;
  // console.log(lastSalesDetails);

  /* updating the warehouse details */
  const existingWarehouse = await Warehouse.findOne({ userID: userID });
  const warehouseDetails = existingWarehouse.warehouseDetails.find(
    (warehouse) => warehouse._id == warehouseID
  );

  items.forEach((item) => {
    const existingItem = warehouseDetails.items.find(
      (warehouseItem) => warehouseItem._id.toString() === item._id.toString()
    );
    warehouseDetails.capacity = Number(warehouseDetails.capacity) + item.units;
    warehouseDetails.totalUnits =
      Number(warehouseDetails.totalUnits) - item.units;

    if (warehouseDetails.totalUnits < 0) warehouseDetails.totalUnits = 0;

    existingItem.units -= item.units;
    if (existingItem.units < 0) existingItem.units = 0;
  });

  await existingWarehouse.save();
  // console.log(warehouseDetails);

  /* updating the items in the db */
  items.forEach((item) => {
    const existingItem = existingItems.itemDetails.find(
      (existingItem) => existingItem._id.toString() === item._id.toString()
    );

    existingItem.totalUnits -= item.units;
    if (existingItem.totalUnits < 0) existingItem.totalUnits = 0;

    const warehouse = existingItem.warehouses.find(
      (warehouse) => warehouse._id.toString() === warehouseID
    );
    warehouse.units -= item.units;
    if (warehouse.units < 0) warehouse.units = 0;
  });

  // console.log(existingItems);
  await existingItems.save();

  /* updating the cutomer details */
  if (existingCustomers) {
    const existingCustomer = existingCustomers.customerDetails.find(
      (customer) => customer.email === customerDetails.email
    );
    existingCustomer.salesID.push(lastSalesDetails._id);
    console.log(existingCustomer);
  } else {
    existingCustomers = await Customer.findOne({ userID: userID });
    existingCustomers.customerDetails.push({
      salesID: [lastSalesDetails._id],
      ...customerDetails,
    });
  }
  console.log(existingCustomers.customerDetails);
  await existingCustomers.save();
}

router.get("/all-sales", async (req, res) => {
  try {
    const { userID } = req.query;
    
    const query = Sales.findOne({ userID: userID });
    const doc = await query.exec();
    
    if (!doc) {
      res.status(400).json({ salesDetails: null });
      return;
    } else {
      res.status(200).json({
        salesDetails: doc.salesDetails,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/add-sales", async (req, res) => {
  try {
    const salesDetails = req.body;
    let salesQuery = Sales.findOne({ userID: salesDetails.userID });
    const existingUser = await salesQuery.exec();

    if (!existingUser) {
      await addNewEntries(salesDetails);
    } else {
      await updateEntries(salesDetails);
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/report", async (req, res) => {
  try {
    const { userID, salesID } = req.query;

    let salesReport = await Sales.findOne({
      userID: userID,
      "salesDetails._id": salesID,
    });

    salesReport = salesReport.salesDetails.find((sales) => {
      return sales._id.toString() === salesID;
    });

    res.status(200).json(salesReport);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/total-sales", async (req, res) => {
  try {
    const { userID, fromDate, toDate } = req.query;

    const startDate = fromDate ? new Date(fromDate) : new Date("1996-01-01");
    const endDate = toDate ? new Date(toDate) : new Date();

    let totalSales = await Sales.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userID),
        },
      },
      { $unwind: "$salesDetails" },
      {
        $match: {
          "salesDetails.date": {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$salesDetails.finalAmt" },
          totalTax: { $sum: "$salesDetails.taxAmt" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSales: 1,
          totalTax: 1,
        },
      },
    ]);

    res.status(200).json(totalSales);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/profit-loss", async (req, res) => {
  try {
    const { userID, fromDate, toDate } = req.query;

    const startDate = fromDate ? new Date(fromDate) : new Date("1996-01-01");
    const endDate = toDate ? new Date(toDate) : new Date();

    let itemDetails = await Item.findOne(
      { userID: userID },
      {
        "itemDetails.name": 1,
        "itemDetails.unitCost": 1
      }
    );
    itemDetails = itemDetails.itemDetails;

    let salesDetails = await Sales.findOne(
      { userID: userID },
    );
    salesDetails = salesDetails.salesDetails;

    let profit = 0, loss = 0;

    salesDetails.forEach((salesDetail) => {
      if (salesDetail.date >= startDate && salesDetail.date <= endDate) {
        salesDetail.items.forEach((item) => {
          const existingItem = itemDetails.find(
            (existingItem) => existingItem.name === item.name
          );

          if (existingItem) {
            const cost = existingItem.unitCost * item.units;
            const profitLoss = item.amt - cost;
            if (profitLoss > 0) {
              profit += profitLoss;
            } else {
              loss += profitLoss;
            }
          }
        });
      }
    });
    
    res.status(200).json({
      profit: profit,
      loss: Math.abs(loss),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
