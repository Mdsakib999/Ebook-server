import express from 'express';
import { createPaymentIntent, getAllorder, getOrderHistory, saveOrder } from '../controllers/payment.controller.js';

const paymentRoute = express.Router();

paymentRoute.post('/create-payment-intent', createPaymentIntent);
paymentRoute.post("/orders/save", saveOrder);
paymentRoute.get("/orders/history", getOrderHistory);
paymentRoute.get("/allorders", getAllorder);

export default paymentRoute;