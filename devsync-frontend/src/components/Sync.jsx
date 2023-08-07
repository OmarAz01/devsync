import React, { useState } from 'react';

const Sync = ({
  senderId,
  receiverId,
  receiverUsername,
  handleSyncShow
}) => {
  const [sync, setSync] = useState({
    senderId: senderId,
    receiverId: receiverId,
    receiverUsername: receiverUsername,
    content: '',
    dateCreated: ''
  });

  return (
    <div className="border-2 rounded-md border-zinc-900 bg-zinc-800">
      <h4 className="md:text-xl text-base px-5 pt-4 pb-4">
        Sync with {receiverUsername}{' '}
      </h4>
      <form className="w-full px-4">
        <textarea
          maxLength={250}
          minLength={10}
          value={sync.content}
          onChange={e =>
            setSync({ ...sync, content: e.target.value })
          }
          placeholder="Introduce yourself and leave your contact info!"
          required
          autoFocus
          className="flex flex-col md:h-40 h-36 w-full relative rounded-lg bg-zinc-700 resize-none p-2 outline-none text-sm md:text-base"
        />
        <div className="flex flex-row justify-between mb-2">
          <button
            className="hover:bg-red-600 md:text-xl text-sm h-fit px-4 py-1 border-2 border-black shadow-lg rounded-md mt-4 bg-zinc-900 hover:cursor-pointer w-fit"
            onClick={handleSyncShow}>
            {' '}
            Close{' '}
          </button>
          <button className="hover:bg-zinc-600 md:text-xl text-sm h-fit px-4 py-1 border-2 border-black shadow-lg rounded-md mt-4 bg-zinc-900 hover:cursor-pointer w-fit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sync;
