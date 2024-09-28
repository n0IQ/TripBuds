import express from 'express';
import {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  setTourUserId,
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authControllers.js';

const router = express.Router({ mergeParams: true });

// Protect all routes
router.use(protect);

// Routes for reviews
router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserId, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

export default router;
