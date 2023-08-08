import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col justify-center md:justify-start items-center">
      <div className="md:mt-16 mt-8 flex flex-col md:text-start text-center p-4 w-full max-w-screen-xl">
        <h4 className="md:text-8xl text-5xl">devsync.</h4>
        <h4 className="md:text-2xl text-lg pt-4">
          A platform for developers to connect and work on projects
        </h4>
        <div className="flex flex-row pt-4 md:justify-start justify-center pb-8 border-b border-zinc-700">
          <button className="md:text-xl text-base hover:bg-blue-500 py-1 px-2 h-fit w-fit border-2 border-black shadow-sm rounded-md bg-zinc-900 hover:cursor-pointer">
            <a href="/signup">Create your account</a>
          </button>
          <h4 className="md:text-2xl pt-1 text-lg px-4">or</h4>
          <button className="md:text-xl text-base hover:bg-blue-500 py-1 px-2 h-fit w-fit border-2 border-black shadow-sm rounded-md bg-zinc-900 hover:cursor-pointer">
            <a href="/signin">Sign In</a>
          </button>
        </div>
        <div className="flex flex-col w-full py-8 md:items-start items-center text-center md:text-left">
          <h4 className="text-2xl md:text-4xl py-2">How it works</h4>
          <h4 className="md-text-lg text-base py-1 md:py-2">
            1. Create an account
          </h4>
          <h4 className="md-text-lg text-base py-1 md:py-2">
            2. Customize your profile
          </h4>
          <h4 className="md-text-lg text-base py-1 md:py-2">
            3. Browse or create posts
          </h4>
          <h4 className="md-text-lg text-base py-1 md:py-2">
            4. Sync with other developers
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
