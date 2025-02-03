import React, { useEffect, useState } from 'react'
import Logo2 from '../Logo2'
import Input from './Common/Input'
import Button from './Common/Button'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserLogin } from '../Store/AuthSlice'
import LoginPending from './LoginPending'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.Auth.Loading)
    const LoginStatus = useSelector((state) => state.Auth.Status)
    const error = useSelector((state) => state.Auth.error)
    const [showPass, setshowPass] = useState(false)

    const login = async (data) => {
        try {
            if (data) {
                const updated_data = {
                    password: data.password,
                    username: data.loginmethod,
                    email: data.loginmethod
                }
    
                const loginuser = await dispatch(UserLogin(updated_data)).unwrap()
    
                if (loginuser) {
                    navigate("/")
                   
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {

    }, [LoginStatus])


    if (loading) {
        return (<LoginPending text='Logging you In' />)
    }

    return (
        <div className="w-full min-h-screen bg-black text-white p-3 flex justify-center items-center">
        <div className="flex flex-col space-y-6 bg-gray-950 justify-center items-center border border-slate-600 p-6 rounded-2xl w-full max-w-xs">
          <div className="flex items-center gap-2">
            <Logo2 />
          </div>
      
          {error && <div className="text-red-500 text-center">{error}</div>}
      
          <form className="space-y-6 p-2 text-sm w-full" onSubmit={handleSubmit(login)}>
            <div>
              <label className="block mb-1">Username / Email:</label>
              <Input
                type="text"
                placeholder="Enter Username/Email"
                className="w-full h-12 px-4 bg-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                {...register("loginmethod", {
                  required: "Username or Email is Required",
                })}
              />
              {errors.loginmethod && (
                <span className="text-red-500 text-sm">{errors.loginmethod.message}</span>
              )}
            </div>
      
            <div className="relative mb-4">
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full h-12 px-4 bg-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                {...register("password", {
                  required: "Password is Required",
                })}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setshowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password.message}</div>
              )}
            </div>
      
            <Button
              type="submit"
              bgColor="bg-red-600"
              className="w-full py-3 text-white rounded-2xl hover:bg-red-700 transition-colors"
            >
              Login
            </Button>
      
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-red-600 cursor-pointer hover:opacity-70">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
      

    )
}

export default Login
