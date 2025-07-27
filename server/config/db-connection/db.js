import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDb;
