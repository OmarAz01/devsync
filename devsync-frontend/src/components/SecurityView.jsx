import React from 'react';

const SecurityView = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row text-left md:items-start items-center justify-center md:justify-between">
      <div className="flex flex-col text-left items-center md:w-1/2 max-w-xs w-4/5">
        <h4 className="pl-1 md:text-xl text-base py-2 text-left w-max">
          {' '}
          Change Your Password
        </h4>
        <form className="flex flex-col text-left w-full items-center">
          <input
            type="password"
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your old password..."
          />
          <input
            type="password"
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your new password..."
          />
          <input
            type="password"
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Re-Type in your old password..."
          />
          <button
            type="button"
            className="bg-zinc-900 mt-4 py-1
                px-4 hover:bg-red-600 rounded-md md:w-72 w-full border-black border shadow-sm md:text-base text-sm">
            Save New Password{' '}
          </button>
        </form>
      </div>
      <div className="flex flex-col text-left items-center md:w-1/2 max-w-xs w-4/5">
        <h4 className="pl-1 md:text-xl text-base py-2 md:mt-0 mt-8 text-left w-max">
          Change Your Email
        </h4>
        <form className="flex flex-col text-left w-full">
          <input
            defaultValue={user.email}
            type="text"
            className="flex md:w-72 w-full p-2 italic bg-neutral-900 text-m leading-tight mt-4 focus:outline-none focus:shadow-outline rounded"
            placeholder="Type in your email..."
          />
          <button
            type="button"
            className="bg-zinc-900 mt-4 py-1
                px-4 hover:bg-red-600 rounded-md md:w-72 w-full border-black border shadow-sm md:text-base text-sm">
            Save New Email{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityView;
