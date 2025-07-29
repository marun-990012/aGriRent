import mongoose from "mongoose";

const {Schema,model} = mongoose;

const equipmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Equipment name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tractor", "Harvester", "Plough", "Sprayer", "Seeder", "Other"]
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    images: [String],
    pricePerDay: {
      type: Number,
      required: true,
    },
    postalCode:String,
    address:String,
    location:{
      type: {
        type: String,
        enum: ['Point'],
        default:'Point'
      },
      coordinates:[Number]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Admin verifies equipment listing
    },
    
    deliveryAvailable: {
      type: Boolean,
      default: false,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

equipmentSchema.index({ location: "2dsphere" }); // For geolocation queries
const Equipment = model("Equipment", equipmentSchema);

export default Equipment;
