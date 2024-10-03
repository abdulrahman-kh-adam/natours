/* eslint-disable */
import axios from 'axios';

export const updateUserData = async data => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/update-self',
      data
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    const label = document.querySelector('.update-error-label');
    const message = 'Error updating user data. Please try again.';
    const div = document.querySelector('.update-error');
    div.classList.remove('hidden');
    label.innerHTML = message;
  }
};

export const updateUserPassword = async (
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/update-password',
      data: {
        password: currentPassword,
        newPassword,
        newPasswordConfirm
      }
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    const label = document.querySelector('.pass-error-label');
    const message = err.response.data.message;
    const div = document.querySelector('.pass-error');
    div.classList.remove('hidden');
    label.innerHTML = message;
  }
};
