import { Button, Table } from 'flowbite-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineCheck } from "react-icons/ai";

export default function DashAdminRequest() {
  const [adminrequests,setAdminrequests] = useState([])
  const [adminrequestToDelete,setAdminrequestToDelete] = useState('')

  useEffect(()=>{
    const fetchAdminrequests = async()=>{
      try{
        const res = await fetch('/api/adminstatus/getadminstatususer')
        const data = await res.json()
        if(res.ok){
          console.log(data)
          setAdminrequests(data)
        }
      } catch(error){
        console.log(error.message);
      }
    }
    fetchAdminrequests();
  },[adminrequestToDelete])

  const handleClick = async()=>{
    try{
      console.log(adminrequestToDelete)
      const res = await fetch(`/api/adminstatus/deleteadminstatususer/${adminrequestToDelete}`,{
        method : 'DELETE',
      })
      const data = await res.json()
      if(res.ok){
        useEffect()
      }
    } catch(error){
      console.log(error.message);
    }
  } 

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
      {adminrequests.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User name</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>Approve</Table.HeadCell>
            </Table.Head>
            {adminrequests.map((adminrequest) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <img
                    src={adminrequest.userId.profilePicture}
                    alt={adminrequest.userId.username}
                    className='w-10 h-10 object-cover bg-gray-500 rounded-full' 
                  />
                </Table.Cell>
                <Table.Cell>{adminrequest.userId.username}</Table.Cell>
                <Table.Cell>{adminrequest.userId._id}</Table.Cell>
                <Table.Cell>
                  <Button onClick={async ()=>{
                    try{
                      console.log(adminrequestToDelete)
                      const res = await fetch(`/api/adminstatus/deleteadminstatususer/${adminrequest.userId._id}`,{
                        method : 'DELETE',
                      })
                      const data = await res.json()
                      if(res.ok){
                        setAdminrequestToDelete(adminrequest.userId._id)
                      }
                    } catch(error){
                      console.log(error.message);
                    }
                  }}>
                    Approve<AiOutlineCheck/>
                  </Button>  
                </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <h1>There are No Requests Yet</h1>
      )}
    </div>
  )
}
