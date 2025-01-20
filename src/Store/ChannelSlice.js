import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initialState = {
    channelData : {},
    channelVideos : [],
    channelPlaylists : [],
    channelTweets : []
}

const GetChannelDetails = createAsyncThunk("channel_details", async (username) => {
    try {
        const ChannelDetailRes = await AxiosInstance.get(`/users/get-channel-details/${username}`)


        return ChannelDetailRes.data.data[0]
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const GetChannelVideos = createAsyncThunk("channel_videos", async (channelId)=>{
    try {
        const VideoResponse = await AxiosInstance.get(`/dashboard/channel-videos/${channelId}`)
        if(VideoResponse){
            return VideoResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const GetChannelPlaylists = createAsyncThunk("channel_playlists",async (channelId)=>{
    try {
        const PlaylistResponse = await AxiosInstance.get(`/playlist/get-playlists/${channelId}`)

        if(PlaylistResponse){
            return PlaylistResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const GetChannelTweets = createAsyncThunk("channel_tweets",async (channelId)=>{
    try {
        console.log(channelId)
        const TweetResponse = await AxiosInstance.get(`/tweet/get-tweets/${channelId}`)

        if(TweetResponse){
            console.log(TweetResponse.data.data)
            return TweetResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const TweetLike = createAsyncThunk("tweet_like",async (tweetId)=>{
    try {
        console.log(tweetId)
        const TweetResponse = await AxiosInstance.patch(`/like/like-tweet/${tweetId}`)

        if(TweetResponse){
            console.log(TweetResponse.data.data)
            return TweetResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})



const ChannelSlice = createSlice({
    initialState,
    name: "Channel",
    reducers: {},
    extraReducers: (reducer)=>{
         reducer.addCase(GetChannelDetails.fulfilled, (state,action) => {
                    state.channelData = action.payload;
                })
         reducer.addCase(GetChannelVideos.fulfilled, (state,action) => {
                    state.channelVideos = action.payload;
                })
         reducer.addCase(GetChannelPlaylists.fulfilled, (state,action) => {
                    state.channelPlaylists = action.payload;
                })
         reducer.addCase(GetChannelTweets.fulfilled, (state,action) => {
                    state.channelTweets = action.payload;
                })
    }
})

export default ChannelSlice.reducer

export {
    GetChannelDetails,
    GetChannelVideos,
    GetChannelPlaylists,
    GetChannelTweets,
    TweetLike
}