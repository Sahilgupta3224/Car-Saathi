import express from "express";
import dotenv from "dotenv";
import { connect } from "./db/db.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/user.js';
import conversationRoutes from './routes/conversations.js';
import messageRoutes from './routes/messages.js';
import tripRoutes from './routes/trips.js';
import bookingRoutes from './routes/bookings.js';
// import paymentRoute from './routes/paymentRoute.js'; // Import payment route
// import { app } from "./app.js"; // Import app
import Razorpay from "razorpay"; // Import Razorpay
// import { connectDB } from "./config/database.js"; // Import connectDB

dotenv.config();

console.log(process.env.RAZORPAY_ID_KEY);
console.log(process.env.RAZORPAY_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/booking", bookingRoutes);

// Mount payment route
// app.use("/api/payment", paymentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    console.error(err.stack);
    res.status(status).json({ success: false, status, message });
});

const PORT = process.env.PORT || 3001;

// Connect to database
connect();

// Initialize Razorpay instance
// export const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_APT_SECRET,
// });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
