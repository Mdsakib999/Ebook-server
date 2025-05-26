import express from 'express';
import { createPaymentIntent } from '../controllers/payment.controller.js';

const paymentRoute = express.Router();

paymentRoute.post('/create-checkout-session', createPaymentIntent);

export default paymentRoute;