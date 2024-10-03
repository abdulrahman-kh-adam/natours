/* eslint-disable */
import axios from 'axios';

const stripe = Stripe(
  'pk_test_51Q59GHHIf3k7oCiy6J7falzKwDdWyiZks6Im677pMwr2Ww1YwzPi30g0Jc7DTVBHpIlMDIilHKRJiSwOTwUwvYWO00XmRVuIMf'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `https://natours-e25j.onrender.com/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
    // 3) Redirect to tour page
  } catch (err) {}
};
