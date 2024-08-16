import React from 'react'
import Avatar from 'react-avatar'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { TWEET_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetslice';
import { timeSince } from '../utils/constant';

const Tweet = ({ Tweets }) => {
    
    const { user } = useSelector(store => store.user);

    const dispatch = useDispatch();
    const likeOrDislikeHandler = async (id) => {      //async me jo id hai vo tweet id hai ?? -- find the reason                      //id--> tweet id, userid---> user?._id
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        }
    }

    const deleteTweetHandler = async (id) => {                          
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
                withCredentials: true
            });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        }
    }
    return (
        <div className='border border-gray-200'>
            <div>
                <div className='flex  p-4 ' >
                    <Avatar src="https://pbs.twimg.com/profile_images/1006857586610753537/hHoBRHEz_400x400.jpg" size="50" round={true} />
                    <div className='ml-2 w-full '>
                        <div className='flex items-center '>
                            <h1 className='font-bold '>{Tweets?.userDetails[0]?.name}</h1>
                            <p className='text-sm text-gray-400 ml-1'>
                            {Tweets?.userDetails?.[0]?.username ? `@${Tweets.userDetails[0].username}` : "@unknown"} 
                            {` .${timeSince(Tweets?.createdAt)}`}
                        </p>

                        </div>
                        <div>
                            <p>{Tweets?.description}</p>
                        </div>
                        <div className='flex justify-between my-2 '>
                            <div className='flex items-center '>
                                <div className='p-1 hover:bg-gray-300 rounded-full  cursor-pointer'>
                                    <FaRegComment size={"17px"} />
                                </div>
                                <p >0</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeOrDislikeHandler(Tweets?._id)} className='p-1 hover:bg-pink-400 rounded-full  cursor-pointer '>
                                    <FaRegHeart size={"20px"} />
                                </div>
                                <p >{Tweets?.likes?.length}</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-1 hover:bg-yellow-200 rounded-full  cursor-pointer'>
                                    <FaRegBookmark size={"20px"} />
                                </div>
                                <p >0</p>
                            </div>
                            {
                                user?._id === Tweets?.userId && (
                                    <div onClick ={()=>{deleteTweetHandler(Tweets?._id)}} className='flex items-center'>
                                        <div className='p-1 hover:bg-red-500 rounded-full  cursor-pointer'>
                                            <MdDeleteOutline size={"20px"} />
                                        </div>
                                        <p >0</p>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default Tweet