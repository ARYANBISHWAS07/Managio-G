import express from "express";
import mongoose from "mongoose";

import { Sales } from "../models/sales.js";
import { Customer } from "../models/customers.js";

const router = express.Router();

router.get("/top-customers", async (req, res) => {
  const { fromDate, toDate, userID } = req.query;

  const startDate = fromDate ? new Date(fromDate) : new Date("1996-01-01");
  const endDate = toDate ? new Date(toDate) : new Date();

  try {
    const topCustomers = await Sales.aggregate([
      { $match: { userID: new mongoose.Types.ObjectId(userID) } },
      { $unwind: "$salesDetails" },
      {
        $match: {
          "salesDetails.date": { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$salesDetails.customerDetails._id",
          name: { $first: "$salesDetails.customerDetails.name" },
          amount: { $sum: "$salesDetails.finalAmt" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$name",
          amount: "$amount",
        },
      },
      { $sort: { amount: -1 } },
      { $limit: 7 },
    ]);

    const result = topCustomers.reduce((acc, customer) => {
      const existingCustomer = acc.find(c => c.name === customer.name);
      if (existingCustomer) {
        existingCustomer.amount += customer.amount;
      } else {
        acc.push(customer);
      }
      return acc;
    }, []);

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/all-customers", async (req, res) => {
  try {
    const { userID } = req.query;
    let existingCustomers = await Customer.findOne({ userID: userID });
    existingCustomers = existingCustomers.customerDetails;

    res.status(200).json(existingCustomers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
