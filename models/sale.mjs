import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const saleSchema = new Schema(
    {
        saleDate: Date,
        items: [],
        storeLocation: String,
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
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

export default Sale;