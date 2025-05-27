import { uploadToCloudinary } from "../config/cloudinary.js";
import Book from "../models/book.model.js";
import { deleteFile } from "../utilities/deleteFile.js";
import { deleteImage } from "../utilities/deleteImage.js";

// CREATE
const addBook = async (req, res) => {
    try {
        const { bookName, authorName, description, price, category, rating } = req.body;


        if (!bookName || !authorName || !description || price == null || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = "";
        let pdfUrl = "";

        if (req.files?.image?.[0]) {
            imageUrl = await uploadToCloudinary(req.files.image[0].buffer, "book_covers");
        }


        if (req.files?.pdf?.[0]) {
            pdfUrl = await uploadToCloudinary(req.files.pdf[0].buffer, "book_pdfs", "raw");
        }

        const newBook = new Book({
            bookName,
            authorName,
            description,
            price,
            category,
            rating,
            image: imageUrl,
            pdf: pdfUrl,
            rating
        });

        const savedBook = await newBook.save();
        return res.status(201).json(savedBook);
    } catch (error) {
        console.error("Add Book Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// READ ALL
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        console.error("Get Books Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// READ ONE
const getBookByTitle = async (req, res) => {
    try {
        let { title } = req.params;
        title = title.replace(/-/g, ' ');

        const book = await Book.findOne({ bookName: title });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error("Get Book By Title Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// UPDATE
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            bookName,
            authorName,
            description,
            price,
            discountPrice,
            category,
            removeImage,
            removePdf,
        } = req.body;

        const existingBook = await Book.findById(id);
        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        const updateFields = {};

        if (bookName) updateFields.bookName = bookName;
        if (authorName) updateFields.authorName = authorName;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (discountPrice) updateFields.discountPrice = discountPrice;
        if (category) updateFields.category = category;

        // Remove old image if flagged
        if (removeImage === "true" && existingBook.image) {
            await deleteImage(existingBook.image);
            updateFields.image = "";
        }

        // Upload new image (cover)
        if (req.files?.cover) {
            if (existingBook.image) {
                await deleteImage(existingBook.image);
            }
            const imageUrl = await uploadToCloudinary(req.files.cover[0].buffer, "book_covers");
            updateFields.image = imageUrl;
        }

        // Remove old PDF if flagged
        if (removePdf === "true" && existingBook.pdf) {
            await deleteFile(existingBook.pdf); // Adjust delete logic as needed
            updateFields.pdf = "";
        }

        // Upload new PDF (book file)
        if (req.files?.pdf) {
            if (existingBook.pdf) {
                await deleteFile(existingBook.pdf);
            }
            const pdfUrl = await uploadToCloudinary(req.files.pdf[0].buffer, "book_pdfs", "raw"); // use resource_type: "raw"
            updateFields.pdf = pdfUrl;
        }


        const updatedBook = await Book.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            message: "Book updated successfully.",
            data: updatedBook,
        });
    } catch (error) {
        console.error("Update Book Error:", error);
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// DELETE
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Delete Book Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export {
    addBook,
    getAllBooks,
    getBookByTitle,
    updateBook,
    deleteBook
};
