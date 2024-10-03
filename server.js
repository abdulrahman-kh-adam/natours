const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.warn(' --> UNCAUGHT EXCEPTION! Shutting down...');
  console.error(' -->', err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() =>
    console.log('\x1b[32m --> Database connected successfully! \x1b[0m')
  );

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`\x1b[33m --> App running on port ${port}... \x1b[0m`);
});

process.on('unhandledRejection', err => {
  console.warn(' --> UNHANDLED REJECTION! Shutting down...');
  console.error(' -->', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
