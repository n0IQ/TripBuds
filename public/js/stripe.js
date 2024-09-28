import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51NFMGzSDbDC0HGSBORR4JL782MdQDXx6TBIOTNTfQxXAe5kiX15uGbB7GVW7GNotJU7r8DpeduUz3BhNPTpHGtDf00MD7uvnvm'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
