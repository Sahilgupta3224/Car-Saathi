<<<<<<< HEAD
// import { instance } from "../server.js";
// import crypto from "crypto";
// import { Payment } from "../models/paymentModel.js";

// export const checkout = async (req, res) => {
//   const options = {
//     amount: Number(req.body.amount * 100),
//     currency: "INR",
//   };
//   const order = await instance.orders.create(options);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// };

// export const paymentVerification = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     // Database comes here

//     await Payment.create({
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     });

//     res.redirect(
//       `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//     );
//   } else {
//     res.status(400).json({
//       success: false,
//     });
//   }
// };
=======
// paymentController.js

import Razorpay from 'razorpay';
const razorpay = new Razorpay({
  key_id: 'rzp_test_i44QxKNFFcOiCg',
  key_secret: '26cmThPPXcktidJIyzN1Oext'
});

// Controller method to create a payment order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log(res.body)
    // Create an order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: currency,
      payment_capture: 1 // Auto capture
    });

    // Send the order details back to the client
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Could not create order' });
  }
};

// Controller method to handle payment success webhook (optional)
export const paymentSuccess = (req, res) => {
  // Handle payment success here
  console.log('Payment success:', req.body);
  res.status(200).end();
};

>>>>>>> 4e62de2a034e3730340700a5312820564bf4125b
