import mongoose from "mongoose";

import { HSNItem } from "./hsnCodes.js";
import { Purchase } from "./purchase.js";
import { User } from "./user.js";

const warehouseSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  warehouseDetails: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true
      },
      name: { type: String, required: false },
      capacity: { type: String, required: false },
      totalCapacity: { type: Number, required: false },
      location: {
        line1: { type: String, required: false },
        line2: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        pincode: { type: Number, required: false },
        country: { type: String, required: false },
      },
      contactNo: [{ type: Number, required: false }],
      items: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Purchase",
            required: false,
          },
          name: { type: String, required: false },
          units: { type: Number, required: false },
        },
      ],
      totalUnits: { type: Number, required: false },
      perUsed: { type: Number, required: false },
      totalAmt: { type: Number, required: false },
      status: { type: Boolean, required: false }, 
    },
  ],
});

export const Warehouse = mongoose.model("Warehouse", warehouseSchema);
