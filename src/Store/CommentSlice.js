import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initialState = {
    AllComments : [],
    Loading : false
}

const AddComment = createAsyncThunk("add_comment", async (data) => {
    try {
        if (data) {
            const Response = await AxiosInstance.post(`/comment/add-comment/${data.videoId}`,data.data)
            return Response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const GetAllComments = createAsyncThunk("get_all_comments", async (videoId) => {
    try {
        if (videoId) {
            const Response = await AxiosInstance.get(`/comment/get-comments/${videoId}`)
            console.log(videoId)
            console.log(Response.data.data.docs)
            return Response.data.data.docs
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const CommentDelete = createAsyncThunk("delete_comment", async (commentId) => {
    try {
        if (commentId) {
            const Response = await AxiosInstance.delete(`/comment/delete-comment/${commentId}`)
            return Response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})
const EditComment = createAsyncThunk("edit_comment", async (data) => {
    try {
        if (data) {
            const Response = await AxiosInstance.post(`/comment/update-comment/${data.commentId}`,{NewContent : data.NewContent})
            return Response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const CommentSlice = createSlice({
    initialState,
    name: "Comment",
    reducers: {},
    extraReducers: (reducer) => {
        reducer.addCase(GetAllComments.fulfilled,(state,action)=>{
            state.AllComments = action.payload
        })
        reducer.addCase(CommentDelete.pending,(state)=>{
            state.Loading = true
        })
        reducer.addCase(CommentDelete.fulfilled,(state)=>{
            state.Loading = false
        })
        reducer.addCase(EditComment.pending,(state)=>{
            state.Loading = true
        })
        reducer.addCase(EditComment.fulfilled,(state)=>{
            state.Loading = false
        })
       
    }

})

export default CommentSlice.reducer

export {
    AddComment,
    GetAllComments,
    CommentDelete,
    EditComment
}

