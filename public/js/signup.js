/* eslint-disable */
import axios from 'axios';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://natours-e25j.onrender.com/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    console.log(err.response);
    const label = document.querySelector('.signup-error-label');
    const div = document.querySelector('.signup-error');
    const errmsg = err.response.data.message;
    let message = '';
    if (errmsg.startsWith('E11000')) {
      const endIndex = errmsg.split('key:')[1].indexOf(':');
      const key = errmsg.split('key:')[1].substring(3, endIndex);
      message = `User with that name ${key} already exists`;
    } else if (errmsg.includes('Passwords are not the same!')) {
      message = 'Passwords are not the same!';
    } else if (errmsg.includes('Password must contain')) {
      message =
        'Password must contain at least one capital letter, one small letter, and one number.';
    } else {
      message = errmsg;
    }
    div.classList.remove('hidden');
    label.innerHTML = message;
  }
};

// "TypeError: Cannot read properties of undefined (reading 'split')
// at new Email (E:\Personal Stuff\_Backend\complete-node-bootcamp-master\4-natours\after-section-06\utils\Email.js:8:32)
// at E:\Personal Stuff\_Backend\complete-node-bootcamp-master\4-natours\after-section-06\controllers\authController.js:48:9
// at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
