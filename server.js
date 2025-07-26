import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import Stripe from "stripe";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

// Load environment variables
dotenv.config();
console.log("🔍 CLIENT_URL:", process.env.CLIENT_URL);

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// App config
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Log requests
app.use((req, res, next) => {
  console.log(`🚨 Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Connect to DB
connectDB().then(() => console.log("✅ Database connected successfully"));

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
console.log("✅ Routes Registered Successfully!");

// Static file serving
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root API Test
app.get("/", (req, res) => {
  res.send("🚀 API Working Successfully!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});
