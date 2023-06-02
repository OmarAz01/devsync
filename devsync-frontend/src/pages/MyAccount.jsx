import React from 'react'

const MyAccount = () => {

    




    

  return (
    <>
    <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full text-center justify-center max-w-screen-xl">
            <div className='flex justify-center py-8'>
                Profile Pic
            </div>
            <div className='mx-5'>
                <input type='text' className='flex w-72 p-2 bg-neutral-900 text-m leading-tight focus:outline-none focus:shadow-outline rounded' />
                <div className='flex flex-col max-w-screen-sm py-8 text-left'>
                    <h4 className='text-2xl pb-3'>About me</h4>
                   <p className='text-m'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi pariatur officiis quia tenetur 
                    reiciendis asperiores quas magni animi expedita, numquam ad in sit, 
                    error officia fugit veritatis corrupti libero commodi. </p>
                    <h4 className='text-2xl pt-8 pb-3'>Skills</h4>
                    <h4 className='text-2xl pt-8 pb-3'> Level </h4>
                </div>
                <div className='flex flex-col max-w-screen-sm py-8 text-left'>
                    <button className='bg-black w-72 md:max-w-screen-sm text-white font-bold text-m hover:bg-gray-600 p-2 mt-4'> Change Password </button>
                    <button className='bg-black w-72 md:max-w-screen-sm text-white font-bold text-m hover:bg-gray-600 p-2 mt-4'> Change Email </button>
                    <button className='bg-black w-72 md:max-w-screen-sm text-white font-bold text-m hover:bg-gray-600 p-2 mt-4'> Notifications </button>
                </div>
            </div>
            
        </div>
    </div>

    
    </>
  )
}

export default MyAccount