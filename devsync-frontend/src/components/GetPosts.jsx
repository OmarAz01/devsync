import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import pp1Image from '../assets/pp1.jpg';
import FilterBy from './FilterBy';

const GetPosts = ({ createAlert }) => {
  const BASE_URL = 'http://localhost:8080';
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(false);
  const [lastPostDate, setLastPostDate] = useState(
    new Date().toISOString().slice(0, 19).replace('T', ' ')
  );
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState({
    edit: false,
    postId: '',
    content: ''
  });
  const [filterBy, setFilterBy] = useState({
    skillQuery: '',
    levelQuery: '',
    date: ''
  });
  const currUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getPosts();
  }, [filterBy]);

  const updateFilterBy = filter => {
    setFilterBy(filter);
  };

  const getPosts = async () => {
    if (filterBy.skillQuery === '' && filterBy.levelQuery === '') {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/posts/all`,
          new Date().toISOString().slice(0, 19).replace('T', ' ')
        );
        if (response.data.length < 10) {
          setLastPost(true);
        }
        if (response.status === 200) {
          setPosts(response.data);
          setLastPostDate(
            response.data[response.data.length - 1].dateCreated
          );
          fetchUsersForPosts(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setLastPost(true);
          console.log('No posts found');
        } else {
          console.log(error);
        }
      }
    } else {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/posts/query`,
          {
            ...filterBy,
            date: new Date()
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ')
          }
        );
        if (response.data.length < 10) {
          setLastPost(true);
        }
        if (response.status === 200) {
          setPosts(response.data);
          setLastPostDate(
            response.data[response.data.length - 1].dateCreated
          );
          fetchUsersForPosts(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setLastPost(true);
          console.log('No posts found');
        } else {
          console.log(error);
        }
      }
    }
  };

  // Fetches all the users of the posts to display the username and profile picture
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

  // Fetches the one user for the post to check if the user is the owner of the post
  const fetchUserForPost = id => {
    const user = users.find(user => user.userId === id);

    return user;
  };

  const handleDelete = async postId => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/delete/${postId}`);
      setPosts(
        posts.filter(post => {
          return post.postId !== postId;
        })
      );

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

  const handleEdit = originalPost => {
    if (
      editMode.edit &&
      editMode.postId === originalPost.postId &&
      editMode.content !== originalPost.content &&
      editMode.content.length > 10
    ) {
      const editedPost = {
        ...originalPost,
        content: editMode.content
      };
      axios
        .put(
          BASE_URL + '/api/posts/update/' + originalPost.postId,
          editedPost
        )
        .then(() => {
          setEditMode({ ...editMode, edit: false });
          // Update the post in the posts array
          setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            const postIndex = updatedPosts.findIndex(
              post => post.postId === originalPost.postId
            );
            if (postIndex !== -1) {
              updatedPosts[postIndex].content = editedPost.content;
            }
            return updatedPosts;
          });
          createAlert('Post updated', 'success');
        })
        .catch(err => console.log(err));
    } else if (editMode.edit && editMode.content.length < 10) {
      createAlert('Post must be at least 10 characters', 'error');
    } else if (editMode.edit) {
      setEditMode({
        edit: false,
        content: originalPost.content,
        postId: originalPost.postId
      });
    } else {
      setEditMode({
        edit: true,
        content: originalPost.content,
        postId: originalPost.postId
      });
    }
  };

  const handleSync = () => {
    return;
  };

  const handleLoadMore = async () => {
    if (filterBy.skillQuery === '' && filterBy.levelQuery === '') {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/posts/all`,
          lastPostDate
        );
        if (response.data.length < 10) {
          setLastPost(true);
        }
        if (response.status === 200) {
          setPosts(prevPosts => [...prevPosts, ...response.data]);
          setLastPostDate(
            response.data[response.data.length - 1].dateCreated
          );
          fetchUsersForPosts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/posts/query`,
          {
            ...filterBy,
            date: lastPostDate
          }
        );
        if (response.data.length < 10) {
          setLastPost(true);
        }
        if (response.status === 200) {
          setPosts(prevPosts => [...prevPosts, ...response.data]);
          setLastPostDate(
            response.data[response.data.length - 1].dateCreated
          );
          fetchUsersForPosts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FilterBy
        updateFilterBy={updateFilterBy}
        filterBy={filterBy}
      />

      {posts.length > 0 &&
        posts.map(post => {
          const postUser = fetchUserForPost(post.userId);
          const submittedDate = new Date(post.dateCreated + 'Z');
          const currentDate = new Date();
          const timeDiff = Math.abs(
            currentDate.getTime() - submittedDate.getTime()
          );
          const minutes = Math.floor(timeDiff / 60000);

          return (
            <div
              key={post.postId}
              className="pt-4 pb-6 border rounded-lg shadow-md border-black my-1 md:my-2 min-w-full
            max-w-screen-md bg-zinc-800 flex flex-row">
              <div className="flex flex-col text-center -center items-center min-w-fit md:w-40">
                <Image
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
                {currUser && post.userId === currUser.userId ? (
                  <>
                    <button
                      onClick={() => {
                        handleDelete(post.postId);
                      }}
                      className="bg-zinc-900 mt-2 py-1
                px-2 hover:bg-red-500 rounded-md w-18 border-black border shadow-sm md:text-base text-xs">
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-zinc-900 mt-2  py-1
                px-4 hover:bg-blue-500 rounded-md border-black border shadow-sm md:text-base text-xs">
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleSync(post.userId);
                    }}
                    className="bg-zinc-900 mt-2 py-1
                px-4 hover:bg-zinc-600 rounded-md w-18 border-black border shadow-sm md:text-base text-xs">
                    Sync
                  </button>
                )}
              </div>
              {/* Displays textarea when edit button is clicked and postIds match */}
              <div className="flex flex-col justify-between w-full max-w-full relative rounded-lg mr-4 bg-zinc-700">
                {editMode.edit && editMode.postId === post.postId ? (
                  <textarea
                    maxLength={250}
                    minLength={10}
                    value={editMode.content}
                    onChange={e =>
                      setEditMode({
                        ...editMode,
                        content: e.target.value
                      })
                    }
                    required
                    autoFocus
                    onFocus={e => e.target.select()}
                    className="flex flex-col md:h-40 h-36 max-w-full relative rounded-lg bg-zinc-700 resize-none px-4 pb-2 pt-4 outline-none text-xs md:text-base"
                  />
                ) : (
                  <p className="text-xs md:text-base px-4 pt-4 pb-2 break-all mb-8">
                    {post.content}
                  </p>
                )}
                <div className="flex flex-col py-4 ">
                  <h3 className="text-xs md:text-base px-4">
                    {' '}
                    {post.skillNeeded}
                  </h3>

                  <h3 className="text-xs md:text-base pt-2 px-4">
                    {' '}
                    {post.levelNeeded}
                  </h3>
                </div>
                <div className="flex absolute -bottom-5 right-0">
                  <h4 className="md:text-xs text-[10px] opacity-60 italic">
                    {' '}
                    {formateTime(minutes)}{' '}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}

      {!lastPost ? (
        <button
          className="hover:text-zinc-500"
          onClick={handleLoadMore}>
          Load More...
        </button>
      ) : (
        <h4 className="text-sm md:text-base text-center py-4">
          Nothing more to show
        </h4>
      )}
    </>
  );
};

export default GetPosts;
