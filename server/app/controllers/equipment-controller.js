import Equipment from "../models/equipment";
const equipmentController  = {};

// Create new equipment listing
equipmentController.createEquipment = async (req, res) => {
     const {
      name,
      category,
      description,
      images,
      pricePerDay,
      postalCode,
      address,
      location,
      owner,
      deliveryAvailable,
      deliveryFee
    } = req.body;
  try {
   
    const newEquipment = new Equipment({
      name,
      category,
      description,
      images,
      pricePerDay,
      postalCode,
      address,
      location,
      owner,
      deliveryAvailable,
      deliveryFee
    });

    await newEquipment.save();
    res.status(201).json({ message: "Equipment created successfully", data: newEquipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating equipment", error });
  }
};

// Get all equipment listings
equipmentController.getAllEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find().populate("owner", "name email"); 
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching equipments", error });
  }
};

// Get equipment by ID
equipmentController.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findById(id).populate("owner", "name email");

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching equipment", error });
  }
};

// Update equipment
equipmentController.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEquipment = await Equipment.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json({ message: "Equipment updated successfully", data: updatedEquipment });
  } catch (error) {
    res.status(500).json({ message: "Error updating equipment", error });
  }
};

// Delete equipment
equipmentController.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEquipment = await Equipment.findByIdAndDelete(id);

    if (!deletedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting equipment", error });
  }
};

// Search by category or name
equipmentController.searchEquipment = async (req, res) => {
  try {
    const { query } = req.query;
    const equipments = await Equipment.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: "Error searching equipment", error });
  }
};


// Find equipment near location (geospatial query)
equipmentController.findNearbyEquipment = async (req, res) => {
  try {
    const { lng, lat, maxDistance = 15000 } = req.query; // default 15 km

    const equipments = await Equipment.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: "Error finding nearby equipment", error });
  }
};

export default equipmentController;

