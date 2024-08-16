import React from 'react'
import RightSide from './RightSide'
import LeftSide from './LeftSide'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'   
import { useSelector } from 'react-redux'
import useOtherUser from '../hooks/useOtherUsers'
import useGetMyTweets from '../hooks/useGetMyTweets'
const Home= () => {
  const {user,otherUser}  = useSelector(store=>store.user);
  const Navigate = useNavigate();
  useEffect(() => {
    if(!user){
      Navigate("/login");
    }
  }, [])
  
  useOtherUser(user?._id);
  useGetMyTweets(user?._id);    
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <LeftSide/>
        <Outlet/>
        <RightSide otherUser = {otherUser} />
        

    </div>
  )
}

export default Home