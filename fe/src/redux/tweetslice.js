import {createSlice} from "@reduxjs/toolkit"

const tweetSlice = createSlice({
    name:"tweet",
    initialState:{
        Tweets:null,
        refresh:false,
        isActive:true
    },

    reducers:{
        //multiple actions
        getAllTweets:(state,action)=>{
            state.Tweets= action.payload;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh
        },
        getIsActive:(state,action)=>{
            state.isActive = action.payload;
        }
    }
})

export const{getAllTweets,getRefresh,getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;