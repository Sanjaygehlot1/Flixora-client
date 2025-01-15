import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initialState = {
    isSubscribed : false
}

const ToggleSubscription = createAsyncThunk("toggle_subs", async (channelId)=>{
    try {
        const Response = await AxiosInstance.patch(`/subscription/toggle-subs/${channelId}`)

        return Response.data.data.subscribed
    } catch (error) {

        console.log(error.message)
        throw error
    }
})

const CheckSubscription = createAsyncThunk("check_sub",async (channelId)=>{
    try {
        const response = await AxiosInstance.get(`/subscription/check-sub/${channelId}`)


        return response.data.data.status
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const SubscriptionSlice = createSlice({
    initialState,
    name: "Subscription",
    reducers:{},
    extraReducers:(reducers)=>{
        reducers.addCase(ToggleSubscription.fulfilled,(state,action)=>{
            state.isSubscribed = action.payload
        })
        reducers.addCase(CheckSubscription.fulfilled,(state,action)=>{
            state.isSubscribed = action.payload
        })
    }


})

export {
    ToggleSubscription,
    CheckSubscription
}

export default SubscriptionSlice.reducer