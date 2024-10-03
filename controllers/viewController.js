const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');

exports.setCSPHeaders = (req, res, next) => {
  res.set(
    'Content-Security-Policy',
    "default-src 'self' https://*.mapbox.com; base-uri 'self'; block-all-mixed-content; font-src 'self' https: data:; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob:; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests; connect-src 'self' ws://localhost:* https://*.mapbox.com; frame-src 'self' https://js.stripe.com;"
  );

  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  if (!tours) {
    return next(new AppError('No tours found!', 404));
  }
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: '-tour -__v -_id'
  });
  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Create a new account'
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });
  const tourIds = bookings.map(booking => booking.tour.id);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  res.status(200).render('myBookings', {
    title: 'My Bookings',
    tours
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user._id });
  if (!reviews) {
    return next(new AppError('No reviews found', 404));
  }
  res.status(200).render('myReviews', {
    title: 'My Reviews',
    reviews
  });
});
