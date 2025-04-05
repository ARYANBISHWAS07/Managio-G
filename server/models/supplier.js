import mongoose from "mongoose";

import { HSNItem } from "./hsnCodes.js";
import { Purchase } from "./purchase.js";
import { User } from "./user.js";

const supplierSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  supplierDetails: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        // default: () => new mongoose.Types.ObjectId(),
        ref: "Purchase",
        required: true
      },
      name: { type: String },
      contactNo: { type: String },
      email: { type: String },
      /*address: {
          line1: { type: String, required: false },
          line2: { type: String, required: false },
          city: { type: String, required: false },
          state: { type: String, required: false },
          pincode: { type: Number, required: false },
          country: { type: String, required: false },
      },*/
      gstIN: { type: String, required: false },
      purchaseID: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Purchase", required: false }
      ],
    },
  ],
});

export const Supplier = mongoose.model("Supplier", supplierSchema); 