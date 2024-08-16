import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUser:null,
        profile:null
    },

    reducers:{
        //multiple actions
        getUser:(state,action)=>{
            state.user = action.payload
        },
        getOtherUsers:(state,action)=>{
            state.otherUser = action.payload
        },
        getMyProfile:(state,action)=>{
            state.profile = action.payload
        },
        followingUpdate:(state,action)=>{
            if(state.user.following.includes(action.payload)){
                //unfollow
                state.user.following = state.user.following.filter((followId)=>{
                    return followId !== action.payload
                })
            }
            else{
                //follow
                state.user.following.push(action.payload)            //action.payload is fetching id from the profile.js
            }
        }
    }
})

export const{getUser,getOtherUsers,getMyProfile,followingUpdate} = userSlice.actions;
export default userSlice.reducer;