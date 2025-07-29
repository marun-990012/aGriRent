import ReviewRating from "../models/review-model.js";
const reviewRatingController = {};

// CREATE Review
reviewRatingController.create = async (req, res) => {
  const { equipment, renter, owner, rating, review } = req.body;
  try {
    const reviewRating = await ReviewRating.create({
      equipment,
      renter,
      owner,
      rating,
      review
    });
    return res.status(201).json(reviewRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// DELETE Review
reviewRatingController.removeReview = async (req, res) => {
  const { id } = req.params; // review id
  try {
    const review = await ReviewRating.findOneAndDelete({
      _id: id,
      renter: req.userId // only the renter who wrote it can delete
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found or already deleted" });
    }

    return res.json({ message: "Review deleted successfully", deletedReview: review });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};


// LIST all reviews for an equipment
reviewRatingController.list = async (req, res) => {
  const equipmentId = req.params.equipmentId;
  try {
    const reviews = await ReviewRating.find({ equipment: equipmentId })
      .populate("renter", "name email")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// LIKE a review
reviewRatingController.like = async (req, res) => {
  const { id } = req.params; // review id
  try {
    const review = await ReviewRating.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.likes = review.likes + 1;
    await review.save();

    return res.json(review);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default reviewRatingController;
