import React from 'react'

export default function MailNotification() {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Email Sent!</h2>
        <p className="mb-4">
        We have sent you an email to reset your password. Please check your inbox.
        </p>
        <p className="">
        If you haven't received the email, please try again in a few minutes.
        </p>
    </div>
    </div>

  )
}
