const express = require("express");
const tourController = require("../controllers/tourControllers");
const authController = require("../controllers/authControllers");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

// router.param('id', tourController.checkID); middleware for params

// nested route ->
// GET - tours/tourId/reviews
// POST - tours/tourId/reviews

router.use("/:tourId/reviews", reviewRouter);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);

router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );

// Get tours within certain range
// '/tours-within/:distance/center/:latitude&longitude/unit/:unit'
// '/tours-within/250/center/19.126305,72.890745/unit/mi'
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);

// '/tours/distances/:latitude&longitude/unit/mi'
// '/tours/distances/19.126305,72.890745/unit/mi'
router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;