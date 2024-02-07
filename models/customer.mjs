
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const customerSchema = new Schema({
    customerName: String,
    emailAddress: String,
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Customer = model('Customer', customerSchema);

export default Customer;