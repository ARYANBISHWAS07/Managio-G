import express from "express";
import mongoose from "mongoose";

import { Item } from "../models/items.js";
import { Purchase } from "../models/purchase.js";
import { Sales } from "../models/sales.js";
import { Warehouse } from "../models/warehouse.js";

const router = express.Router();

router.get("/top-bought", async (req, res) => {
  const { fromDate, toDate, userID } = req.query;

  const startDate = fromDate ? new Date(fromDate) : new Date("1988-01-01");
  const endDate = toDate ? new Date(toDate) : new Date();

  try {
    const topBoughtItems = await Purchase.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userID),
        },
      },
      { $unwind: "$purchaseDetails" },
      { $unwind: "$purchaseDetails.items" },
      {
        $match: {
          "purchaseDetails.date": {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$purchaseDetails.items._id",
          name: { $first: "$purchaseDetails.items.name" },
          amt: { $sum: "$purchaseDetails.items.amt" },
        },
      },
      {
        $sort: { amt: -1 },
      },
      { $limit: 7 },
    ]);

    res.status(200).json({ topBoughtItems });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/top-sold", async (req, res) => {
  try {
    const { fromDate, toDate, userID } = req.query;

    const startDate = fromDate ? new Date(fromDate) : new Date("1996-01-01");
    const endDate = toDate ? new Date(toDate) : new Date();

    const topSoldItems = await Sales.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userID),
        },
      },
      { $unwind: "$salesDetails" },
      { $unwind: "$salesDetails.items" },
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
          _id: "$salesDetails.items._id",
          name: { $first: "$salesDetails.items.name" },
          amt: { $sum: "$salesDetails.items.amt" },
        },
      },
      {
        $sort: { amt: -1 },
      },
      { $limit: 7 },
    ]);

    res.status(200).json({ topSoldItems });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/all-items", async (req, res) => {
  try {
    const { userID } = req.query;
    let existingItems = await Item.findOne({ userID: userID });
    existingItems = existingItems.itemDetails;

    res.status(200).json(existingItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update-item", async (req, res) => {
  try {
    const { userID, warehouseID, items } = req.body;
    console.log(req.body);  

    /* updating the warehouse entry first */
    const warehouseDoc = await Warehouse.findOne({
      userID: userID,
      "warehouseDetails._id": warehouseID,
    });
    const existingWarehouse = warehouseDoc.warehouseDetails.find(
      (warehouse) => warehouse._id.toString() === warehouseID
    );

    const itemDoc = await Item.findOne({ userID: userID });
    const existingItems = itemDoc.itemDetails;

    let existingItem = existingWarehouse.items.find(
      (existingItem) => existingItem.name === items.name
    );

    const removedUnits = existingItem.units - items.totalUnits;

    existingItem.units = items.totalUnits;
    existingWarehouse.totalUnits -= removedUnits;
    existingWarehouse.capacity += removedUnits;

    existingItem = existingItems.find(
      (existingItem) => existingItem.name === items.name
    );
    existingItem.totalUnits -= removedUnits;
    existingItem.warehouses.find(
      (warehouse) => warehouse._id.toString() === warehouseID
    ).units = items.totalUnits;
    existingItem.unitCost = Number(items.unitCost);

    await warehouseDoc.save();
    await itemDoc.save();

    res.status(200).json({
      message: "received!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
