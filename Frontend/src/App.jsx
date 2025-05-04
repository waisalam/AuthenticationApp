import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import ChangePassword from './pages/ChangePassword';

const App = () => {
  return (
   <Router>
  <Routes>
  <Route path='/' element={<Start/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/sign-up' element={<SignUp/>}/>
  <Route path='/verify-email' element={<VerifyEmail/>}/>
  <Route path='/change-password' element={<ChangePassword/>}/>
  </Routes>
   </Router>
  )
}

export default App