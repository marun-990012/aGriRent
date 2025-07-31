import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The user making the transaction (renter or owner)
      required: true,
    },
    purpose: {
      type: String,
      enum: ['wallet_topup', 'equipment_rental', 'commission', 'refund'],
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'pending', 'failed'],
      default: 'pending',
    },
    paymentGatewayId: {
      type: String, // Razorpay/Stripe payment ID
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking', // Link transaction to a booking
      default: null,
    },
    notes: {
      type: String,
      trim: true,
    },
    date: String, // formatted human-readable date
  },
  { timestamps: true }
);

// 📌 Pre-save hook to set formatted date
transactionSchema.pre('save', function (next) {
  if (!this.date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    this.date = new Date().toLocaleDateString('en-GB', options); // e.g., "29 Jul 2025"
  }
  next();
});

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
