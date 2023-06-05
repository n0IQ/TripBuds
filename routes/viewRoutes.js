const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authControllers");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get(
  "/",
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get("/tour/:slug", authController.isLoggedIn, viewController.getTour);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/me", authController.protect, viewController.getAccount);
router.get("/my-bookings", authController.protect, viewController.getMyTours);

module.exports = router;
