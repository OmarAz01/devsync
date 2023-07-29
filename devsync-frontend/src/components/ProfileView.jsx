import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileView = ({ user }) => {
  const currUser = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = 'http://localhost:8080';
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(user.bio || '');

  useEffect(() => {
    // if (!currUser) {
    //   window.location.href = '/login';
    // }
    // if (user === undefined || user === null) {
    //   window.location.href = '/login';
    // }
    // if (user.userId !== currUser.userId) {
    //   window.location.href = '/login';
    // }
  }, []);

  const handleEditBio = () => {
    if (editBio === false) {
      setEditBio(true);
      return;
    }
    if (editBio === true) {
      if (bio === user.bio) {
        setEditBio(false);
        return;
      }
      axios
        .put(BASE_URL + `/api/user/${currUser.userId}/bio`, bio, {
          headers: { Authorization: `Bearer ${currUser.jwt}` }
        })
        .then(res => {
          user.bio = bio;
          setEditBio(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col p-1">
        <div className="flex flex-row border-b justify-between pb-2 ">
          <h4 className="md:text-xl text-lg text-left">About Me</h4>
          <button
            className="bg-zinc-700 rounded-md px-4 hover:cursor-pointer py-1 hover:bg-blue-500"
            onClick={handleEditBio}>
            Edit
          </button>
        </div>
        {user.bio === null && editBio === false ? (
          <p className="text-neutral-100 mt-4 text-left md:h-56 h-44">
            Add a bio{' '}
          </p>
        ) : editBio === false ? (
          <p className="text-neutral-100 mt-4 text-left md:h-56 h-44">
            {user.bio}
          </p>
        ) : editBio === true ? (
          <textarea
            maxLength={750}
            minLength={2}
            value={bio}
            autoFocus
            onChange={e => setBio(e.target.value)}
            className="flex flex-col md:h-56 h-44 max-w-full relative rounded-lg bg-inherit resize-none pb-2 pt-4 outline-none text-xs md:text-base"></textarea>
        ) : null}
        <div className="flex flex-row border-b justify-between pb-2 mt-4">
          <h4 className="md:text-xl text-lg text-left ">Skills</h4>
          <button className="bg-zinc-700 rounded-md px-4 hover:cursor-pointer py-1 hover:bg-blue-500">
            Add
          </button>
        </div>

        <div className="flex flex-row w-full flex-wrap justify-start items-center mt-4">
          {user.skill !== undefined && user.skill !== null
            ? user.skill.split(', ').map(skill => (
                <h4
                  key={skill}
                  className="flex items-center flex-row md:text-base text-sm w-fit mr-2 mt-1 h-fit rounded-md bg-zinc-700 px-2 py-1
                    hover:bg-red-500 hover:cursor-pointer">
                  {skill}
                </h4>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default ProfileView;
