import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    channelPlaylists: [],
    Loading: false,
    PlaylistDetails: {}
}
const GetChannelPlaylists = createAsyncThunk("channel_playlists", async (channelId) => {
    try {
        const PlaylistResponse = await AxiosInstance.get(`/playlist/get-playlists/${channelId}`)

        if (PlaylistResponse) {
            return PlaylistResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const CreatePlaylist = createAsyncThunk("create_playlist", async (data) => {
    try {
        const PlaylistResponse = await AxiosInstance.post(`/playlist/create-playlist`, data)

        if (PlaylistResponse) {
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

const UpdatePlaylist = createAsyncThunk("update_playlist", async (data) => {
    try {
        const PlaylistResponse = await AxiosInstance.patch(`/playlist/update-playlist/${data.playlistId}`, { Newname: data.data.updatedName, Newdescription: data.data.updatedDescription })

        if (PlaylistResponse) {
            toast.success("Playlist Updated Successfully", {
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
const DeletePlaylist = createAsyncThunk("delete_playlist", async (playlistId) => {
    try {
        const DeleteResponse = await AxiosInstance.delete(`/playlist/delete-playlist/${playlistId}`)

        if (DeleteResponse) {
            toast.success("Playlist Deleted Successfully", {
                autoClose: 3000,
                position: "bottom-right"
            })
            return DeleteResponse.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const GetPlaylistById = createAsyncThunk("get_playlist", async ({playlistId}) => {
    try {
        if (playlistId) {
            const Response = await AxiosInstance.get(`/playlist/get-playlist-by-id/${playlistId}`)
            return Response.data.data[0]
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const AddVideoToPlaylist = createAsyncThunk("add_video", async (data) => {
    try {
        if (data) {

            const Response = await AxiosInstance.post(`/playlist/add/v/playlist/${data.playlistId}/${data.videoId}`)

            if (Response) {
                toast.success("Video Added Successfully", {
                    autoClose: 3000,
                    position: "bottom-right"
                })
                return Response.data.data
            }
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const RemoveVideoFromPlaylist = createAsyncThunk("remove_video", async (data) => {
    try {
        if (data) {
            const Response = await AxiosInstance.delete(`/playlist/delete/v/playlist/${data.playlistId}/${data.videoId}`)

            if (Response) {
                toast.success("Video Removed Successfully", {
                    autoClose: 3000,
                    position: "bottom-right"
                })
                return Response.data.data
            }
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const PlaylistSlice = createSlice({
    initialState,
    name: "Playlist",
    reducers: {},
    extraReducers: (reducer) => {
        reducer.addCase(GetChannelPlaylists.fulfilled, (state, action) => {
            state.channelPlaylists = action.payload
            state.Loading = false
        })
        reducer.addCase(GetChannelPlaylists.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(UpdatePlaylist.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(UpdatePlaylist.fulfilled, (state) => {
            state.Loading = false
        })
        reducer.addCase(DeletePlaylist.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(DeletePlaylist.fulfilled, (state) => {
            state.Loading = false
        })
        reducer.addCase(GetPlaylistById.fulfilled, (state, action) => {
            state.PlaylistDetails = action.payload
        })
    }
})

export default PlaylistSlice.reducer

export {
    GetChannelPlaylists,
    CreatePlaylist,
    UpdatePlaylist,
    DeletePlaylist,
    GetPlaylistById,
    AddVideoToPlaylist,
    RemoveVideoFromPlaylist
}