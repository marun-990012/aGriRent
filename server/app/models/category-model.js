import mongoose from "mongoose";

const {Schema,model} = mongoose;

const categorySchema = new Schema({
    name:String,
    description:String,
    imageUrl:String,
    isActive: {
      type: Boolean,
      default: true, // Admin can deactivate a category instead of deleting
    },
});

const Category =model('Category',categorySchema);

export default Category ;