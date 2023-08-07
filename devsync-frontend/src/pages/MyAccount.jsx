import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import pp1Image from '../assets/pp1.jpg';
import PostsView from '../components/PostsView';
import ProfileView from '../components/ProfileView';
import SecurityView from '../components/SecurityView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  const [user, setUser] = useState({});
  const [prompt, setPrompt] = useState('');
  const [promptImg, setPromptImg] = useState('');
  const [currView, setCurrView] = useState('Profile');
  const currUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!currUser) {
      window.location.href = '/login';
    } else {
      axios
        .get(`http://localhost:8080/api/user/${currUser.userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  const createAlert = (title, variant) => {
    if (variant === 'success') {
      return toast.success(title);
    } else {
      return toast.error(title);
    }
  };

  const handlePromptGenerate = e => {
    e.preventDefault();

    const promptTemp = prompt.split(' ').join('+');
    axios
      .get(`https://api.multiavatar.com/${promptTemp}.svg`)
      .then(res => {
        setPromptImg(res.config.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePromptSubmit = e => {
    e.preventDefault();
    const confirmed = window.confirm(
      'Once submitted, you cannot change your prompt. Are you sure?'
    );
    if (confirmed) {
      axios
        .put(
          `http://localhost:8080/api/user/${currUser.userId}/image`,
          promptImg,
          {
            headers: {
              Authorization: `Bearer ${currUser.jwt}`,
              'Content-Type': 'text/plain'
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full text-center justify-center items-center max-w-screen-xl px-4">
          {!user.imageUri ? (
            <>
              {promptImg ? (
                <Image
                  src={promptImg}
                  alt="Image"
                  className="md:w-64 md:h-64 w-44 h-44 mx-4 mb-2 mt-12 rounded-full"
                />
              ) : (
                <Image
                  src={pp1Image}
                  alt="Image"
                  className="md:w-64 md:h-64 w-44 h-44 mx-4 mb-2 mt-12 rounded-full"
                />
              )}
              <form
                className="flex flex-col justify-center items-center"
                onSubmit={handlePromptGenerate}>
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="flex w-72 p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
                  placeholder="Type a prompt to create an avatar..."
                />
                <div className="flex flex-row justify-center items-center">
                  <button
                    type="button"
                    className="bg-zinc-900 mt-4 py-1
                px-4 hover:bg-zinc-600 rounded-md w-24 border-black border shadow-sm md:text-base text-sm"
                    onClick={handlePromptGenerate}>
                    Generate{' '}
                  </button>
                  <button
                    className="bg-zinc-900 mt-4 py-1
                  px-4 hover:bg-green-600 rounded-md w-24 border-black border shadow-sm md:text-base text-sm"
                    type="button"
                    onClick={handlePromptSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </>
          ) : (
            <Image
              src={user.imageUri}
              alt="Image"
              className="md:w-64 md:h-64 w-44 h-44 mx-4 mb-2 mt-12 rounded-full"
            />
          )}
          <div className="flex flex-row items-center mt-4">
            <h4 className="md:text-2xl text-xl font-bold text-neutral-100">
              {'@'}
              {user.username}
            </h4>
            <h4 className="md:text-lg text-base text-zinc-400 pt-1 mx-2">
              {`- ${user.level}`}
            </h4>
          </div>

          <div className="flex flex-row md:w-1/2 w-4/5 justify-between items-center mt-10">
            <h4
              className={`md:text-xl text-lg text-neutral-100 hover:text-zinc-500 hover:cursor-pointer ${
                currView === 'Profile' &&
                'border-b-2 border-zinc-500'
              }}`}
              onClick={e => setCurrView('Profile')}>
              Profile
            </h4>
            <h4
              className={`md:text-xl text-lg text-neutral-100 hover:text-zinc-500 hover:cursor-pointer ${
                currView === 'Posts' && 'border-b-2 border-zinc-500'
              }}`}
              onClick={e => setCurrView('Posts')}>
              Posts
            </h4>
            <h4
              className={`md:text-xl text-lg text-neutral-100 hover:text-zinc-500 hover:cursor-pointer ${
                currView === 'Security' &&
                'border-b-2 border-zinc-500'
              }}`}
              onClick={e => setCurrView('Security')}>
              Security
            </h4>
          </div>
          <div className="w-full flex flex-col p-4 rounded-md mt-10 border border-zinc-600">
            {currView === 'Profile' ? (
              <ProfileView user={user} createAlert={createAlert} />
            ) : currView === 'Posts' ? (
              <PostsView user={user} createAlert={createAlert} />
            ) : currView === 'Security' ? (
              <SecurityView user={user} createAlert={createAlert} />
            ) : null}
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

export default MyAccount;
