import React from 'react'
import "./App.css"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


function App() {
  return (
     <div className='app'>
     <BrowserRouter>
     <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/' exact element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
