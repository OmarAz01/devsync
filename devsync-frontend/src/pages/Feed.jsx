import React, { useEffect, useState } from 'react';
import GetPosts from '../components/GetPosts';
import SubmitPost from '../components/SubmitPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feed = () => {
  const currUser = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = 'http://localhost:8080';
  const [show, setShow] = useState(false);

  const createAlert = (title, variant) => {
    if (variant === 'success') {
      return toast.success(title);
    } else {
      return toast.error(title);
    }
  };

  const updateFilterBy = queryFilter => {
    setFilterBy({
      skillQuery: queryFilter.skillQuery,
      levelQuery: queryFilter.levelQuery
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col text-center justify-center w-full max-w-screen-xl">
          <div className="flex flex-col max-w-screen-lg py-8 text-left">
            {/* Handles submit post display */}
            <div
              className={`${
                show
                  ? 'absolute w-full max-w-screen-md transition-all opacity-100 translate-y-0 duration-500 delay-200 ease-in-out'
                  : '-translate-y-96 pointer-events-none opacity-0 transition-all duration-500 ease-in-out h-0 delay-200 overflow-visible'
              }`}>
              <SubmitPost
                setShow={setShow}
                createAlert={createAlert}
              />
            </div>
            <button
              onClick={() => setShow(!show)}
              className={`${
                show
                  ? 'opacity-0 pointer-events-none transition-opacity'
                  : 'transition-opacity opacity-100 duration-300 delay-500'
              } hover:bg-zinc-600 md:text-2xl text-lg py-1 h-fit border-2 border-black px-4 shadow-sm rounded-md md:mx-8 mt-8 bg-zinc-900 mx-4 hover:cursor-pointer w-fit`}>
              New Post
            </button>
          </div>
          {/* Handles animation and displays posts */}
          <div className="flex flex-row">
            <div
              className={`${
                show
                  ? 'transition-all duration-500 ease-in-out md:translate-y-[500px] translate-y-[450px] delay-200'
                  : 'translate-y-0 transition-all duration-500 ease-in-out delay-200'
              } flex flex-col max-w-screen-md w-full pb-8 text-left items-center mx-4 md:mx-8`}>
              <div className="flex flex-col content-left w-full text-left py-8">
                <h4 className="text-2xl md:text-3xl pt-2 pb-2 md:pb-8">
                  Browse Posts
                </h4>
              </div>
              <GetPosts createAlert={createAlert} userId={-1} />
            </div>
            <div className="border-2 w-full max-w-sm hidden lg:flex p-4 mx-4">
              <h4>Messaging</h4>
            </div>
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
