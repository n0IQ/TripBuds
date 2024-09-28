import express from 'express';
import { protect } from '../controllers/authControllers.js';
import {
  getCheckoutSession,
  getAllBooking,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.route('/').get(getAllBooking).post(createBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
