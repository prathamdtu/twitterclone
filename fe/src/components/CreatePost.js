import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { CiImageOn } from "react-icons/ci";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetslice';


const CreatePost = () => {
    const[description,setDescription] = useState("");
    const {user} = useSelector(store=>store.user);
    const {isActive} =useSelector(store=>store.Tweets);
    const dispatch = useDispatch();

    const submitHandler = async ()=>{
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description,id:user?._id},{
                headers:{
                    "Content-Type":"application/json    "
                },
                withCredentials:true
            });
            dispatch(getRefresh());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setDescription(""); 
    }
    
    const forYouHandler = ()=>{
        dispatch(getIsActive(true));
    }
    const followingHandler = ()=>{
        dispatch(getIsActive(false));
    }
    
  return (
    <div className='w-[100%]'>
        <div >
            <div className='flex items-center justify-evenly border-b border-gray-200 '>
                <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-400" : "border-transparent"} cursor-pointer hover:bg-gray-200 text-center w-full px-4 py-4`}>
                    <h1 className='font-bold text-gray-700 tetx-lg '>For You</h1>
                </div>
                <div onClick={followingHandler}  className={`${!isActive ? "border-b-4 border-blue-400" : "border-transparent"} cursor-pointer hover:bg-gray-200 text-center w-full px-4 py-4`}
>
                    <h1 className='font-bold text-gray-700 tetx-lg '>Following</h1>
                </div>
            </div>
            <div>
                <div className='flex items-center'>
                    <div className='m-3.5'>
                    <Avatar src="https://pbs.twimg.com/profile_images/1006857586610753537/hHoBRHEz_400x400.jpg" size="50" round={true} />
                    </div>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)}  className='text-lg border-none outline-none w-full ' type='text' placeholder='What is happening?!'/>
                </div>
                <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                    <div>
                        <CiImageOn size={"24px"}/> 
                    </div>
                    <button onClick={submitHandler} className='text-white text-xl border-none rounded-full bg-[#1D98F0] px-4 py-1 text-right mr-2'>Post</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CreatePost