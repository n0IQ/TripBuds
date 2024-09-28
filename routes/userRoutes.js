import express from 'express';
import {
  getMe,
  getUser,
  updateUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe,
  createUser,
} from './../controllers/userController.js';
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} from '../controllers/authControllers.js';

const router = express.Router();

// Signup and Login Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Password Changing Routes
router.post('/forgotPassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);

// Get My Information
router.get('/me', getMe, getUser);

// Update my Information
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

// Delete my Account
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
