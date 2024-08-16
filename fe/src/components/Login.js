import React, { useState } from 'react'
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant"
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice';


const Login = () => {
    const [isLogin, setUpLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLogin) {
            //login
            try {
                const res = await axios.post(`${USER_API_END_POINT}/login`, { username, password },{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                });
                dispatch(getUser(res?.data?.user));
                if(res.data.success){
                    Navigate("/");
                    toast.success(res.data.message);
                }  
                console.log(res);
               
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }
        else {
            //register
            try {
                const res = await axios.post(`${USER_API_END_POINT}/register`, { name, email, username, password },{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                });
                if(res.data.success){
                    setUpLogin(true);
                    toast.success(res.data.message);
                }
                console.log(res);
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }
    }
    const loginHandler = () => {
        setUpLogin(!isLogin)
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex items-center justify-evenly w-[80%]'>
                <div>
                    <  FaXTwitter size={"430px"} className='ml-5' />
                </div>
                <div>
                    <div className='my-7'>
                        <h1 className='font-bold text-6xl '>Happening Now</h1>
                    </div>
                    <h1 className='font-semibold text-2xl'>{isLogin ? "Login" : "Signup"}</h1>
                    <form onSubmit={submitHandler} className='flex flex-col w-[60%] my-3'>
                        {
                            !isLogin && (<>   {/* if the user wants to register then name and email are the additional input fields that will appear on the screen*/}
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className=' font-semibold outline-blue-500 border border-gray-300 px-3 py-1 rounded-full my-1'></input>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className=' font-semibold outline-blue-500 border border-gray-300 px-3 py-1 rounded-full my-1'></input>
                            </>
                            )
                        }
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Userame' className=' font-semibold outline-blue-500 border border-gray-300 px-3 py-1 rounded-full my-1'></input>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className=' font-semibold outline-blue-500 border border-gray-300 px-3 py-1 rounded-full my-1'></input>
                        <button className='px-4 py-3 bg-[#1D98F0] rounded-full text-white mt-2 font-semibold'>{isLogin ? "Login" : "Create Account"}</button>
                        <h1 className='m-2 font-semibold' >{isLogin ? "Don't have an account? " : "Already have an account? "}<span onClick={loginHandler} className='font-bold text-[#1D98F0] cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login