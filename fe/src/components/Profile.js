import React from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import useGetProfile from '../hooks/useGetProfile';
import { followingUpdate } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetslice';
import { useEffect } from 'react';
import { useState } from 'react';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(profile?.bio || '');


    // Handle follow/unfollow logic
    const followUnfollowHandler = async () => {
            if (user.following.includes(id)) {
                try {
                    // unfollow
                    const res = await axios.post(`${USER_API_END_POINT}/followOrUnfollow/${id}`, { id: user?._id }, {
                        withCredentials: true
                    });
                    console.log(res);
                    dispatch(followingUpdate(id));
                    dispatch(getRefresh());
                    toast.success(res.data.message);
                } catch (error) {
                    toast.error(error.response.data.message);
                    console.log(error);
                }
            } else {
                try {
                    // follow
                    const res = await axios.post(`${USER_API_END_POINT}/followOrUnfollow/${id}`, { id: user?._id }, {
                        withCredentials: true
                    });
                    console.log(res);
                    dispatch(followingUpdate(id));
                    dispatch(getRefresh());
                    toast.success(res.data.message);
                } catch (error) {
                    toast.error(error.response.data.message);
                    console.log(error);
                }
            }
        };

    // Handle bio change
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    // Handle bio update
    const handleBioUpdate = async () => {
        try {
            const res = await axios.put(`${USER_API_END_POINT}/editProfile/${user._id}`, { bio }, {
                withCredentials: true
            });
            console.log("Bio Update Response:", res.data);
            dispatch(getRefresh()); // Ensure the latest profile data is fetched
            toast.success(res.data.message);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Bio Update Error:", error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        // Set initial bio when profile updates
        setBio(profile?.bio || '');
    }, [profile]);

    
    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to={"/"} className='p-2 ml-2 mb-1 rounded-full hover:bg-gray-200'>
                        <IoArrowBackSharp size={"24px"} />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-sm'>1 Post</p>
                    </div>
                </div>
                <img src='https://pbs.twimg.com/profile_banners/1247844181/1507925673/1080x360' alt='banner' />
                <div className='absolute top-52 ml-3 border-4 rounded-full'>
                    <Avatar src={profile?.avatar || "https://pbs.twimg.com/profile_images/1006857586610753537/hHoBRHEz_400x400.jpg"} size="110" round={true} />
                </div>
                <div className='text-right m-3'>
                    {profile?._id === user?._id ? (
                        <button onClick={() => setIsEditing(true)} className='px-4 py-1 border border-gray-500 bg-gray-200 text-black rounded-full hover:bg-black hover:text-white'>
                            Edit Profile
                        </button>
                    ) : (
                        <button onClick={followUnfollowHandler} className='px-4 py-1 text-white bg-black rounded-full'>
                                    {user.following.includes(id) ? "Following" : "Follow"}
                                </button>
                    )}
                </div>
                <div className='m-4'>
                    <h1 className='font-bold'>{profile?.name}</h1>
                    <p className='text-sm'>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4'>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={bio}
                                onChange={handleBioChange}
                                placeholder="Write your bio"
                                className='w-full p-2 border rounded'
                            />
                            <button onClick={handleBioUpdate} className='px-4 py-1 mr-2 bg-blue-500 text-white rounded-full mt-2'>
                                Save
                            </button>
                            <button  onClick={() => setIsEditing(false)} className='px-4 py-1 bg-gray-500 text-white rounded-full mt-2'>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <p className='text-sm'>
                            {bio || 'This user has not added a bio yet.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
