import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";

const store = configureStore({
    reducer:{
        Auth : AuthSlice
    }
})

export {store}