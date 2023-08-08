import React, { useEffect, useState, useRef } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes
} from 'react-router-dom';
import {
  SignIn,
  SignUp,
  SignOut,
  MyAccount,
  Feed,
  UserProfile,
  Home
} from './pages/index';
import axios from 'axios';
import '../index.css';
import githubLogo from './assets/github-logo.png';

const App = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const refOpen = useRef(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem('user'));
    if (currUser) {
      const token = currUser.jwt;
      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios
        .post(`${BASE_URL}/api/auth/validate`, null, {
          headers: headers
        })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem(
              'user',
              JSON.stringify(response.data)
            );
            setLoggedIn(true);
          }
        })
        .catch(error => {
          if (
            error.response.status === 404 ||
            error.response.status === 403
          ) {
            setLoggedIn(false);
            localStorage.removeItem('user');
          } else {
            console.log(error);
          }
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, []);

  const handleClickOutside = e => {
    if (refOpen.current && !refOpen.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <BrowserRouter>
      <header className="flex flex-row justify-end md:text-lg">
        <Link to="/">
          <h4 className="p-4 absolute left-0 hover:text-zinc-500">
            {' '}
            devsync.{' '}
          </h4>
        </Link>
        <Link to="/feed">
          <h4 className="p-4 relative hover:text-zinc-500">
            {' '}
            Feed{' '}
          </h4>
        </Link>
        {loggedIn ? (
          <>
            <h4
              className="p-4 hover:text-zinc-500 hover:cursor-pointer"
              onClick={() => setOpen(!open)}
              ref={refOpen}>
              My Account
            </h4>
            <div
              className={`${
                open ? 'show' : 'hidden'
              } absolute right-0 top-14 border mx-2 rounded-md border-zinc-600 `}>
              <Link to="/myaccount">
                <h4 className="px-4 py-1 hover:text-zinc-500 text-left border-b border-zinc-600">
                  Profile
                </h4>
              </Link>
              <Link to="/signout">
                <h4 className="px-4 py-1 hover:text-red-500 text-left">
                  Sign Out
                </h4>
              </Link>
            </div>
          </>
        ) : (
          <Link to="/signin">
            <h4 className="p-4 hover:text-gray-400">Sign In</h4>
          </Link>
        )}
      </header>
      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myaccount" element={<MyAccount />} /> */
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/profile/:username"
            element={<UserProfile />}
          />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </main>
      <footer>
        <div className="p-4 mt-4 relative inset-x-0 bottom-0 h-fit border-t border-zinc-700 items-center justify-center text-center">
          <div className="w-full items-center flex flex-col">
            <p className="text-gray-400 pb-2">
              Created by Omar Alzoubi
            </p>
            <a href="https://github.com/OmarAz01/devsync">
              <img
                className="w-10 bg-inherit hover:transform hover:scale-110 pb-4"
                src={githubLogo}
                alt="Github Profile"
              />
            </a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
};

export default App;
