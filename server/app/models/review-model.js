import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  equipment: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment', // Which equipment was reviewed
    required: true
  },
  renter: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Farmer who rented the equipment
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Owner of the equipment
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  review: {
    message: { type: String, trim: true }
  },
  reviewDate: String // auto-generated readable date
}, { timestamps: true });


// Pre-save hook to auto-format reviewDate (human readable)
ratingSchema.pre("save", function (next) {
  if (!this.reviewDate) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    this.reviewDate = new Date().toLocaleDateString('en-GB', options); 
    // e.g., "26 Jul 2025"
  }
  next();
});

const ReviewRating = model('Review', ratingSchema);
export default ReviewRating;
