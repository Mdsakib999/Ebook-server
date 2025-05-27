import Stripe from "stripe";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { items, currency, userId } = req.body;
        console.log("items, currency, userId =>", items, currency, userId);

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items provided for payment" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const allowedCurrencies = ["USD", "EUR", "GBP"];
        const selectedCurrency = (currency || "USD").toLowerCase();
        if (!allowedCurrencies.includes(selectedCurrency.toUpperCase())) {
            return res.status(400).json({ message: "Invalid currency. Allowed: USD, EUR, GBP" });
        }

        const amount = items.reduce((sum, item) => sum + Math.round(item.price * 100), 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: selectedCurrency,
            payment_method_types: ["card"],
            description: "Purchase of e-books",
            metadata: { userId },
        });

        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error("PaymentIntent error:", error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
};

// const saveOrder = async (req, res) => {
//     try {
//         const { userId, items, total, currency, paymentIntentId } = req.body;
//         console.log("items:==>", items)

//         if (!userId || !items || items.length === 0 || !total || !currency || !paymentIntentId) {
//             return res.status(400).json({ message: "Missing required order details" });
//         }

//         // Verify PaymentIntent status
//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//         if (paymentIntent.status !== "succeeded") {
//             return res.status(400).json({ message: "Payment not completed" });
//         }

//         // Validate currency
//         const allowedCurrencies = ["USD", "EUR", "GBP"];
//         if (!allowedCurrencies.includes(currency.toUpperCase())) {
//             return res.status(400).json({ message: "Invalid currency" });
//         }

//         // Save order to database
//         const order = new Order({
//             userId,
//             items: items.map((item) => ({
//                 book: item?.book,
//                 bookId: item.bookId,
//                 bookName: item.bookName,
//                 authorName: item.authorName,
//                 price: item.price,
//                 quantity: item.quantity,
//             })),
//             total,
//             currency: currency.toUpperCase(),
//             paymentIntentId,
//             status: "completed",
//         });

//         const savedOrder = await order.save();

//         // Update user's orders array
//         await User.findByIdAndUpdate(
//             userId,
//             { $push: { orders: savedOrder._id } },
//             { new: true }
//         );

//         return res.status(201).json({ message: "Order saved successfully", orderId: savedOrder._id });
//     } catch (error) {
//         console.error("Save order error:", error);
//         return res.status(500).json({ message: "Failed to save order" });
//     }
// };

const saveOrder = async (req, res) => {
    try {
        const { userId, items, total, currency, paymentIntentId } = req.body;
        console.log("items:==>", items)

        if (!userId || !items || items.length === 0 || !total || !currency || !paymentIntentId) {
            return res.status(400).json({ message: "Missing required order details" });
        }

        // Verify PaymentIntent status
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ message: "Payment not completed" });
        }

        // Validate currency
        const allowedCurrencies = ["USD", "EUR", "GBP"];
        if (!allowedCurrencies.includes(currency.toUpperCase())) {
            return res.status(400).json({ message: "Invalid currency" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Save order to database
        const order = new Order({
            userId,
            user: {
                name: user.name,
                email: user.email,
            },
            items: items.map((item) => ({
                book: item?.book,
                image: item?.image,
                bookId: item.bookId,
                bookName: item.bookName,
                authorName: item.authorName,
                category: item.category,
                price: item.price,
                quantity: item.quantity,
            })),
            total,
            currency: currency.toUpperCase(),
            paymentIntentId,
        });

        const savedOrder = await order.save();

        // Update user's orders array
        await User.findByIdAndUpdate(
            userId,
            { $push: { orders: savedOrder._id } },
            { new: true }
        );

        return res.status(201).json({ message: "Order saved successfully", orderId: savedOrder._id });
    } catch (error) {
        console.error("Save order error:", error);
        return res.status(500).json({ message: "Failed to save order" });
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId).populate("orders").lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user.orders || []);
    } catch (error) {
        console.error("Get order history error:", error);
        return res.status(500).json({ message: "Failed to retrieve order history" });
    }
};
const getAllorder = async (req, res) => {
    try {
        const orders = await Order.find().lean();
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get order history error:", error);
        return res.status(500).json({ message: "Failed to retrieve order history" });
    }
};

export { createPaymentIntent, saveOrder, getOrderHistory, getAllorder };