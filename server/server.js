import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "./config/authcontroller.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoute.js";
import hsnRoutes from "./routes/hsnRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import purchaseRoutes from "./routes/purchaseRoute.js";
import salesRoutes from "./routes/salesRoute.js";
import warehouseRoutes from "./routes/warehouseRoute.js";
import newCustomerRoute from "./routes/newCustomerRoute.js";
import supplierRoutes from "./routes/supplierRoutes.js";

dotenv.config({ path: "./server/.env" });

const app = express();
// MongoDB Implementation
//_______________________________________________________________________________________________________________________________________________
const MongoUri = process.env.DATABASE_URI;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only the frontend to access this server
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
); // Enable CORS for all routes

// const allowedOrigins = [
//   "http://localhost:5173", // Vite might run on a different port
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   }),
// );

app.use(bodyParser.json()); // Parse JSON request body

// Connect to MongoDB
mongoose
  .connect(MongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

//_______________________________________________________________________________________________________________________________________________
//Routes for Google OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site cookies in prod
      domain: process.env.NODE_ENV === "production" ? ".managio.in" : undefined, // set your production domain here
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/hsn", hsnRoutes);
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/warehouse", warehouseRoutes);
// app.use("/newCustomer",newCustomerRoute)
app.use("/api/items", itemRoutes);
app.use("/api/customer", customerRoutes);

//___________________________________________________________________________________________________________________________________________________
// const port = process.env.PORT || 3000;

app.listen(3000, "0.0.0.0", () => {
  console.log(`Server running on port ${3000}`);
});
