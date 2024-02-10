import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-in" element={<Signin />}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Route>
      <Route path="/sign-up" element={<Signup />}/>
      <Route path="/projects" element={<Projects />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}