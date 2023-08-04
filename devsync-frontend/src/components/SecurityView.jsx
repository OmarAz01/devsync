import React, { useState } from 'react';
import axios from 'axios';

const SecurityView = ({ user, createAlert }) => {
  const BASE_URL = 'http://localhost:8080';
  const currUser = JSON.parse(localStorage.getItem('user'));

  const [emailChange, setEmailChange] = useState({
    email: user.email,
    password: ''
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  });

  const handleEmailChange = e => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if (!passwordRegex.test(emailChange.password)) {
      createAlert(
        'Password must contain an uppercase letter, a symbol, and a number',
        'error'
      );
      return;
    }

    axios
      .post(
        `${BASE_URL}/api/user/${user.userId}/changeEmail`,
        emailChange,
        {
          headers: {
            Authorization: `Bearer ${currUser.jwt}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        createAlert('Email updated!', 'success');
        user.email = emailChange.email;
        setEmailChange({ ...emailChange, password: '' });
      })
      .catch(err => {
        if (err.response.status === 400) {
          if (err.response.data === 'Password is incorrect') {
            createAlert('Password is incorrect', 'error');
          } else if (err.response.data === 'Email already exists') {
            createAlert('Email already exists', 'error');
          }
        } else {
          createAlert('Something went wrong', 'error');
          console.log(err);
        }
      });
  };

  const handlePasswordChange = e => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if (
      !passwordRegex.test(passwordChange.password) ||
      !passwordRegex.test(passwordChange.newPassword) ||
      !passwordRegex.test(passwordChange.newPasswordConfirm)
    ) {
      createAlert(
        'Password must contain an uppercase letter, a symbol, and a number',
        'error'
      );
      return;
    }
    if (
      passwordChange.newPassword !==
      passwordChange.newPasswordConfirm
    ) {
      createAlert('Passwords do not match', 'error');
      return;
    }

    if (passwordChange.oldPassword === passwordChange.newPassword) {
      createAlert(
        'New password cannot be the same as old password',
        'error'
      );
      return;
    }

    const passwordChangeTemp = {
      oldPassword: passwordChange.password,
      newPassword: passwordChange.newPassword
    };

    axios
      .post(
        `${BASE_URL}/api/user/${user.userId}/changePassword`,
        passwordChangeTemp,
        {
          headers: {
            Authorization: `Bearer ${currUser.jwt}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        createAlert('Password updated!', 'success');
        setPasswordChange({
          password: '',
          newPassword: '',
          newPasswordConfirm: ''
        });
      })
      .catch(err => {
        if (err.response.status === 400) {
          if (err.response.data === 'Old password is incorrect') {
            createAlert('Old password is incorrect', 'error');
          }
        } else {
          createAlert('Something went wrong', 'error');
          console.log(err);
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row text-left md:items-start items-center justify-center md:justify-between">
      <div className="flex flex-col text-left items-center md:w-1/2 max-w-xs w-4/5">
        <h4 className="pl-1 md:text-xl text-base py-2 text-left w-max">
          {' '}
          Change Your Password
        </h4>
        <form className="flex flex-col text-left w-full items-center">
          <input
            type="password"
            value={passwordChange.password}
            onChange={e =>
              setPasswordChange({
                ...passwordChange,
                password: e.target.value
              })
            }
            required
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your old password..."
          />
          <input
            type="password"
            value={passwordChange.newPassword}
            onChange={e =>
              setPasswordChange({
                ...passwordChange,
                newPassword: e.target.value
              })
            }
            required
            minLength={10}
            maxLength={100}
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your new password..."
          />
          <input
            type="password"
            value={passwordChange.newPasswordConfirm}
            onChange={e =>
              setPasswordChange({
                ...passwordChange,
                newPasswordConfirm: e.target.value
              })
            }
            required
            minLength={10}
            maxLength={100}
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Re-Type in your old password..."
          />
          <button
            type="button"
            onClick={handlePasswordChange}
            className="bg-zinc-900 mt-4 py-1
                px-4 hover:bg-red-600 rounded-md md:w-72 w-full border-black border shadow-sm md:text-base text-sm">
            Save New Password{' '}
          </button>
        </form>
      </div>
      <div className="flex flex-col text-left items-center md:w-1/2 max-w-xs w-4/5">
        <h4 className="pl-1 md:text-xl text-base py-2 md:mt-0 mt-8 text-left w-max">
          Change Your Email
        </h4>
        <form className="flex flex-col text-left w-full">
          <input
            type="email"
            onChange={e =>
              setEmailChange({
                ...emailChange,
                email: e.target.value
              })
            }
            id="emailChange"
            value={emailChange.email}
            required
            minLength={10}
            maxLength={100}
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your email..."
          />
          <input
            type="password"
            id="passwordEmail"
            required
            minLength={8}
            maxLength={240}
            value={emailChange.password}
            onChange={e =>
              setEmailChange({
                ...emailChange,
                password: e.target.value
              })
            }
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your password..."
          />
          <button
            type="button"
            onClick={handleEmailChange}
            className="bg-zinc-900 mt-4 py-1
                px-4 hover:bg-red-600 rounded-md md:w-72 w-full border-black border shadow-sm md:text-base text-sm">
            Save New Email{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityView;
