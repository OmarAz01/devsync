import React, { useEffect, useState } from 'react';
import GetPosts from '../components/GetPosts';
import SubmitPost from '../components/SubmitPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = 'http://localhost:8080';
  const [show, setShow] = useState(false);

  const createAlert = (title, variant) => {
    if (variant === 'success') {
      return toast.success(title);
    } else {
      return toast.error(title);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full text-center justify-center max-w-screen-xl">
          <div className="flex flex-col max-w-screen-lg py-8 text-left">
            <div
              className={`${
                show
                  ? 'absolute w-full max-w-full transition-all opacity-100 translate-y-0 duration-500 delay-200 ease-in-out'
                  : '-translate-y-96 pointer-events-none opacity-0 transition-all duration-500 ease-in-out h-0 delay-200 overflow-visible'
              }`}>
              <SubmitPost
                setShow={setShow}
                createAlert={createAlert}
              />
            </div>
            <h4
              onClick={() => setShow(!show)}
              className={`${
                show
                  ? 'opacity-0 pointer-events-none transition-opacity'
                  : 'transition-opacity opacity-100 duration-300 delay-500'
              } hover:text-gray-400 md:text-3xl text-2xl py-8 md:px-8 px-4 underline hover:cursor-pointer w-56`}>
              Start a post
            </h4>
          </div>
          <div
            className={`${
              show
                ? 'transition-all duration-500 ease-in-out md:translate-y-1/2 translate-y-96'
                : 'translate-y-0 transition-all duration-500 ease-in-out'
            } transition-transform translate-y-0 duration-1000 ease-in-out flex flex-col max-w-screen-md pb-8 text-left items-center mx-4 md:mx-8`}>
            <h4 className="text-3xl md:pl-8 pl-4 py-8 ">Posts</h4>
            <GetPosts createAlert={createAlert} />
          </div>
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
    </>
  );
};

export default Feed;
