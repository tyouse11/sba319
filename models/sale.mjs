import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const saleSchema = new Schema(
    {
        saleDate: Date,
        items: [],
        storeLocation: String,
         customer: {
             gender: { type: String, enum: ['M', 'F'] },
             age: Number,
             email: String,
             satisfaction: Number,
         },
        couponUsed: { type: Boolean, default: false },
        purchaseMethod: String
    }
);
const Sale = model("Sale", saleSchema);

const reviewSchema = new Schema(
    {
        reviewText: String,
        rating: Number
    }
);
const Review = model("Review", reviewSchema);

const historySchema = new Schema(
    {
        totalPrice: Number
    }
);
const History = model("Histroy", historySchema);

// make exportable to be accessed in index.mjs
export default { Sale, Review, History };