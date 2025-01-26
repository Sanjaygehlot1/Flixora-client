import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";
import { toast } from "react-toastify";

const initiaState = {
    Loading : true,
    LikeStatus : false,
    AllLikedVideos : [],
    WatchHistory : []
}

const GetAllVideos = createAsyncThunk("get_all_videos",async (query)=>{
    try {
        const VideoResponse = await AxiosInstance.get("/video/search/v",
            {
                params:{
                    query : query
                }
            }
        )
        return VideoResponse.data
    } catch (error) {
        console.log(error.message)
        throw error.message
    }
})

const WatchVideo = createAsyncThunk("watch_video", async (videoId)=>{
    try {
        if(videoId){
            const response = await AxiosInstance.get(`/video/get-video/${videoId.videoId}`)
            return response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error.message
    }
})

const GetUserVideos = createAsyncThunk("get_user_all_videos",async(userId)=>{
    try {
        if(userId){

            const Response = await AxiosInstance.get(`/dashboard/published-videos/${userId}`)
    
            return Response.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const LikeVideo = createAsyncThunk("like_video",async(videoId)=>{
    try {
        if(videoId){
            const LikeResponse = await AxiosInstance.patch(`/like/like-video/${videoId.videoId}`)
                console.log(LikeResponse.data.data.liked)
            return LikeResponse.data.data.liked
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const GetLikedVideos = createAsyncThunk("get_all_likedVideos",async ()=>{
    try {
        const Response = await AxiosInstance.get("/like/get-liked-videos")
        if(Response){
            console.log(Response)
            return Response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const UserHistory = createAsyncThunk("user_history",async ()=>{
    try {
        const HistoryResponse = await AxiosInstance.get("/users/watch-history")

        if(HistoryResponse){
            console.log(HistoryResponse.data.data[0].watchHistory)
            return HistoryResponse.data.data[0].watchHistory
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const VideoDelete = createAsyncThunk("delete_video",async (videoId)=>{
    try {
        const DeleteResponse = await AxiosInstance.get(`/video/delete-video/${videoId}`)

        if(DeleteResponse){
            toast.success("Video Deleted Successfully", {
                autoClose: 3000,
                position: "bottom-right",
            
            })
            console.log(DeleteResponse.data.data)
            return DeleteResponse.data.data
        }
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        console.log(error.message)
        throw error
    }
})
const VideoUpload = createAsyncThunk("upload_video",async (data)=>{
    try {
        const VideoData = new  FormData()
        VideoData.append("title", data.title)
        VideoData.append("description", data.description)
        VideoData.append("video", data.video[0])
        VideoData.append("thumbnail", data.thumbnail[0])

        const UploadResponse = await AxiosInstance.post("/video/upload-video",VideoData)

        if(UploadResponse){
             toast.success("Video Uploaded Successfully", {
                        autoClose: 3000,
                        position: "bottom-right",
                    
                    })
            console.log(UploadResponse.data)
            return UploadResponse.data.data
        }
    } catch (error) {
        toast.error(error.message, {
                   autoClose: 3000,
                   position: "bottom-right",
                   theme: "colored"
               })
               throw error
    }
})
const UpdateVideoDetails = createAsyncThunk("update_video",async (data)=>{
    try {
        console.log(data)
        const VideoData = new  FormData()
        if(data.title){
            VideoData.append("title", data.title)
        }
        if(data.description){
            VideoData.append("description", data.description)
        }
        if(data.thumbnail[0]){
            VideoData.append("thumbnail", data.thumbnail[0])
        }
        console.log(VideoData)
        const UpdateResponse = await AxiosInstance.patch(`/video/update-video/${data.videoId}`,VideoData)

        if(UpdateResponse){
             toast.success("Video Details Updated Successfully", {
                        autoClose: 3000,
                        position: "bottom-right",
                    
                    })
            console.log(UpdateResponse.data)
            return UpdateResponse.data.data
        }
    } catch (error) {
        toast.error(error.message, {
                   autoClose: 3000,
                   position: "bottom-right",
                   theme: "colored"
               })
               throw error
    }
})

const VideoSlice = createSlice({
    initialState: initiaState,
    name: "Video",
    reducers: {},
    extraReducers:(reducer)=>{
       reducer.addCase(GetAllVideos.pending,(state)=>{
        state.Loading = true;
       })
       reducer.addCase(GetAllVideos.fulfilled,(state,action)=>{
        state.Loading = false;
        state.Videos = action.payload;
       })
       reducer.addCase(WatchVideo.pending,(state)=>{
        state.Loading = true;
       })
       reducer.addCase(WatchVideo.fulfilled,(state,action)=>{
        state.Loading = true;
       })
       reducer.addCase(GetUserVideos.pending,(state)=>{
        state.Loading = true;
       })
       reducer.addCase(GetUserVideos.fulfilled,(state)=>{
        state.Loading = false;
       })
       reducer.addCase(LikeVideo.fulfilled,(state,action)=>{
        state.LikeStatus = action.payload;
       })
       reducer.addCase(GetLikedVideos.fulfilled,(state,action)=>{
        state.AllLikedVideos = action.payload;
       })
       reducer.addCase(UserHistory.fulfilled,(state,action)=>{
        state.WatchHistory = action.payload;
       })
      
    }
})
export {
    GetAllVideos,
    WatchVideo,
    GetUserVideos,
    LikeVideo,
    GetLikedVideos,
    UserHistory,
    VideoUpload,
    VideoDelete,
    UpdateVideoDetails
}

export default VideoSlice.reducer