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
  MyAccount,
  Feed,
  UserProfile
} from './pages/index';
import axios from 'axios';
import '../index.css';

const App = () => {
  const BASE_URL = 'http://localhost:8080';
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
            console.log('Logged In');
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
            devsync{' '}
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
              <Link to="/messaging">
                <h4 className="px-4 py-1 hover:text-zinc-500 text-left border-b border-zinc-600">
                  Messaging
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
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/myaccount" element={<MyAccount />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/:username" element={<UserProfile />} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes> */}
      </main>
      <footer></footer>
    </BrowserRouter>
  );
};

export default App;
