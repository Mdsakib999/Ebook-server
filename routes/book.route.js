import express from 'express';
import { uploadMultiple } from "../config/multer.js";
import {
    addBook,
    getAllBooks,
    getBookByTitle,
    updateBook,
    deleteBook
} from '../controllers/book.controller.js';

const bookRoute = express.Router();

bookRoute.get('/allbooks', getAllBooks)

bookRoute.get('/:title', getBookByTitle)

bookRoute.post('/add-books', uploadMultiple, addBook);

bookRoute.put('/:id', uploadMultiple, updateBook);

bookRoute.delete('/:id', deleteBook)

export default bookRoute;