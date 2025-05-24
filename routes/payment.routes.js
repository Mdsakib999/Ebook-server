import express from 'express';
import { createCheckoutSession } from '../controllers/payment.controller.js';

const paymentRoute = express.Router();

paymentRoute.post('create-checkout-session', createCheckoutSession);

export default paymentRoute;