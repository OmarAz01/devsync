import axios from 'axios';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignOut = () => {
  const BASE_URL = 'http://localhost:8080';
  const currUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (currUser) {
      axios
        .get(`${BASE_URL}/api/auth/logout`, {
          headers: {
            Authorization: `Bearer ${currUser.jwt}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            toast.success(
              'Successfully logged out, redirecting to home page'
            );
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          }
        })
        .catch(error => {
          toast.error('Something went wrong');
        });
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <>
      <div>SignOut</div>
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
      ;
    </>
  );
};

export default SignOut;
