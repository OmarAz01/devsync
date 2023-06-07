import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const BASE_URL = 'http://localhost:8080';
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleRegister = event => {
    event.preventDefault();

    if (register.password === register.passwordConfirmation) {
      axios
        .post(`${BASE_URL}/api/auth/register`, register)
        .then(response => {
          if (response.data.jwt === 'Username already exists') {
            toast.error('Username already exists');
            return;
          } else if (response.data.jwt === 'Email already exists') {
            toast.error('Email already exists');
            return;
          }
          localStorage.setItem(
            'user',
            JSON.stringify(response.data)
          );
          window.location.href = '/myaccount';
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex justify-center pt-12">
        <a
          href="#"
          className="bg-black text-white font-bold text-2xl p-4"
          alt="Logo">
          Logo
        </a>
      </div>

      <div className="flex flex-col justify-center my-auto pt-8 px-8 lg:px-32">
        <p className="text-center text-3xl">Register</p>
        <form
          className="flex flex-col pt-8 md:items-center"
          onSubmit={handleRegister}>
          <div className="flex items-center flex-col min-w-full">
            <label htmlFor="name" className="text-xl">
              Username
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Smith"
              value={register.username}
              required
              minLength={3}
              maxLength={10}
              onChange={e =>
                setRegister({
                  ...register,
                  username: e.target.value
                })
              }
              className="shadow appearance-none border rounded w-full md:max-w-screen-sm py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center flex-col pt-4 min-w-full">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={register.email}
              required
              minLength={10}
              maxLength={50}
              onChange={e =>
                setRegister({ ...register, email: e.target.value })
              }
              className="shadow appearance-none border rounded w-full md:max-w-screen-sm py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center flex-col pt-4 min-w-full">
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              minLength={8}
              maxLength={30}
              value={register.password}
              onChange={e =>
                setRegister({
                  ...register,
                  password: e.target.value
                })
              }
              className="shadow appearance-none border rounded w-full md:max-w-screen-sm py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center flex-col pt-4 min-w-full">
            <label htmlFor="confirm-password" className="text-xl">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Password"
              required
              minLength={8}
              maxLength={30}
              value={register.passwordConfirmation}
              onChange={e =>
                setRegister({
                  ...register,
                  passwordConfirmation: e.target.value
                })
              }
              className="shadow appearance-none border rounded w-full md:max-w-screen-sm py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-black items-center w-full md:max-w-screen-sm text-white font-bold text-lg hover:bg-gray-600 p-2 mt-8">
            Register
          </button>
        </form>
        <div className="text-center pt-12 pb-12">
          <p>
            Already have an account?{' '}
            <a href="/signin" className="underline font-semibold">
              Log in here.
            </a>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SignUp;
