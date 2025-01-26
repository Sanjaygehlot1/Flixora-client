import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    channelPlaylists : [],
    Loading : false
}
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
const CreatePlaylist = createAsyncThunk("create_playlist",async (data)=>{
    try {
        console.log(data)
        const PlaylistResponse = await AxiosInstance.post(`/playlist/create-playlist`,data)

        if(PlaylistResponse){
            toast.success("Playlist Created Successfully", {
                autoClose: 3000,
                position: "bottom-right"
            })
            return PlaylistResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const PlaylistSlice = createSlice({
    initialState,
    name : "Playlist",
    reducers:{},
    extraReducers:(reducer)=>{
        reducer.addCase(GetChannelPlaylists.fulfilled, (state,action)=>{
                state.channelPlaylists = action.payload
                state.Loading = false
        })
        reducer.addCase(GetChannelPlaylists.pending, (state)=>{
                state.Loading = true
        })
    }
})

export default PlaylistSlice.reducer

export {
    GetChannelPlaylists,
    CreatePlaylist
}