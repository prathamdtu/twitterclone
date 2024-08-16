import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import  { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
import { getAllTweets } from '../redux/tweetslice';



const LeftSide = () => {
    const { user } = useSelector(store => store.user);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = async()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials:true
            })
            dispatch(getOtherUsers(null));
            dispatch(getUser(null));
            dispatch(getMyProfile(null));
            dispatch(getAllTweets(null));         
            Navigate("/login");
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <FaXTwitter size={"30px"} className='ml-3'/>
                </div>
                <div className='my-4'>
                    <div className='flex items-center my-3 px-2 py-3 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                        < MdHomeFilled size={"24px"} />
                        <Link to={"/"}>
                            <h1 className='font-bold text-lg ml-2'>Home</h1>
                        </Link>
                    </div>
                    <div className='flex items-center my-3 px-2 py-3 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                        < IoIosSearch size={"24px"} />
                        <div >
                            <h1 className='font-bold text-lg ml-2'>Explore</h1>
                        </div>
                    </div>
                    <div className='flex items-center my-3 px-2 py-3 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                        < GoBell size={"24px"} />
                        <div >
                            <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                        </div>
                    </div>
                    <div className='flex items-center my-3 px-2 py-3 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                        < PiBookmarkSimpleLight size={"24px"} />
                        <div >
                            <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                        </div>
                    </div>
                    <div className='flex items-center my-3 px-2 py-3 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                        < CgProfile size={"24px"} />
                        <Link to={`/profile/${user?._id}`}>
                            <h1 className='font-bold text-lg ml-2'>Profile</h1>
                        </Link>
                    </div>
                    <div onClick={logOutHandler} className='flex items-center my-3 px-2 py-3 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                        < IoLogOutOutline size={"24px"} />
                        <div >
                            <h1 className='font-bold text-lg ml-2'>Logout</h1>
                        </div>
                    </div>
                    <button className='px-4 py-2 border-none text-md bg-[#1D98F0] w-[80%] rounded-full text-white font-bold'>Post</button>
                </div>

            </div>
        </div>
    )
}

export default LeftSide