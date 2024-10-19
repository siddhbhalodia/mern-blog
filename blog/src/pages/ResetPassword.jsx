import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
export default function ResetPassword() {
    const { token } = useParams(); // Get the token from the URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation: Check if passwords match
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match.');
          return;
        }
    
        try {
          // Make a POST request to the backend to reset the password
          setLoading(true);
          const response = await fetch(`/api/auth/resetpassword/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword: password }),
          });
    
          const result = await response.json();
          if(result.success==false){
            setLoading(false)
            setMessage(data.message)
          }
          if (response.ok) {
            setLoading(false)
            setSuccessMessage('Password reset successfully! Redirecting to login...');
            setTimeout(()=>navigate('/sign-in'),3000)
          }
        } catch (error) {
            setLoading(false)
            setErrorMessage('An error occurred. Please try again.');
        }
      };
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Nebula</span>
            Blog
        </Link>
        <div className='text-sm mt-5'>
          <p>Please Ensure to enter password carefully!</p> 
        </div>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    
            <div className="">
              <Label value='Password'/>
              <TextInput
              type='password'
              placeholder='**************'
              id='password'
              onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="">
              <Label value='Confirm Password'/>
              <TextInput
              type='password'
              placeholder='**************'
              id='confirmPassword'
              onChange={(e)=>setConfirmPassword(e.target.value)}
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
                  'Confirm'
              )}
            </Button>
          </form>
        
          {
            errorMessage &&(
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
          {
            successMessage&&(
                <Alert className='mt-5' color='success'>
                    {successMessage}
                </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
