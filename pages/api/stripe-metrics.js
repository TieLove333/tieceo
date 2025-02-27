import Stripe from 'stripe';

export default async function handler(req, res) {
  // Use a read-only restricted key from environment variables
  const stripe = new Stripe(process.env.STRIPE_RESTRICTED_READ_KEY, {
    apiVersion: '2023-08-16'
  });

  try {
    // Set the start date to January 1st, 2025
    const startDate = new Date('2025-01-01').getTime() / 1000;

    // Fetch active subscriptions created after Jan 1st, 2025
    const subscriptions = await stripe.subscriptions.list({
      status: 'active',
      created: { gte: startDate },
      limit: 100
    });

    // Fetch charges created after Jan 1st, 2025
    const charges = await stripe.charges.list({
      created: { gte: startDate },
      limit: 100
    });

    // Calculate Monthly Recurring Revenue
    const monthlyRecurringRevenue = subscriptions.data.reduce((total, sub) => {
      return total + ((sub.plan?.amount || 0) / 100);
    }, 0);

    // Calculate Total Revenue
    const totalRevenue = charges.data.reduce((total, charge) => {
      return total + (charge.amount / 100);
    }, 0);

    // Fetch customers created after Jan 1st, 2025
    const customers = await stripe.customers.list({ 
      created: { gte: startDate },
      limit: 100 
    });

    // Estimate consulting revenue
    const consultingRevenue = totalRevenue - monthlyRecurringRevenue;

    res.status(200).json({
      monthlyRecurringRevenue,
      totalRevenue,
      totalCustomers: customers.data.length,
      subscriptionBreakdown: {
        subscription: monthlyRecurringRevenue,
        consulting: consultingRevenue
      }
    });
  } catch (error) {
    console.error('Stripe Metrics Error:', error);
    res.status(500).json({ 
      error: 'Unable to retrieve metrics', 
      details: error.message 
    });
  }
} 