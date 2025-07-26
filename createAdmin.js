import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "./models/userModel.js"; // Ensure correct path

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const createAdmin = async () => {
  try {
    // Check if an admin already exists
    const existingAdmin = await userModel.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin@123", salt);

    // Create new admin user
    const adminUser = new userModel({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin", // Set role as admin
      cartData: {},
    });

    await adminUser.save();
    console.log("✅ Admin User Created Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error Creating Admin:", error);
    process.exit(1);
  }
};

// Run the function
createAdmin();
