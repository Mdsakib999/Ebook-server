import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { items, currency } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items provided for checkout" });
        }

        const allowedCurrencies = ['USD', 'EUR', 'GBP'];
        const selectedCurrency = (currency || 'USD').toLowerCase();
        if (!allowedCurrencies.includes(selectedCurrency)) {
            return res.status(400).json({ message: "Invalid currency. Allowed: USD, EUR, GBP" });
        }

        const lineItems = items.map(item => ({
            price_data: {
                currency: selectedCurrency,
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        return res.status(200).json({ url: session.url });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export {
    createCheckoutSession
}