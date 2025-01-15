import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import VideoSlice from './VideoSlice.js'
import SubscriptionSlice from './SubscriptionSlice.js'
const store = configureStore({
    reducer:{
        Auth : AuthSlice,
        Video : VideoSlice,
        Subscription : SubscriptionSlice
    }
})

export {store}