import { Button } from 'flowbite-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function DashAdminStatus() {
  const {currentUser,updateCurrentUser} = useSelector((state)=>state.user)
  const [adminstatus,setAdminstatus] = useState({})
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await fetch('/api/adminstatus/getadminstatus')
        const data = await res.json()
        console.log(data)
        if(data.find(adminstatus => adminstatus.userId === currentUser._id)){
          setAdminstatus(true)
        }
        else setAdminstatus(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminStatus()
  },[])

  const handleClick = async () => {
    if(adminstatus===true){
      try {
        const res = await fetch('/api/adminstatus/deleteadminstatus', {
          method : 'DELETE',
        })
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
        }
        else{
          console.log(data)
          setAdminstatus(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    else{
      try {
        const res = await fetch('/api/adminstatus/create', {
          method : 'POST',
        })
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
        }
        else{
          console.log(data)
          setAdminstatus(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Admin Status</h1>
      <Button className='w-full' onClick={handleClick}>
        {adminstatus===true ? 
        'Your request is under process. Click here if you want to cancel your request.' : 
        'Click here if you want to become admin.'}
      </Button>
    </div>
  )
}
