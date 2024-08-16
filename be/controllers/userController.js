import { User } from "../models/userSchema.js";
import bcryptjs  from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { Tweet } from "../models/tweetSchema.js";


export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req,res)=>{
    try {
        const{username,password} = req.body;
        if(!username || !password){
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }

        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({
                message:"Incorrect username or password"
            })
        }
        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect username or password"
            })
        }

        const tokenData = {
            userID : User._id
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})
        return res.status(201).cookie("token",token,{expiresIn:"1d",httpOnly:true}).json({
            message:`Welcome Back ${user.name}`,user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const Logout = (req,res)=>{
    return res.cookie("token","",{expiresIn: new Date(Date.now())}).json({
        message:"Logged out successfully.",
        success:true
    })
}

export const bookmarks = async(req,res)=>{
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);
        if(user.bookmarks.includes(loggedInUserId)){
            //dislike
            await User.findByIdAndUpdate(loggedInUserId,{$pull:{bookmarks:loggedInUserId}})
            return res.status(200).json({
                //remove
                message: "Removed from bookmarks"               
            })
        }
        else{
            //like
            await User.findByIdAndUpdate(loggedInUserId,{$push:{bookmarks:loggedInUserId}})
            return res.status(200).json({
                message: "Saved to bookmarks"               
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getMyProfile = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
        if(!otherUsers){
            return res.status(401).json({
                message:"No other users found"
            })
        }
        else{
            return res.status(200).json({
                otherUsers
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const followOrUnfollow = async(req,res)=>{
    try {
       const loggedInUserId = req.body.id;
       const otherUserId = req.params.id;
       const loggedInUser = await User.findById(loggedInUserId);
       const otherUser = await User.findById(otherUserId);
       if(!loggedInUser.following.includes(otherUserId)){
        await loggedInUser.updateOne({$push:{following:otherUserId}});
        await otherUser.updateOne({$push:{followers:loggedInUserId}});
        return res.status(200).json({
            message:`${loggedInUser.name} started following ${otherUser.name}`,
            success:true
        })
       }
       else{
        await loggedInUser.updateOne({$pull:{following:otherUserId}});
        await otherUser.updateOne({$pull:{followers:loggedInUserId}});
        return res.status(200).json({
            message:`${loggedInUser.name} unfollowed ${otherUser.name}`,
            success:true
        })
       }
    } catch (error) {
        console.log(error);
    }
}


export const editProfile = async (req, res) => {
    try {
        const { bio } = req.body;
        const { id } = req.params; // Getting user ID from params

        if (!bio) {
            return res.status(401).json({
                message: "Bio is required",
                success: false
            });
        }

        // Find and update the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        user.bio = bio; // Update bio
        await user.save(); // Save changes

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
