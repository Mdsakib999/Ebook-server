import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, trim: true, lowercase: true },
    authorName: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    pdf: { type: String, required: true },

}, { timestamps: true });
// ✅ Prevent duplicate book by same author
bookSchema.index(
    { bookName: 1, authorName: 1 },
    { unique: true }
);

const Book = mongoose.model("Book", bookSchema)

export default Book