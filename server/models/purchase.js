import mongoose from "mongoose";

import { HSNItem } from "./hsnCodes.js";
import { User } from "./user.js";
import { Warehouse } from "./warehouse.js";

const purchaseSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  purchaseDetails: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true
      },
      supplierDetails: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
          required: true
        },
        name: { type: String, required: false },
        contactNo: { type: String, required: false },
        email: { type: String, required: false },
        address: {
            line1: { type: String, required: false },
            line2: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            pincode: { type: Number, required: false },
            country: { type: String, required: false },
        },
        gstIN: { type: String, required: false },
      },
      invoiceNo: { type: String, required: false },
      date: {
        type: Date,
        default: () => new Date(),
        required: true
      },
      items: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
            required: false
          },
          name: { type: String, required: false },
          hsnCode: { type: mongoose.Schema.Types.String, ref: "HSNItem", required: false },
          itemCode: { type: mongoose.Schema.Types.String, ref: "HSNItem", required: false },
          units: { type: Number, required: false },
          unitCost: { type: Number, required: false },
          gstPer: { type: Number, required: false },
          amt: { type: Number, required: false },
        }
      ],
      taxAmt: { type: Number, required: false },
      finalAmt: { type: Number, required: false },
      warehouseID:
        { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: false },
    }
  ],
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);