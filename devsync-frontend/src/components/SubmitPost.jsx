import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitPost = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = 'http://localhost:8080';
  const [post, setPost] = useState({
    content: '',
    levelNeeded: 'Beginner',
    skillNeeded: 'Web Dev',
    title: '',
    userId: '',
    dateCreated: ''
  });

  const success = () =>
    toast.success('Post Created', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });

  const error = () =>
    toast.error('An Error Has Occurred', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });

  const signInError = () =>
    toast.error('Please Sign in', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });

  const handlePost = () => {
    if (user) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const updatedPost = { ...post, userId: user.userId, dateCreated: formattedDate };

      axios
        .post(`${BASE_URL}/api/posts/create`, updatedPost)
        .then((response) => {
          success();
        })
        .catch((error) => {
          error();
          console.log(error);
        });
    } else {
      signInError();
    }
  };

  console.log(post);

  return (
    <>
      <h4
        onClick={() => {
          setPost({ ...post, userId: user.id, dateCreated: new Date() });
          handlePost();
        }}
        className="hover:text-gray-400 md:text-3xl text-2xl w-96 py-8 md:px-8 px-4 underline hover:cursor-pointer"
      >
        Submit Your Post
      </h4>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
        <textarea
          maxLength={250}
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
          className="flex md:ml-8 ml-4 md:mb-4 md:w-96 w-72 h-40 p-2 resize-none bg-neutral-900 text-m leading-tight focus:outline-none focus:shadow-outline rounded"
        />
        <div className="flex flex-row justify-between mb-4 ml-4 md:ml-8 md:w-96 w-72">
          <div className="flex flex-col">
            <label htmlFor="skills-needed" className="md:text-lg py-3 pr-8">
              Skills Needed
            </label>
            <select
              required
              id="skills"
              value={post.skillNeeded}
              onChange={(e) => setPost({ ...post, skillNeeded: e.target.value })}
              className="mb-4 w-34 h-10 p-2 bg-neutral-900 text-m leading-tight focus:outline-none hover:cursor-pointer focus:shadow-outline rounded ease"
            >
              <option value="Web Dev">Web Dev</option>
              <option value="Mobile Dev">Mobile Dev</option>
              <option value="Data Science">Data Science</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Game Dev">Game Dev</option>
            </select>
          </div>
          <div className="flex flex-col items-end">
            <label htmlFor="level-needed" className="md:text-lg py-3 pl-8">
              Level Needed
            </label>
            <select
              required
              id="level"
              value={post.levelNeeded}
              onChange={(e) => setPost({ ...post, levelNeeded: e.target.value })}
              className="absolutemx-8 hover:cursor-pointer mb-4 w-32 h-10 p-2 bg-neutral-900 text-m leading-tight focus:outline-none focus:shadow-outline rounded ease"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
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

export default SubmitPost;
