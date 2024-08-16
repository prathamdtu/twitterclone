import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetslice";
const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const {refresh,isActive} = useSelector(store=>store.Tweets);
   

    
    const followingTweetHandler = async()=>{
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingTweets/${id}`,{
                withCredentials:true
            })
            console.log(res);
            dispatch(getAllTweets(res.data.Tweets));
        } catch (error) {
            console.log(error);
            
        }
    }

    const fetchMyTweets = async() =>{
        try {
            const res = await  axios.get(`${TWEET_API_END_POINT}/allTweets/${id}`,{
                withCredentials:true
            });
            console.log(res);
            dispatch(getAllTweets(res.data.Tweets));
        } catch (error) {
            console.log(error);
        }
    } 
    useEffect(() => {
        if(isActive){
            console.log("follwoing");
            fetchMyTweets();
        }
        else{
            console.log("no follwoing");
            followingTweetHandler();
        }
       
    },[isActive,refresh]) 

}
export default useGetMyTweets;