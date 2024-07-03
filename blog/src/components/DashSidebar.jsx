import { Sidebar } from "flowbite-react"
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signoutSuccess } from "../redux/user/userSlice"
import { BsBookmarksFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";

export default function DashSidebar() {
  const location = useLocation()
  const dispatch=useDispatch()
  const {currentUser}= useSelector(state =>state.user)
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFromUrl=urlParams.get('tab')
    // console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
  const handleSignout =async()=>{
    try{
      const res= await fetch('/api/user/signout',{
        method:'POST',
      })
      const data=await res.json()
      if(!res.ok){
        console.log(data.message)
      }
      else{
        dispatch(signoutSuccess())
      }
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
              <Sidebar.Item 
              active = {tab==='dash' || !tab}
              icon={HiChartPie} 
              labelColor='dark' 
              as='div'>
                Dashboard
              </Sidebar.Item>
              </Link>
            )
          }
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item 
          active={tab==="profile"} 
          icon={HiUser} label={currentUser.isAdmin?'Admin' : 'User'} 
          labelColor='dark' 
          as='div'>
            Profile
          </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
          <Link to='/dashboard?tab=posts'>
            <Sidebar.Item 
            active ={tab==='posts'}
            icon={HiDocumentText}
            as='div'
            >
              Posts
            </Sidebar.Item>

          </Link>
          )}
          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item 
              active ={tab==='users'}
              icon={HiOutlineUserGroup}
              as='div'
              >
                Users
              </Sidebar.Item>
              
            </Link>
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item 
              active ={tab==='comments'}
              icon={HiAnnotation}
              as='div'
              >
                Comments
              </Sidebar.Item>
            </Link>
            </>
          )}
          { 
            currentUser && (
              <Link to='/dashboard?tab=bookmark'>
              <Sidebar.Item 
              active = {tab==='bookmark' || !tab}
              icon={BsBookmarksFill} 
              labelColor='dark' 
              as='div'>
                Bookmarks
              </Sidebar.Item>
              </Link>
            )
          }
          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=adminrequest'>
              <Sidebar.Item 
              active ={tab==='adminrequest'}
              icon={AiFillClockCircle}
              as='div'
              >
                Admin Requests
              </Sidebar.Item>
            </Link>
            </>
          )}
          { 
            !currentUser.isAdmin && (
              <Link to='/dashboard?tab=adminstatus'>
              <Sidebar.Item 
              active = {tab==='adminstatus' || !tab}
              icon={AiFillClockCircle} 
              labelColor='dark' 
              as='div'>
                Admin Status
              </Sidebar.Item>
              </Link>
            )
          }
          <Sidebar.Item icon={HiArrowSmRight}  className='cursor-pointer' onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
