import React from 'react';
import GetPosts from './GetPosts';

const PostsView = ({ user, createAlert }) => {
  return (
  <div className='flex flex-col text-left items-center'>
    <h4 className='pl-1 md:text-2xl font-bold text-lg py-2 text-center'> My Posts</h4> 
    <div className='w-full max-w-2xl'>
      <GetPosts createAlert={createAlert} userId={user.userId} />
    </div>
    
  </div>
  )
 
};

export default PostsView;
