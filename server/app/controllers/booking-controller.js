import Booking from "../models/booking.js";
import Equipment from "../models/equipment.js";

const bookingController = {};

/**
 *  CREATE a new booking
 * renter → books an equipment for specific dates
 */
bookingController.create = async (req, res) => {
  try {
    const { equipment, renter, owner, startDate, endDate, totalAmount, deliveryOption, deliveryFee, rentType } = req.body;

    //  Check if equipment exists & is available
    const equipmentData = await Equipment.findById(equipment);
    if (!equipmentData) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    if (!equipmentData.availability) {
      return res.status(400).json({ message: "Equipment is not available for booking" });
    }

    //  Create booking
    const booking = await Booking.create({
      equipment,
      renter,
      owner,
      startDate,
      endDate,
      totalAmount,
      deliveryOption,
      deliveryFee,
      rentType,
    });

    //  Mark equipment as unavailable
    // equipmentData.availability = false;
    await equipmentData.save();

    return res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 *  UPDATE booking status (owner can accept/reject, renter can cancel)
 */
bookingController.updateStatus = async (req, res) => {
  try {
    const { id } = req.params; // booking id
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    //  Update status
    booking.bookingStatus = status;
    await booking.save();

    //  If booking is completed or canceled → make equipment available again
    const equipment = await Equipment.findById(booking.equipment);
    if (status === "completed" || status === "canceled" || status === "rejected") {
      if (equipment) {
        equipment.availability = true;
        await equipment.save();
      }
    }else{
        equipment.availability=false;
    }

    return res.json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 *  LIST bookings by renter (farmer)
 */
bookingController.listByRenter = async (req, res) => {
  try {
    const renterId = req.params.renterId;
    const bookings = await Booking.find({ renter: renterId })
      .populate("equipment")
      .populate("owner", "name email");

    return res.json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 *  LIST bookings by owner (equipment owner dashboard)
 */
bookingController.listByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const bookings = await Booking.find({ owner: ownerId })
      .populate("equipment")
      .populate("renter", "name email");

    return res.json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 *  GET booking by ID (detailed view)
 */
bookingController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("equipment")
      .populate("renter", "name email")
      .populate("owner", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default bookingController;
