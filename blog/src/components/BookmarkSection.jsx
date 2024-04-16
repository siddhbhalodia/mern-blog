import { Button } from 'flowbite-react';
import React from 'react'
import { useState, useEffect } from 'react';
import { BsBookmarksFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
export default function BookmarkSection({postId,userId}) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const {currentUser} = useSelector(state=>state.user)
    useEffect(() => {
        checkBookmarkStatus();
    }, []);

    const checkBookmarkStatus = async () => {
        try {
            const response = await fetch(`/api/bookmark/getbookmarks/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookmarks');
            }
            const bookmarks = await response.json();
            const isBookmarked = bookmarks.some(bookmark => bookmark.postId === postId);
            setIsBookmarked(isBookmarked);
            console.log(bookmarks,isBookmarked,userId,postId);
        } catch (error) {
            console.error('Error checking bookmark status:', error);
        }
    };
    const handleBookmarkToggle = async () => {
        try {
            let method, url;
            if (isBookmarked) {
                method = 'DELETE';
                url = `/api/bookmark/deletebookmark/${userId}/${postId}`;
            } else {
                method = 'POST';
                url = '/api/bookmark/create';
            }
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, postId })
            });
            if (!response.ok) {
                throw new Error('Failed to toggle bookmark');
            }
            setIsBookmarked(!isBookmarked);
            checkBookmarkStatus()
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

  return (
    // <Button gradientDuoTone='purpleToBlue' outline className="self-center mt-5" onClick={handleBookmarkToggle}>
    //         {isBookmarked ? 'Unbookmark' : 'Bookmark'}
    // </Button>
    <div className='self-center mt-5 flex justify-between gap-2'>
        <button type='button' onClick={handleBookmarkToggle} className={`text-gray-400 hover:text-blue-500 ${currentUser&&isBookmarked&&'!text-blue-500'}`} >
            <BsBookmarksFill className="text-sm h-6 w-6"/>
        </button>
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
    </div>
  )
}