import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { items, currency } = req.body;
        console.log("items, currency =>", items, currency);

        // Validate input
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items provided for payment" });
        }

        const allowedCurrencies = ["USD", "EUR", "GBP"];
        const selectedCurrency = (currency || "USD").toLowerCase(); // Use lowercase for PaymentIntent
        if (!allowedCurrencies.includes(selectedCurrency.toUpperCase())) {
            return res.status(400).json({ message: "Invalid currency. Allowed: USD, EUR, GBP" });
        }

        // Calculate total amount in smallest currency unit (e.g., cents for USD)
        const amount = items.reduce((sum, item) => sum + Math.round(item.price * 100), 0);

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: selectedCurrency,
            payment_method_types: ["card"],
            description: "Purchase of e-books",
        });

        return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("PaymentIntent error:", error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
};

export { createPaymentIntent };