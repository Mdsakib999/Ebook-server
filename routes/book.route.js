import express from 'express';
import {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/book.controller.js';

const bookRoute = express.Router();

bookRoute.get('/allbooks', getAllBooks)
bookRoute.get('/:id', getBookById)
bookRoute.post('/add-books', addBook)
bookRoute.put('/:id', updateBook)
bookRoute.delete('/:id', deleteBook)

export default bookRoute;