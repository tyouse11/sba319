import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const reviewSchema = new Schema({
  customerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  reviewText: String,
  rating: Number
});

const Review = model("Review", reviewSchema);

export default Review;