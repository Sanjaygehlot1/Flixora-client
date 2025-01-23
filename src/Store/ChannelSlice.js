import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initialState = {
    channelData : {},
    channelVideos : [],
    channelPlaylists : [],
    channelStats:  {}
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
        const VideoResponse = await AxiosInstance.get(`/dashboard/published-videos/${channelId}`)
        if(VideoResponse){
            return VideoResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const GetAllVideos = createAsyncThunk("channel_videos", async (channelId)=>{
    try {
        const VideoResponse = await AxiosInstance.get(`/dashboard/all-videos/${channelId}`)
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

const GetChannelStats = createAsyncThunk("channel_stats",async (channelId)=>{
    try {
        console.log(channelId)
        const StatsResponse = await AxiosInstance.get(`/dashboard/channel-stats/${channelId}`)

        if(StatsResponse){
            console.log(StatsResponse.data.data[0])
            return StatsResponse.data.data[0]
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const TogglePublishStatus = createAsyncThunk("toggle_publish",async (videoId)=>{
    try {
        const ToggleResponse = await AxiosInstance.patch(`/video/toggle-publish-status/${videoId}`)

        if(ToggleResponse){
            console.log(ToggleResponse.data.data)
            return ToggleResponse.data.data
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
         
         reducer.addCase(GetChannelStats.fulfilled, (state,action) => {
                    state.channelStats = action.payload;
                })
    }
})



export default ChannelSlice.reducer

export {
    GetChannelDetails,
    GetChannelVideos,
    GetChannelPlaylists,
    GetChannelStats,
    TogglePublishStatus,
    GetAllVideos
}