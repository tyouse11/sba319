import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const reviewSchema = new Schema({
  customerName: String,
  reviewText: String,
  rating: Number
});

const Review = model("Review", reviewSchema);

export default Review;