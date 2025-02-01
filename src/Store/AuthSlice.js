import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const initialState = {
    Status: false, // login status
    UserData: null,
    Loading: false,
    channelData: [],
    error: null

}

const CreateUserAccount = createAsyncThunk("register_user", async (data, { rejectWithValue }) => {
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

        const RegisterResponse = await AxiosInstance.post("/users/register", userdata)

        toast.success("User Registered Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        return RegisterResponse.data;

    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

const UserLogin = createAsyncThunk("user_login", async (data, { rejectWithValue }) => {
    try {
        const LoginResponse = await AxiosInstance.post("/users/login", data)

        return LoginResponse.data.data

    } catch (error) {

        return rejectWithValue(error.response.data)
    }
})

const UserLogOut = createAsyncThunk("user_logout", async (data, { rejectWithValue }) => {
    try {
        const LogOutResponse = await AxiosInstance.post("/users/logout")
        toast.success("User Logged Out Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })
        return LogOutResponse.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

const NewAccessToken = createAsyncThunk("new_token", async (data, { rejectWithValue }) => {
    try {
        const NewTokenResponse = await AxiosInstance.post("/users/new-token", data)


        return NewTokenResponse.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})



const ChangePassword = createAsyncThunk("change_pass", async (data, { rejectWithValue }) => {
    try {
        const ChangePassResponse = await AxiosInstance.patch("/users/change-pass", data)
        toast.success("Password Changed Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })


        return ChangePassResponse.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

const GetCurrentUser = createAsyncThunk("get_user", async (data, { rejectWithValue }) => {
    try {
        const UserResponse = await AxiosInstance.get("/users/get-user")
        return UserResponse.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

const UpdateUserDetails = createAsyncThunk("update_details", async (data, { rejectWithValue }) => {
    try {
        const UpdatedDetailsResponse = await AxiosInstance.post("/users/update-details", data)

        toast.success("User Details Updated Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })


        return UpdatedDetailsResponse.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

const UpdateAvatar = createAsyncThunk("update_avatar", async (data, { rejectWithValue }) => {
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
        return rejectWithValue(error.response.data)

    }
})

const UpdateCoverImage = createAsyncThunk("update_coverImage", async (data, { rejectWithValue }) => {
    const userdata = new FormData()
    userdata.append("coverImage", data.coverImage[0])

    try {
        const Response = await AxiosInstance.patch("/users/update-coverimage", userdata)

        toast.success("CoverImage Updated Successfully", {
            autoClose: 3000,
            position: "bottom-right"
        })

        return Response.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

const AuthSlice = createSlice({
    initialState: initialState,
    name: "Auth",
    extraReducers: (reducer) => {
        reducer.addCase(CreateUserAccount.fulfilled, (state) => {
            state.Loading = false;
            state.error = null;
        })
        reducer.addCase(CreateUserAccount.pending, (state) => {
            state.Loading = true;
        })
        reducer.addCase(CreateUserAccount.rejected, (state, action) => {
            state.Loading = false;
            state.error = action.payload?.message || "An error occured"
        })
        reducer.addCase(UserLogin.pending, (state) => {
            state.Loading = true;
        })
        reducer.addCase(UserLogin.rejected, (state, action) => {
            state.Loading = false;
            state.error = action.payload?.message || "An error occured"
        })
        reducer.addCase(UserLogin.fulfilled, (state, action) => {
            state.Loading = false;
            state.UserData = action.payload;
            state.Status = !state.Status;
            state.error = null;
        })
        reducer.addCase(UserLogOut.pending, (state) => {
            state.Loading = true;
        })
        reducer.addCase(UserLogOut.fulfilled, (state) => {
            state.Loading = false;
            state.Status = false;
            state.UserData = null;
            state.error = null;
        })
        reducer.addCase(UserLogOut.rejected, (state, action) => {
            state.Loading = false;
            state.error = action.payload?.message || "An error occured"
        })
        reducer.addCase(NewAccessToken.fulfilled, (state) => {
            state.Loading = false;
        })
        reducer.addCase(NewAccessToken.pending, (state) => {
            state.Loading = true;
        })
        reducer.addCase(GetCurrentUser.fulfilled, (state, action) => {
            state.Loading = false;
            state.UserData = action.payload;
            state.Status = true;
        })
        reducer.addCase(GetCurrentUser.pending, (state, action) => {
            state.Loading = true;
            state.Status = false;
        })
        reducer.addCase(GetCurrentUser.rejected, (state, action) => {
            state.Loading = false;
            state.UserData = null;
            state.Status = false;
            
        })

        reducer.addCase(UpdateUserDetails.rejected, (state, action) => {
            state.Loading = false;
            state.error = action.payload?.message || "An error occured"
        })
        reducer.addCase(UpdateUserDetails.fulfilled, (state, action) => {
            state.Loading = false;
            state.error = null;
        })
        reducer.addCase(UpdateUserDetails.pending, (state, action) => {
            state.Loading = true;
        })
        reducer.addCase(ChangePassword.rejected, (state, action) => {
            state.error = action.payload?.message || "An error occured"
            state.Loading = false;
        })
        reducer.addCase(ChangePassword.pending, (state, action) => {
            state.Loading = true;
        })
        reducer.addCase(ChangePassword.fulfilled, (state, action) => {
            state.error = null;
            state.Loading = false;
        })
        reducer.addCase(UpdateAvatar.fulfilled, (state, action) => {
            state.Loading = false;
            state.error = null;
        })
        reducer.addCase(UpdateAvatar.pending, (state, action) => {
            state.Loading = true;
        })

        reducer.addCase(UpdateAvatar.rejected, (state, action) => {
            state.Loading = false;
            state.error = action.payload?.message || "An error occured"
        })
        reducer.addCase(UpdateCoverImage.fulfilled, (state, action) => {
            state.Loading = false;
            state.error = null;
        })
        reducer.addCase(UpdateCoverImage.pending, (state, action) => {
            state.Loading = true;
        })

        reducer.addCase(UpdateCoverImage.rejected, (state, action) => {
            state.Loading = false;
            state.error = action.payload?.message || "An error occured"
        })




    }

})


export {
    ChangePassword,
    CreateUserAccount,
    UpdateAvatar,
    UpdateCoverImage,
    UpdateUserDetails,
    UserLogOut,
    UserLogin,
    GetCurrentUser,
    NewAccessToken
}

export default AuthSlice.reducer