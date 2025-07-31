import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const walletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  money: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Wallet = model('Wallet', walletSchema);
export default Wallet;
