const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  // console.log(req.body);
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    // normally we communicate with ur backend(database)

    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  });
  // console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
