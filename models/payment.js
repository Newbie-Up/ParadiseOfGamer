
const stripe = require('stripe')('sk_test_51GuppmDk9tizEAU49RGAIuMz1vY44Sr4agSsR1Xx4OBOo1kAYawWE9zvmX5n3LRYuPF0q2EjXWelmqQpTjG9kzuA00DFY3fb1t', {apiVersion: ''});
const paymentIntent = stripe.paymentIntents.create({
  amount: 1099,
  currency: 'aud',
  // Verify your integration in this guide by including this parameter
  metadata: {integration_check: 'accept_a_payment'},
});

module.exports = paymentIntent