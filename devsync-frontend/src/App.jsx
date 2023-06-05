import React, { useEffect, useState} from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { SignIn, SignUp, MyAccount, Feed } from './pages/index'
import axios from 'axios'
import '../index.css'

const App = () => {

  const BASE_URL = 'http://localhost:8080'
  const [loggedIn, setLoggedIn] = useState(false)
  const user = localStorage.getItem('user')
  // useEffect( () => {  

  //   if (user) {
  //     const token = JSON.parse(user).jwt
    
  //     axios.get((`${BASE_URL}/api/auth/validate`), {headers: { 'Authorization': `Bearer ${token}` }}).then((response) => {
  //     if (response.status === 200) {
  //       setLoggedIn(true)
  //       console.log('Logged In')
  //     }
  //     })
  //     .catch((error) => {
  //       localStorage.removeItem('user')
        
  //       if (error.response.status === 404) {
  //         setLoggedIn(false)
  //       }
  //       else if (error.response.status === 403) {
  //         setLoggedIn(false)
  //       }     
  //       else {
  //         console.log(error)
  //       }

  //      })       
      
  //   }
  //   else {
  //     setLoggedIn(false)
  //   }    
  // }, [])


  return (
    <BrowserRouter>
      <header className="flex flex-row justify-end md:text-lg">
        <Link to="/">
          <h4 className='p-4 absolute left-0 hover:text-gray-400'> devsync </h4>
        </Link>
        <Link to="/messaging" >
          <h4 className='p-4 relative hover:text-gray-400' > Messaging </h4>
        </Link>
        {loggedIn ? (
        <Link to="/myaccount" >
          <h4 className='p-4 hover:text-gray-400'> My Account </h4>
        </Link>
        ) : 
        <Link to="/signin">
          <h4 className='p-4 hover:text-gray-400'> Sign In </h4>
        </Link>}
      </header>
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/myaccount" element={<MyAccount />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes> */}
    </main>
    <footer>
      
    </footer>
    </BrowserRouter>

    
  )
}

export default App
