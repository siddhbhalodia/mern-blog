import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
    const [email,setEmail] = useState("")
    const [message, setMessage] = useState("");
    const [loading,setLoading] = useState(false)
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here you would typically send the email to your server to handle password reset
        if (email) {
          setMessage("If an account exists with this email, a reset link will be sent.");
          try{
            setLoading(true)
            const res =await fetch('/api/auth/forgotpassword',{
              method:'POST',
              headers:{'Content-Type' : 'application/json'},
              body: JSON.stringify({
                email
              }),
            });
            const data = await res.json()
            if(data.success===false){
              setLoading(false)
              setMessage(data.message)
            }
            if(res.ok){
              setLoading(false)
              navigate('/mail-notification');
            }
          }catch(error){
            setLoading(false)
            console.log(error)
          }
          
        } else {
          setMessage("Please enter a valid email address.");
        }
      };

      const handleChange = (e) => {
        setMessage("");
        setEmail(e.target.value.trim());
    }
  return (
    <>
    <div className="min-h-screen flex p-3 max-w-xs mx-auto flex-col md:flex-row md:items-center gap-5">
    <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    
            <div className="">
              <Label value='Email'/>
              <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              required
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading?(
                  <>
                  
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) :(
                  'Sign In'
              )}
            </Button>
          </form>
          {
            message && (
              <p className="text-sm text-red-500 mt-3">{message}</p>
            )
          }
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
        </div>
    </>
  )
}
