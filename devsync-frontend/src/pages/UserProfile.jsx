import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import pp1Image from '../assets/pp1.jpg';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const currUser = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Get the username from the URL
    const usernameFromURL = location.pathname.split('/')[2];

    if (usernameFromURL) {
      axios
        .get(`${BASE_URL}/api/user/profile/${usernameFromURL}`)
        .then(response => {
          if (currUser && response.data.userId === currUser.userId) {
            navigate('/myaccount');
          }
          setUser(response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            toast.error('User not found');
            setUser(null);
            return;
          }
          console.log(error);
        });
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  return user ? (
    <div className="flex flex-col justify-center items-center p-5">
      <Image
        src={user.imageUri ? user.imageUri : pp1Image}
        alt="Image"
        className="md:w-64 md:h-64 w-44 h-44 mx-4 mb-2 mt-12 rounded-full"
      />

      <div className="flex flex-row items-center mt-4">
        <h4 className="md:text-2xl text-xl font-bold text-neutral-100">
          {'@'}
          {user.username}
        </h4>
        <h4 className="md:text-lg text-base text-zinc-400 pt-1 mx-2">
          {`- ${user.level}`}
        </h4>
      </div>
      <div className="w-full flex flex-col p-4 rounded-md mt-10 border border-zinc-600">
        <div className="flex flex-row border-b justify-between pb-2 ">
          <h4 className="md:text-xl text-lg text-left">About Me</h4>
        </div>
        {user.bio ? (
          <p className="text-neutral-100 mt-4 text-left md:h-56 h-44">
            {user.bio}
          </p>
        ) : (
          <p className="text-neutral-100 italic mt-4 text-left md:h-56 h-44">
            {user.username} has not written about themselves yet.
          </p>
        )}
        <div className="flex flex-row border-b justify-between pb-2 ">
          <h4 className="md:text-xl text-lg text-left">Skills</h4>
        </div>
        <div className="flex flex-row w-full flex-wrap justify-start items-left mt-4 h-24">
          {user.skill !== undefined && user.skill !== null ? (
            user.skill.split(', ').map(skill => (
              <h4
                key={skill}
                className="flex items-center flex-row md:text-base text-sm w-fit mr-2 mt-1 h-fit rounded-md bg-zinc-700 px-2 py-1
                    ">
                {skill}
              </h4>
            ))
          ) : (
            <p className="text-neutral-100 italic text-left md:h-56 h-44">
              {user.username} has not added any skills yet.
            </p>
          )}
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
  ) : (
    <div className="flex flex-col justify-center items-center p-5">
      <h4 className="md:text-2xl text-xl font-bold text-neutral-100">
        User not found
      </h4>
      <button
        onClick={() => navigate('/feed')}
        className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-neutral-100 font-bold py-2 px-4 rounded">
        Back to the feed
      </button>
    </div>
  );
};

export default UserProfile;
