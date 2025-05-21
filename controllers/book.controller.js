import Book from "../models/book.model.js";

// CREATE
const addBook = async (req, res) => {
    try {
        const {
            bookName, authorName, shortDescription,
            price, discountPrice, rating, image,
            category, availability, ISBN
        } = req.body;

        if (
            !bookName || !authorName || !shortDescription ||
            price == null || discountPrice == null || rating == null ||
            !image || !category || !ISBN
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({
            bookName,
            authorName,
            shortDescription,
            price,
            discountPrice,
            rating,
            image,
            category,
            availability: availability ?? false,
            ISBN
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
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error("Get Book By ID Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// UPDATE
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Update Book Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
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
    getBookById,
    updateBook,
    deleteBook
};
