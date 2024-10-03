const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }
  const reviews = await Review.find(filter);
  if (!reviews) {
    return next(new AppError('No reviews found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError(`No review found with id: ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const tourId = req.body.tour ? req.body.tour : req.params.tourId;
  const currentReview = await Review.findOne({ user: userId, tour: tourId });

  // Check if user has already added a review to this tour
  if (currentReview) {
    return next(
      new AppError('You have already added a review to this tour', 400)
    );
  }

  // Check if user has booked the tour
  const bookings = await Booking.find({ user: userId, tour: tourId });
  if (bookings.length === 0) {
    return next(
      new AppError('You must have booked the tour to add a review', 400)
    );
  }

  const review = {
    review: req.body.review,
    rating: req.body.rating,
    user: userId,
    tour: tourId
  };
  const newReview = await Review.create(review);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
