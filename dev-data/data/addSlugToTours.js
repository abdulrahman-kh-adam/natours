/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel'); // Import the User model

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.log(`Error connected to the database ${err}`));

const addSlugToTours = async () => {
  try {
    const tours = await Tour.find();
    for (const tour of tours) {
      tour.slug = slugify(tour.name, { lower: true });
      await tour.save();
    }
    console.log('Slug added successfully!');
  } catch (err) {
    console.error(`Error adding slug to tours: ${err}`);
  } finally {
    process.exit();
  }
};

addSlugToTours();
