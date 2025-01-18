import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import VideoSlice from './VideoSlice.js'
import SubscriptionSlice from './SubscriptionSlice.js'
import CommentSlice from './CommentSlice.js'
import ChannelSlice from './ChannelSlice.js'
const store = configureStore({
    reducer:{
        Auth : AuthSlice,
        Video : VideoSlice,
        Subscription : SubscriptionSlice,
        Comment : CommentSlice,
        Channel : ChannelSlice
    }
})

export {store}