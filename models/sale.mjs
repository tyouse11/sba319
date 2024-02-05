import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const saleSchema = new Schema(
    {
        //saleDate: Date,
        //items: [],
        storeLocation: String,
        // customer: {
        //     gender: { type: String, enum: ['M', 'F'] },
        //     age: Number,
        //     email: String,
        //     satisfaction: Number,
        // },
        //couponUsed: { Boolean, default: false },
        purchaseMethod: String
    }
);
const Sale = model("Sale", saleSchema);

// make exportable to be accessed in index.mjs
export default Sale;