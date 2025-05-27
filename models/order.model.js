import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user: {
        name: String,
        email: String,
    },
    items: [
        {
            book: { type: String, required: true },
            bookId: { type: String, required: true },
            bookName: { type: String, required: true },
            authorName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ["USD", "EUR", "GBP"],
    },
    paymentIntentId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;