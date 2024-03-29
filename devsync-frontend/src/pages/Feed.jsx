import React, { useEffect, useState } from 'react';
import GetPosts from '../components/GetPosts';
import SubmitPost from '../components/SubmitPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplaySyncs from '../components/DisplaySyncs';
import Sync from '../components/Sync';
import axios from 'axios';

const Feed = () => {
  const currUser = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [show, setShow] = useState(false);
  const [sync, setSync] = useState({
    receiverId: '',
    senderId: '',
    receiverUsername: '',
    syncShow: false
  });
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (!currUser) {
      return;
    }
    //get user to find out role
    axios
      .get(`${BASE_URL}/api/user/${currUser.userId}`)
      .then(res => {
        setUserRole(res.data.role);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const createAlert = (title, variant) => {
    if (variant === 'success') {
      return toast.success(title);
    } else {
      return toast.error(title);
    }
  };

  const createSync = sync => {
    setSync({
      receiverId: sync.receiverId,
      senderId: sync.senderId,
      receiverUsername: sync.receiverUsername,
      syncShow: true
    });
  };

  const handleSyncShow = () => {
    setSync({
      receiverId: '',
      senderId: '',
      receiverUsername: '',
      syncShow: false
    });
  };

  return (
    <>
      {/* Handles sync display */}
      {sync.syncShow && (
        <>
          <div
            class="fixed z-10 inset-0 bg-zinc-600 bg-opacity-50 h-full w-full"
            id="my-modal"></div>
          <div className="fixed max-w-2xl w-3/4 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 justify-center">
            <Sync
              senderId={sync.senderId}
              receiverId={sync.receiverId}
              receiverUsername={sync.receiverUsername}
              handleSyncShow={handleSyncShow}
              createAlert={createAlert}
            />
          </div>
        </>
      )}
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
              } hover:bg-blue-500 md:text-xl text-base py-1 h-fit border-2 border-black px-4 shadow-sm rounded-md md:mx-8 mt-2 bg-zinc-900 mx-4 hover:cursor-pointer w-fit`}>
              Create a New Post
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
              <div className="flex flex-col content-left w-full text-left pt-2 pb-4">
                <h4 className="text-2xl md:text-3xl pt-2">
                  Browse Posts
                </h4>
              </div>
              <GetPosts
                createAlert={createAlert}
                userId={-1}
                userRole={currUser ? userRole : ''}
                createSync={createSync}
              />
            </div>
            <div className="border rounded-md border-zinc-700 w-full mt-10 max-w-sm hidden lg:flex p-4 mx-4 flex-col">
              <div className="flex flex-col w-full border-b-2 border-zinc-600 h-fit text-center">
                <h1 className="text-3xl pb-2 text-neutral-100">
                  Received Syncs
                </h1>
              </div>
              {currUser && <DisplaySyncs userId={currUser.userId} />}
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
