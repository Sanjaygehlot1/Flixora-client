import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    channelTweets: [],
}


const GetChannelTweets = createAsyncThunk("channel_tweets", async (channelId) => {
    try {
        console.log(channelId)
        const TweetResponse = await AxiosInstance.get(`/tweet/get-tweets/${channelId}`)

        if (TweetResponse) {
            console.log(TweetResponse.data.data)
            return TweetResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const TweetLike = createAsyncThunk("tweet_like", async (tweetId) => {
    try {
        console.log(tweetId)
        const TweetResponse = await AxiosInstance.patch(`/like/like-tweet/${tweetId}`)

        if (TweetResponse) {
            console.log(TweetResponse.data.data)
            return TweetResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const AddTweet = createAsyncThunk("post_tweet",async (data)=>{
    try {
        const TweetData = new FormData()
        console.log(data)
        TweetData.append("content",data.content)
        if(data.image){
            TweetData.append("image",data.image[0])
        }
        const Response = await AxiosInstance.post("/tweet/add-tweet",TweetData)

        if(Response){
            toast.success("Tweet Posted Successfully", {
                autoClose: 3000,
                position: "bottom-right"
            })
            console.log(Response.data.data)
            return Response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const Delete = createAsyncThunk("delete_tweet",async (tweetId)=>{
    try {
        if(tweetId){
            const res = await AxiosInstance.delete(`/tweet/delete-tweet/${tweetId}`)
            if(res.data){
                 toast.success("Tweet Deleted Successfully", {
                            autoClose: 3000,
                            position: "bottom-right"
                        })
                console.log(res.data.data)
                return res.data.data
            }
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const UpdateTweet = createAsyncThunk("update",async (data)=>{
    try {
        if(data){
            console.log(data)
            const res = await AxiosInstance.patch(`/tweet/update-tweet/${data.tweetId}`,{NewContent : data.NewContent})
            if(res.data){
                console.log(res.data.data)
                return res.data.data
            }
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const TweetSlice = createSlice({
    initialState,
    name: "Tweet",
    reducers: {},
    extraReducers: (reducer) => {
        reducer.addCase(GetChannelTweets.fulfilled, (state, action) => {
            state.channelTweets = action.payload;
        })
    }

})

export default TweetSlice.reducer

export {
    TweetLike,
    AddTweet,
    GetChannelTweets,
    Delete,
    UpdateTweet
}