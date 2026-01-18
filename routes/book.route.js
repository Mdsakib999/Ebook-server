import express from 'express';
import { uploadMultiple } from "../config/multer.js";
import {
    addBook,
    getAllBooks,
    getBookBySlug,
    updateBook,
    deleteBook
} from '../controllers/book.controller.js';

const bookRoute = express.Router();

bookRoute.get('/allbooks', getAllBooks)

bookRoute.get('/:slug', getBookBySlug)

bookRoute.post('/add-books', uploadMultiple, addBook);

bookRoute.put('/:id', uploadMultiple, updateBook);

bookRoute.delete('/:id', deleteBook)

export default bookRoute;