/******Start Modules Imports******/
// NPM Modules
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Custom Modules
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
/******End Modules Imports******/

/******Start Creating Express App******/
const app = express();
/******End Creating Express App******/

/******Start Enabling CORS******/
app.use(cors());
/******End Enabling CORS******/

/******Start Setting View Engine******/
app.set('view engine', 'pug');
/******End Setting View Engine******/

/******Start Setting Views Path******/
app.set('views', path.join(__dirname, 'views'));
/******End Setting Views Path******/

/******Start Global Middlewares******/
// Set http security headers
app.use(helmet());

// Enable logging only in development environment
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Limit the number of requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
/******End Global Middlewares******/

/******Start Views Routes******/
app.use('/', viewRouter);
/******End Views Routes******/

/******Start Mounting Routers******/
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
/******End Mounting Routers******/

/******Start Handling Unhandled Routes******/
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);
/******Start Handling Unhandled Routes******/

module.exports = app;
