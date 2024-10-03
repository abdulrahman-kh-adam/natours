const express = require('express');
const controller = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(controller.setCSPHeaders);

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  controller.getOverview
);
router.get('/tours/:slug', authController.isLoggedIn, controller.getTour);
router.get('/login', authController.isLoggedIn, controller.getLoginForm);
router.get('/signup', authController.isLoggedIn, controller.getSignupForm);
router.get('/me', authController.protect, controller.getAccount);
router.get('/my-tours', authController.protect, controller.getMyTours);
router.get('/my-reviews', authController.protect, controller.getMyReviews);

module.exports = router;
