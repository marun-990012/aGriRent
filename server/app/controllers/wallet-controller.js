import Wallet from "../models/wallet-model.js";

const walletController = {};


  //deduct coins controller
  walletController.deductMoney = async (req, res) => {
    const {money} = req.body;
    try {
      const wallet = await Wallet.findOne({ userId: req.userId });
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }
  
      if (wallet.money < 1) {
        return res.status(400).json({ error: "Insufficient money" });
      }
  
      wallet.money -= money;
      await wallet.save();
  
      return res.status(200).json(wallet);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  

 walletController.find = async(req,res)=>{
  try {
    const wallet = await Wallet.findOne({userId:req.userId});
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    return res.json(wallet);
  } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
  }
}

export default walletController;