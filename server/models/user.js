import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  profileImg: {
    type: String,
    default: "https://lh3.googleusercontent.com/a/default-user-photo.jpg",
    required: true,
  },
  googleID: { type: String, required: false },
  gstIN: { type: String, default: "" },
  companyName: { type: String, default: "" },
  warehouses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: false },
  ],
  isNewUser: { type: Boolean, default: true },
  authType: { type: String, enum: ["google", "local"], required: true },
  accessToken: { type: String },
  refreshToken: { type: String, default: "" },
});

export const User = mongoose.model("User", userSchema);
