const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("../controllers/authControllers");

const router = express.Router();

// Signup and Login Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Password Changing Routes
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);

// Get My Information
router.get("/me", userController.getMe, userController.getUser);

// Update my Information
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

// Delete my Account
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
