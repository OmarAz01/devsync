import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GetPosts from '../components/GetPosts'
import SubmitPost from '../components/SubmitPost'

const Feed = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const BASE_URL = 'http://localhost:8080'
    const [show, setShow] = useState(false)

  return (
    <>
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-full text-center justify-center max-w-screen-xl">   
                    <div className='flex flex-col max-w-screen-lg py-8 text-left'>
                        {show ?
                        <>
                        <div className='absolute md:ml-72 ml-52'>
                            <h4 onClick={() => setShow(!show)} className='hover:text-gray-400 md:text-3xl 
                            h-auto text-2xl py-8 md:px-8 px-4 underline hover:cursor-pointer'>Cancel</h4>
                        </div>
                        <SubmitPost />                        
                        </>
                        : 
                        <h4 onClick={() => setShow(!show)} className='hover:text-gray-400 md:text-3xl text-2xl
                         py-8 md:px-8 px-4 underline hover:cursor-pointer w-56'>Start a post</h4>}  
                         <h4 className='text-3xl md:pl-8 pl-4 py-8'>Posts</h4>                    
                    </div>     
                    <div className='flex flex-col max-w-screen-md pb-8 text-left items-center mx-4 md:mx-8'>                          
                        <GetPosts />
                    </div>  
            </div>   
        </div>
    
    </>
  )
}

export default Feed