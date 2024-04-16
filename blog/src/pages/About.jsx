import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className='text-3xl font-semibold text-center my-7'>About Nebula Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>Nebula Blog is a basic blog website where admin would post on any topic and users can read all the blogs on relevant topic</p>  
            <p>Admins can access Dashboard where they can see recent users, posts and comments. They can also see complete list of users, posts and comments. They can regulate rules and regulations by maintaing all the posts and comments. If They found any post/comment to be misleading, they can delete it too.</p>
            <p>Telling about us, We Bhalodia Siddh, Thummar Vatsal and Aditya Galani are the core team. We are currently pursuing our B.Tech from MNNIT Allahabad.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
