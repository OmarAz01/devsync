import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import pp1Image from '../assets/pp1.jpg';

const GetPosts = ({ createAlert }) => {
  const BASE_URL = 'http://localhost:8080';
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [users, setUsers] = useState([]);
  const currUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/posts/all`
        );
        setPosts(response.data);
        fetchUsersForPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  // Fetches all the users of the posts
  const fetchUsersForPosts = async posts => {
    const userIds = posts.map(post => post.userId);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/userforpost`,
        { userIds }
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetches the one user for the post
  const fetchUserForPost = id => {
    const user = users.find(user => user.userId === id);

    return user;
  };

  const handleMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 10);
  };

  const handleDelete = async postId => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/delete/${postId}`);
      createAlert('Post deleted', 'success');
    } catch (error) {
      createAlert('Error deleting post', 'error');
      console.log(error);
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/posts/all`);
      setPosts(response.data);
      fetchUsersForPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formateTime = minutes => {
    if (minutes < 1) {
      return 'less than 1 minute ago';
    } else if (minutes < 60) {
      return minutes + ' minutes ago';
    } else if (minutes < 120) {
      return Math.floor(minutes / 60) + ' hour ago';
    } else if (minutes < 1440) {
      return Math.floor(minutes / 60) + ' hours ago';
    } else if (minutes < 2880) {
      return Math.floor(minutes / 1440) + ' day ago';
    } else {
      return Math.floor(minutes / 1440) + ' days ago';
    }
  };

  // To be implemented
  const handleEdit = postId => {};

  return (
    <>
      {posts.slice(0, visiblePosts).map(post => {
        const postUser = fetchUserForPost(post.userId);
        const submittedDate = new Date(post.dateCreated);
        const currentDate = new Date(
          new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York'
          })
        );
        const timeDiff = Math.abs(
          currentDate.getTime() - submittedDate.getTime()
        );
        const minutes = Math.floor(timeDiff / 60000);

        return (
          <div
            key={post.postId}
            className="pt-4 pb-6 border rounded-lg shadow-md border-black my-4 min-w-full 
          max-w-screen-md bg-zinc-800 flex flex-row">
            <div className="flex flex-col text-center justify-center items-center min-w-fit">
              <Image // User Information
                src={pp1Image}
                alt="image"
                className="md:w-20 md:h-20 w-12 h-12 mx-4 mb-2 rounded-full"
              />
              <h4 className="md:text-base text-xs">
                {' '}
                {postUser ? '@' + postUser.username : null}{' '}
              </h4>
              <h4 className="md:text-base text-xs">
                {' '}
                {postUser ? postUser.level : null}{' '}
              </h4>
              {post.userId === currUser.userId ? (
                <>
                  <button
                    onClick={() => {
                      handleDelete(post.postId);
                    }}
                    className="bg-red-600 mt-2 
              px-2 hover:bg-red-500 rounded-md w-18 md:text-base text-xs">
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(post.postId)}
                    className="bg-blue-600 mt-2 
              px-4 hover:bg-blue-500 rounded-md md:text-base text-xs">
                    Edit
                  </button>
                </>
              ) : null}
            </div>
            <div className="flex flex-col w-11/12 max-w-screen-sm relative rounded-lg mr-2 bg-zinc-700">
              <p className="text-sm md:text-base px-4 py-2 break-all mb-8">
                {post.content}
              </p>
              <div className="flex flex-row justify-between">
                <h3 className="text-sm md:text-base pt-6 px-4 absolute bottom-2">
                  {' '}
                  Skills Needed: {postUser ? post.skillNeeded : null}
                </h3>
              </div>
              <div className="flex absolute -bottom-5 right-0">
                <h4 className="text-xs opacity-60 italic">
                  {' '}
                  {formateTime(minutes)}{' '}
                </h4>
              </div>
            </div>
          </div>
        );
      })}

      {visiblePosts < posts.length ? (
        <button
          className="hover:text-zinc-500"
          onClick={handleMorePosts}>
          Load More...
        </button>
      ) : (
        <h4 className="text-sm md:text-base text-center py-4">
          No more posts to show
        </h4>
      )}
    </>
  );
};

export default GetPosts;
