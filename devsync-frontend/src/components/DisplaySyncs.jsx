import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplaySyncs = ({ userId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const currUser = JSON.parse(localStorage.getItem('user'));
  const [syncs, setSyncs] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/sync/received/user/${userId}`, {
        headers: { Authorization: `Bearer ${currUser.jwt}` }
      })
      .then(response => {
        setSyncs(response.data);
      })
      .catch(error => {
        if (error.response.status === 404) {
          setSyncs([]);
        } else {
          toast.error('Something went wrong trying to get syncs');
          console.log(error);
        }
      });
  }, []);

  const handleUsernameClick = username => {
    window.location.href = `/profile/${username}`;
  };

  return (
    <div className="flex flex-col pt-4">
      {syncs.length === 0 ? (
        <h1>Hey</h1>
      ) : (
        syncs.map(sync => {
          return (
            <div
              key={sync.syncId}
              className="flex flex-col w-full border-2 border-zinc-900 bg-zinc-700 p-2 rounded-md">
              <div className="flex flex-row border-b-2 w-fit px-2 border-zinc-800">
                <h4
                  className="text-base hover:cursor-pointer hover:underline"
                  onClick={e => {
                    handleUsernameClick(sync.senderUsername);
                  }}>
                  {sync.senderUsername}
                </h4>
                <h4 className="text-base italic pl-1">
                  {' - ' + sync.senderLevel}
                </h4>
              </div>
              <div className="flex p-2">
                <p className="text-sm">{sync.content}</p>
              </div>
              <div className="flex flex-row justify-end">
                <h4 className="text-xs text-zinc-300 italic pr-2">
                  {sync.dateCreated.substring(0, 10)}
                </h4>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DisplaySyncs;
