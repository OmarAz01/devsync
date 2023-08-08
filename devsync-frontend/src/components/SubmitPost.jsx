import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircumIcon from '@klarr-agency/circum-icons-react';

const SubmitPost = ({ setShow, createAlert }) => {
  const currUser = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [post, setPost] = useState({
    content: '',
    levelNeeded: ['Beginner'],
    skillNeeded: ['Web Dev'],
    dateCreated: ''
  });

  // Creates a new post
  const handlePost = () => {
    if (currUser) {
      if (post.content.length < 10) {
        createAlert('Post must be at least 10 characters', 'error');
        return;
      }
      const currentFormattedDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const updatedPost = {
        ...post,
        levelNeeded: post.levelNeeded.join(', '),
        skillNeeded: post.skillNeeded.join(', '),
        dateCreated: currentFormattedDate
      };

      axios
        .post(`${BASE_URL}/api/posts/create`, updatedPost, {
          headers: {
            Authorization: `Bearer ${currUser.jwt}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.status !== 201) {
            createAlert('Error creating post', 'error');
            return;
          }
          setShow(false);
          setPost({
            content: '',
            levelNeeded: ['Beginner'],
            skillNeeded: ['Web Dev'],
            dateCreated: ''
          });
          createAlert('Post created successfully', 'success');
        })
        .catch(error => {
          if (error.response.status === 401) {
            createAlert('Please login to create a post', 'error');
            return;
          }
          console.log(error);
          createAlert('Error creating post', 'error');
        });
    } else {
      createAlert('Please login to create a post', 'error');
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between md:mx-8 mx-4 max-w-xl">
        <button
          onClick={handlePost}
          className="hover:bg-zinc-600 md:text-xl text-base h-fit py-1 border-2 border-black px-4 shadow-lg rounded-md mt-8 bg-zinc-900 hover:cursor-pointer w-fit">
          Submit
        </button>
        <button
          onClick={() => setShow(false)}
          className="hover:bg-zinc-600  md:text-xl text-base h-fit py-1 border-2 border-black px-4 shadow-lg rounded-md mt-8 mb-2 bg-zinc-900 hover:cursor-pointer w-fit">
          Cancel
        </button>
      </div>
      {/* Post Creation */}
      <form
        onSubmit={e => e.preventDefault()}
        className="flex flex-col w-fill">
        <div className="flex flex-col p-4 max-w-xl w-11/12 bg-zinc-800 md:mx-8 mx-4 rounded-md border border-black shadow-md">
          <textarea
            maxLength={250}
            minLength={10}
            value={post.content}
            placeholder="What type of project do you need help with?"
            onChange={e =>
              setPost({ ...post, content: e.target.value })
            }
            required
            className="placeholder:italic placeholder:text-xs placeholder:md:text-base flex mb-2 w-full h-40 px-4 py-4 resize-none bg-zinc-700 text-xs md:text-base leading-tight focus:outline-none focus:shadow-outline rounded-lg"
          />
          <div className="flex flex-row mb-4 text-left flex-wrap">
            <div className="flex flex-row flex-wrap ">
              <h4 className="md:text-base text-xs w-fit pr-2 py-1 my-2 md:my-1">
                Skills Needed:
              </h4>
              {/* Displays skills selected and deletes them when clicked */}
              {post.skillNeeded.map((skill, index) => (
                <h4
                  onClick={() => {
                    if (post.skillNeeded.length !== 1) {
                      setPost(prevPost => ({
                        ...prevPost,
                        skillNeeded: prevPost.skillNeeded.filter(
                          s => s !== skill
                        )
                      }));
                    }
                  }}
                  key={index}
                  className="flex items-center flex-row md:text-base text-xs w-fit mr-2 mt-1 h-fit hover:bg-red-500 hover:cursor-pointer rounded-md bg-zinc-900 px-2 py-1">
                  {skill + ' |'}&nbsp;
                  <CircumIcon size="22px" name="square_remove" />
                </h4>
              ))}
            </div>
          </div>
          <div className="flex flex-row mb-4 text-left flex-wrap">
            <div className="flex flex-row flex-wrap">
              <h4 className="md:text-base text-xs w-fit pr-2 py-1 my-2 md:my-1">
                Level Needed:
              </h4>
              {/* Displays levels selected and deletes them when clicked */}
              {post.levelNeeded.map((level, index) => (
                <h4
                  onClick={() => {
                    if (post.levelNeeded.length !== 1) {
                      setPost(prevPost => ({
                        ...prevPost,
                        levelNeeded: prevPost.levelNeeded.filter(
                          string => string !== level
                        )
                      }));
                    }
                  }}
                  key={index}
                  className="flex flex-row items-center md:text-base text-xs w-fit mr-2 mt-1 h-fit hover:bg-red-500 hover:cursor-pointer rounded-md bg-zinc-900 px-2 py-1">
                  {level + ' |'}&nbsp;
                  <CircumIcon size="22px" name="square_remove" />
                </h4>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between border-t border-zinc-700">
            <div className="flex flex-col">
              {/* Handles select box for skill */}
              <label
                htmlFor="skills-needed"
                className="text-base py-3 pr-8">
                Skills Needed
              </label>
              <select
                required
                id="skills-needed"
                value={post.skillNeeded.at(-1)}
                onChange={e => {
                  // if the skill is already in the array, remove it, otherwise add it
                  if (post.skillNeeded.includes(e.target.value)) {
                    setPost(prevPost => ({
                      ...prevPost,
                      skillNeeded: prevPost.skillNeeded.filter(
                        string => string !== e.target.value
                      )
                    }));
                  } else {
                    setPost(prevPost => ({
                      ...prevPost,
                      skillNeeded: [
                        ...prevPost.skillNeeded,
                        e.target.value
                      ]
                    }));
                  }
                }}
                className="mb-4 w-34 h-10 p-2 bg-neutral-900 md:text-base text-xs leading-tight focus:outline-none hover:cursor-pointer focus:shadow-outline rounded ease">
                <option value="Web Dev">Web Dev</option>
                <option value="Mobile Dev">Mobile Dev</option>
                <option value="Data Science">Data Science</option>
                <option value="UX">UX</option>
                <option value="Cyber Security">
                  Cyber Security
                </option>
                <option value="Game Dev">Game Dev</option>
              </select>
            </div>
            <div className="flex flex-col items-end">
              {/* Handles select box for level */}
              <label
                htmlFor="level-needed"
                className="text-base py-3 pl-8">
                Levels Needed
              </label>
              <select
                required
                id="level-needed"
                value={post.levelNeeded.at(-1)}
                // if the level is already in the array, remove it, otherwise add it
                onChange={e => {
                  if (post.levelNeeded.includes(e.target.value)) {
                    setPost(prevPost => ({
                      ...prevPost,
                      levelNeeded: prevPost.levelNeeded.filter(
                        string => string !== e.target.value
                      )
                    }));
                  } else {
                    setPost(prevPost => ({
                      ...prevPost,
                      levelNeeded: [
                        ...prevPost.levelNeeded,
                        e.target.value
                      ]
                    }));
                  }
                }}
                className="absolutemx-8 hover:cursor-pointer mb-4 w-32 h-10 p-2 bg-neutral-900 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline rounded ease">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SubmitPost;
