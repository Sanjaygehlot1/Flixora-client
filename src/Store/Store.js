import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import VideoSlice from './VideoSlice.js'
const store = configureStore({
    reducer:{
        Auth : AuthSlice,
        Video : VideoSlice
    }
})

export {store}