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
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
import ForgotPassword from './pages/ForgotPassword'
import MailNotification from './pages/MailNotification'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-in" element={<Signin />}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path="/create-post" element={<CreatePost />}/>
      <Route path="/update-post/:postId" element={<UpdatePost />}/>
      </Route>
      <Route path="/sign-up" element={<Signup />}/>
      <Route path="/projects" element={<Projects />}/>
      <Route path="/post/:postSlug" element={<PostPage />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path='/mail-notification' element={<MailNotification/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}