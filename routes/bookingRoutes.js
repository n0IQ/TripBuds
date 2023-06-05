const express = require("express");
const authController = require("../controllers/authControllers");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.use(authController.protect);

router.get("/checkout-session/:tourId", bookingController.getCheckoutSession);

router
  .route("/")
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
