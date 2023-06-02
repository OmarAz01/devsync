import React, { useEffect, useState} from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { SignIn, SignUp, MyAccount } from './pages/index'
import axios from 'axios'
import '../index.css'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const user = localStorage.getItem('user')
  // useEffect( () => {  

  //   if (user) {
  //     const token = JSON.parse(user).jwt
    
  //     axios.get(('http://localhost:8080//api/auth/validate'), {headers: { 'Authorization': `Bearer ${token}` }}).then((response) => {
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
      <header className="flex flex-row justify-end text-lg">
        <Link to="/">
          <h4 className='p-4 absolute left-0 hover:text-gray-600'> devsync </h4>
        </Link>
        <Link to="/messaging" >
          <h4 className='p-4 relative hover:text-gray-600' > Messaging </h4>
        </Link>
        {loggedIn ? (
        <Link to="/myaccount" >
          <h4 className='p-4 hover:text-gray-600'> My Account </h4>
        </Link>
        ) : 
        <Link to="/signin">
          <h4 className='p-4 hover:text-gray-600'> Sign In </h4>
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
