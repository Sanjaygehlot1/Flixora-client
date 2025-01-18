import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initialState = {
    channelData : {},
    channelVideos : []
}

const GetChannelDetails = createAsyncThunk("channel_details", async (username) => {
    try {
        console.log(username)
        const ChannelDetailRes = await AxiosInstance.get(`/users/get-channel-details/${username}`)

        console.log(ChannelDetailRes.data.data[0])

        return ChannelDetailRes.data.data[0]
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const GetChannelVideos = createAsyncThunk("channel_videos", async (channelId)=>{
    try {
        console.log(channelId)
        const VideoResponse = await AxiosInstance.get(`/dashboard/channel-videos/${channelId}`)
        if(VideoResponse){
            console.log(VideoResponse.data.data)
            return VideoResponse.data.data
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
    }
})

export default ChannelSlice.reducer

export {
    GetChannelDetails,
    GetChannelVideos
}