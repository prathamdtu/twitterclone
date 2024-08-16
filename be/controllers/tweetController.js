import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Field is required",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId: id,
            userDetails: User
        });
        return res.status(201).json({
            message: "Tweet created successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async(req,res)=>{
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        const tweetOwner = await User.findById(tweet.userId);
        if(tweet.likes.includes(loggedInUserId)){                                                 
           
            //dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{likes:loggedInUserId}})
            return res.status(200).json({
                message: `You disliked ${tweetOwner.name}'s tweet`            
            })
        }
        else{
            //like
            await Tweet.findByIdAndUpdate(tweetId,{$push:{likes:loggedInUserId}})
            return res.status(200).json({
                message: `You liked ${tweetOwner.name}'s tweet`,
                          
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllTweets = async(req,res)=>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return Tweet.find({userId:otherUserId});
        }));
        return res.status(200).json({
            Tweets:loggedInUserTweets.concat(...followingUserTweets)
        })

    } catch (error) {
        console.log(error);
    }
}

export const getFollowingTweets = async(req,res)=>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return Tweet.find({userId:otherUserId});
        }));
        return res.status(200).json({
            Tweets:[].concat(...followingUserTweets)
        });
    } catch (error) { 
        console.log(error);
    }
}

