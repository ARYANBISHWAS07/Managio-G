import mongoose from "mongoose";

const hsnSchema = new mongoose.Schema({
  item_code: { type: String, required: true },
  item_name: { type: String, required: true },
  item_type: { type: String, required: true },
  gst_per: { type: Number, required: true },
  hsn_code: { type: String, required: true },
});

export const HSNItem = mongoose.model("HSNItem", hsnSchema, "hsn-codes");
