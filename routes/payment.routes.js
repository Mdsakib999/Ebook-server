import express from 'express';
import { createPaymentIntent, getOrderHistory, saveOrder, getAllorder } from '../controllers/payment.controller.js';

const paymentRoute = express.Router();

paymentRoute.post('/create-payment-intent', createPaymentIntent);
paymentRoute.post("/orders/save", saveOrder);
paymentRoute.get("/orders/history", getOrderHistory);
paymentRoute.get("/orders", getAllorder);

export default paymentRoute;