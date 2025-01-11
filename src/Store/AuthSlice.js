import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const initialState = {
    Status: false, // login status
    UserData: null,
    Loading: false,

}

const CreateUserAccount = createAsyncThunk("register_user", async (data) => {
    const userdata = new FormData()
    userdata.append("username", data.username)
    userdata.append("email", data.email)
    userdata.append("password", data.password)
    userdata.append("fullname", data.fullName)
    userdata.append("avatar", data.avatar[0])

    if (data.coverImage[0]) {
        userdata.append("coverimage", data.coverImage[0])
    }

    try {
        
        console.log(AxiosInstance.defaults.baseURL)
        const RegisterResponse = await AxiosInstance.post("/users/register", userdata)
        
        toast.success("User Registered Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })
        console.log(RegisterResponse.data)

        return RegisterResponse.data;

    } catch (error) {
        toast.error(error?.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        console.log(error)
        throw error
    }
})

const UserLogin = createAsyncThunk("user_login", async (data) => {
    try {
        const LoginResponse = await AxiosInstance.post("/users/login", data)
        toast.success("User Logged In Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        console.log(LoginResponse)

        return LoginResponse.data

    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const UserLogOut = createAsyncThunk("user_logout", async () => {
    try {
        const LogOutResponse = await AxiosInstance.post("/users/logout")
        toast.success("User Logged Out Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })
        return LogOutResponse.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const NewAccessToken = createAsyncThunk("new_token", async (data) => {
    try {
        const NewTokenResponse = await AxiosInstance.post("/users/new-token", data)

        console.log(NewTokenResponse)

        return NewTokenResponse.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const GetChannelDetails = createAsyncThunk("channel_details", async (data) => {
    try {
        const ChannelDetailRes = await AxiosInstance.get("/users/get-channel-details", {
            params: {
                userId
            }
        })

        console.log(ChannelDetailRes)

        return ChannelDetailRes.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const ChangePassword = createAsyncThunk("change_pass", async (data) => {
    try {
        const ChangePassResponse = await AxiosInstance.patch("/users/change-pass", data)
        toast.success("Password Changed Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        console.log(ChangePassResponse)

        return ChangePassResponse.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const GetCurrentUser = createAsyncThunk("get_user", async () => {
    try {
        const UserResponse = await AxiosInstance.get("/users/get-user")
        console.log(UserResponse)
        return UserResponse.data
    } catch (error) {
        console.log(error)
        throw error.message
    }
})

const UpdateUserDetails = createAsyncThunk("update_details", async (data) => {
    try {
        const UpdatedDetailsResponse = await AxiosInstance.post("/users/update-details", data)

        toast.success("User Details Updated Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        console.log(UpdatedDetailsResponse)

        return UpdatedDetailsResponse.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const UpdateAvatar = createAsyncThunk("update_avatar", async (data) => {
    const userdata = new FormData()

    userdata.append("avatar", data.avatar[0])

    try {
        const Response = await AxiosInstance.patch("/users/update-avatar", userdata)

        toast.success("Avatar Updated Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        return Response.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const UpdateCoverImage = createAsyncThunk("update_coverImage", async (data) => {
    const userdata = new FormData()

    userdata.append("coverImage", data.coverImage[0])

    try {
        const Response = await AxiosInstance.patch("/users/update-avatar", userdata)

        toast.success("CoverImage Updated Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        return Response.data
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            position: "bottom-right",
            theme: "colored"
        })
        throw error
    }
})

const AuthSlice = createSlice({
    initialState: initialState,
    name: "Auth",
    extraReducers: (reducer) => {
        reducer.addCase(CreateUserAccount.fulfilled, (state) => {
            state.Loading = false
        })
        reducer.addCase(CreateUserAccount.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(CreateUserAccount.rejected, (state) => {
            state.Loading = false
        })
        reducer.addCase(UserLogin.fulfilled, (state, action) => {
            state.Loading = false,
                state.UserData = action.payload,
                state.Status = true
        })
        reducer.addCase(UserLogin.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(UserLogin.rejected, (state) => {
            state.Loading = false
        })
        reducer.addCase(UserLogOut.fulfilled, (state) => {
            state.Loading = false,
                state.Status = false,
                state.UserData = null
        })

        reducer.addCase(UserLogOut.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(UserLogOut.rejected, (state) => {
            state.Loading = false
        })
        reducer.addCase(NewAccessToken.fulfilled, (state) => {
            state.Loading = false
        })
        reducer.addCase(NewAccessToken.pending, (state) => {
            state.Loading = true
        })
        reducer.addCase(GetCurrentUser.fulfilled, (state) => {
            state.Loading = false
        })
        reducer.addCase(GetCurrentUser.pending, (state) => {
            state.Loading = true
        })



    }

})

// export { AuthSlice }

export {
    ChangePassword,
    CreateUserAccount,
    UpdateAvatar,
    UpdateCoverImage,
    UpdateUserDetails,
    UserLogOut,
    UserLogin,
    GetChannelDetails,
    GetCurrentUser,
    NewAccessToken
}

export default AuthSlice.reducer