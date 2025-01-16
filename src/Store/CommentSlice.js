import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initialState = {
    AllComments : []
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
        reducer.addCase(AddComment.fulfilled,(state,action)=>{
            state.AllComments.push(action.payload)
        })
    }

})

export default CommentSlice.reducer

export {
    AddComment,
    GetAllComments
}

