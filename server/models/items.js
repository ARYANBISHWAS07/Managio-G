import mongoose from "mongoose";

import { HSNItem } from "./hsnCodes.js";
import { Purchase } from "./purchase.js";
import { Supplier } from "./supplier.js";
import { User } from "./user.js";
import { Warehouse } from "./warehouse.js";

const productSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  itemDetails: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Purchase", required: true },
      name: { type: String, required: false },
      hsnCode: { type: mongoose.Schema.Types.String, ref: "HSNItem", required: false, },
      itemCode: { type: mongoose.Schema.Types.String, ref: "HSNItem", required: false },
      gstPer: { type: mongoose.Schema.Types.Number, ref: "HSNItem" , required: false },
      warehouses: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: false,
          },
          units: { type: mongoose.Schema.Types.Number, ref: "Warehouse", required: false },
        },
      ],
      unitCost: { type: mongoose.Schema.Types.Number, required: false },
      supplierID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Supplier",
          required: false,
        }
      ],
      totalUnits: { type: Number, required: false },
      unitsSolds:{type:Number,required:false}
    },
  ],
});

export const Item = mongoose.model("Item", productSchema);
