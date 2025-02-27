import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.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
    , {
    apiVersion: '2023-08-16'
  });

  if (req.method === 'POST') {
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Handle successful payment
        break;
      case 'customer.subscription.created':
        const subscription = event.data.object;
        // Handle new subscription
        break;
      // Add more event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
} 