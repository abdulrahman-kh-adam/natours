/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateUserData, updateUserPassword } from './updateSelf';
import { signup } from './signup';
import { bookTour } from './stripe';

const loginForm = document.querySelector('.form');
const locationsElement = document.getElementById('map');
const logoutButton = document.querySelector('.nav__el--logout');
const updateUserButton = document.querySelector('#update-user-data');
const updatePassButton = document.querySelector('#update-user-password');
const signupButton = document.querySelector('#signup-button');
const bookTourButton = document.getElementById('book-tour');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (locationsElement) {
  const locations = JSON.parse(locationsElement.dataset.locations);
  displayMap(locations);
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

if (updateUserButton) {
  document.getElementById('photo').addEventListener('change', e => {
    const file = document.getElementById('photo').files[0];
    if (file) {
      console.log('file change detected!');
      const reader = new FileReader();
      reader.onload = function(event) {
        document
          .getElementById('image')
          .setAttribute('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
  updateUserButton.addEventListener('click', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateUserData(form);
  });
}

if (updatePassButton) {
  updatePassButton.addEventListener('click', e => {
    e.preventDefault();
    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm = document.getElementById('password-confirm')
      .value;
    updateUserPassword(currentPassword, newPassword, newPasswordConfirm);
  });
}

if (signupButton) {
  signupButton.addEventListener('click', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (bookTourButton) {
  bookTourButton.addEventListener('click', e => {
    console.log('Button clicked!');
    e.preventDefault();
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });
}
