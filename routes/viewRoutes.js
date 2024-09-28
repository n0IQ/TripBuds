import express from 'express';
import {
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  getOverview,
} from '../controllers/viewController.js';
import { isLoggedIn, protect } from '../controllers/authControllers.js';
import { createBookingCheckout } from '../controllers/bookingController.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-bookings', protect, getMyTours);

export default router;
