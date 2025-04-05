import mongoose from "mongoose";
import { User } from "./user.js";
import { Warehouse } from "./warehouse.js";
import { Sales } from "./sales.js";

const publicCustomerSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
  customerNo: { type: String, required: false },
  customerName: { type: String, required: false },
  contactNo: { type: String, required: false },
  emailAddress: { type: String, required: false },
  address: { type: String, required: false },
});

export const publicCustomer = mongoose.model(
  "publicCustomer",
  publicCustomerSchema,
);
