/* eslint-disable */
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signin',
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    const label = document.querySelector('.login-error-label');
    const message = err.response.data.message;
    const div = document.querySelector('.login-error');
    div.classList.remove('hidden');
    label.innerHTML = message;
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/signout'
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    console.log(err.response);
  }
};
