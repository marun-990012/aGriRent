import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    equipment: {
      type: Schema.Types.ObjectId,
      ref: "Equipment", // Link to Equipment model
      required: true,
    },
    renter: {
      type: Schema.Types.ObjectId,
      ref: "User", // Farmer who rents the equipment
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // Equipment owner
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected", "canceled", "completed"],
      default: "pending",
    },
    deliveryOption: {
      type: String,
      enum: ["pickup", "delivery"],
      default: "pickup",
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    transactionId: {
      type: String, // Razorpay/Stripe Transaction ID
    },

    rentType:{
        type:String,
        enum:['day','hourse']
    }
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

export default Booking;
