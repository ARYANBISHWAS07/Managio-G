import mongoose from "mongoose";

import { User } from "./user.js";
import { Warehouse } from "./warehouse.js";
import { Sales } from "./sales.js";

const customerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  customerDetails: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sales",
        required: false,
      },
      name: { type: String, required: false },
      contactNo: { type: String, required: false },
      email: { type: String, required: false },
      gstIN: { type: String, required: false },
      salesID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sales",
            required: false,
        },
      ],
    },
  ],
});

export const Customer = mongoose.model("Customer", customerSchema);
