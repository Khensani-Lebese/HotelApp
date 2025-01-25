const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const stripe = Stripe('sk_test_51PyWTm0703bt2YKueUM0f6FljmgRrjfQXw5YGCzaEt9BeiHDJleh8wnHECZ7ZBf8bOrXYc7ASlBF9yAH6DS0Cmon00RVanC3bv'); // Your Stripe secret key

app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  
  try {
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    try {
      const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        // Handle successful payment and update reservation status
      }
      response.json({ received: true });
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
  });