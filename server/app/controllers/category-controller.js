import Category from "../models/category-model";

const categoryController={};

// controller for create category 
categoryController.create = async (req,res)=>{
    const {name,description,imageUrl} = req.body;
    try{
        const category = await Category.create({name,description,imageUrl});
        return res.status(201).json(category);
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
};

// controller for list all the category
categoryController.list = async(req,res)=>{
  
    try{
        const categories = await Category.find();
        return res.json(categories);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
};

// category update controller
categoryController.update = async(req,res)=>{
    const id = req.params.id;
    const {name,description,imageUrl} = req.body;
    try{
        const category = await Category.findByIdAndUpdate(id,{name,description,imageUrl},{new:true});
        if(!category){
            return res.status(404).json({error:"Category is not found"});
        }
        return res.json(category);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
}

// category activate controller
categoryController.activate = async(req,res)=>{
    const id = req.params.id;
    const {isActivate} = req.body;
    try{
        const category = await Category.findByIdAndUpdate(id,{isActivate},{new:true});
        if(!category){
            return res.status(404).json({error:"Category is not found"});
        }
        return res.json(category);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
}

// service category delete controller
categoryController.remove = async(req,res)=>{
    const id = req.params.id;
    try{
        const category = await Category.findByIdAndDelete(id,{new:true});
        if(!category){
            return res.status(404).json({error:"Category is not found"});
        }
        return res.json(category);
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
};



export default categoryController;