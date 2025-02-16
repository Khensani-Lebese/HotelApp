const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51PyWTm0703bt2YKueUM0f6FljmgRrjfQXw5YGCzaEt9BeiHDJleh8wnHECZ7ZBf8bOrXYc7ASlBF9yAH6DS0Cmon00RVanC3bv"
);

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*", // Allow requests from frontend
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body; // Amount in cents and currency (e.g., "usd", "zar")

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
