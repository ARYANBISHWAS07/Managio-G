import mongoose from "mongoose";

import { Item } from "./items.js";
import { HSNItem } from "./hsnCodes.js";
import { User } from "./user.js";
import { Warehouse } from "./warehouse.js";

const saleSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  salesDetails: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: false,
      },
      customerDetails: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
          required: false,
        },
        name: { type: String, required: false },
        contactNo: { type: String, required: false },
        email: { type: String, required: false },
      },
      date: {
        type: Date,
        default: () => new Date(),
        required: false,
      },
      invoiceNo: { type: String, required: false },
      items: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: false,
          },
          name: { type: String, required: false },
          itemName: {
            type: mongoose.Schema.Types.String,
            ref: "HSNItem",
            required: false,
          },
          hsnCode: {
            type: mongoose.Schema.Types.String,
            ref: "HSNItem",
            required: false,
          },
          itemCode: {
            type: mongoose.Schema.Types.String,
            ref: "HSNItem",
            required: false,
          },
          units: { type: Number, required: false },
          unitCost: { type: Number, required: false },
          gstPer: {
            type: mongoose.Schema.Types.Number,
            ref: "HSNItem",
            required: false,
          },
          discountPer: { type: Number, required: false },
          amt: { type: Number, required: false },
        },
      ],
      taxAmt: { type: Number, required: false },
      finalAmt: { type: Number, required: false },
      warehouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: false,
      },
    },
  ],
});

export const Sales = mongoose.model("Sale", saleSchema);
