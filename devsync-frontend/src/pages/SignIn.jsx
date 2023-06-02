import React, {useState} from 'react'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



  return (
    <div className="w-full flex flex-col justify-center">

        <div className="flex justify-center pt-12">
            <a href="#" className="bg-black text-white font-bold text-xl p-4">Logo</a>
        </div>

        <div className="flex flex-col justify-center my-auto pt-8 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Log In</p>
            <form className="flex flex-col md:items-center pt-8" onSubmit="event.preventDefault();">
                <div className="flex flex-col items-center min-w-full">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input type="email" id="email" placeholder="your@email.com" className="shadow appearance-none border rounded w-full md:max-w-screen-sm py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="flex flex-col pt-4 items-center min-w-full">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input type="password" id="password" placeholder="Password" className="shadow appearance-none border rounded w-full md:max-w-screen-sm py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <button type="submit" className="bg-black w-full md:max-w-screen-sm text-white font-bold text-lg hover:bg-gray-600 p-2 mt-8"> Log In </button>
            </form>
            <div className="text-center pt-12 pb-12">
                <p>Don't have an account? <a href="/signup" className="underline font-semibold">Register here.</a></p>
            </div>
        </div>

    </div>
  )
}

export default SignIn