import express from 'express';
import {
  getAllTours,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  deleteTour,
  uploadTourImages,
  resizeTourImages,
  updateTour,
  getToursWithin,
  getDistances,
  getTour,
  createTour,
} from '../controllers/tourControllers.js';
import { protect, restrictTo } from '../controllers/authControllers.js';
import reviewRouter from '../routes/reviewRoutes.js';

const router = express.Router();

// router.param('id', tourController.checkID); middleware for params

// nested route ->
// GET - tours/tourId/reviews
// POST - tours/tourId/reviews

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

// Get tours within certain range
// '/tours-within/:distance/center/:latitude&longitude/unit/:unit'
// '/tours-within/250/center/19.126305,72.890745/unit/mi'
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

// '/tours/distances/:latitude&longitude/unit/mi'
// '/tours/distances/19.126305,72.890745/unit/mi'
router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

export default router;
