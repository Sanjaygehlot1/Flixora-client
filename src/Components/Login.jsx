import React,{useEffect} from 'react'
import Logo from './Logo'
import Input from './Common/Input'
import Button from './Common/Button'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserLogin } from '../Store/AuthSlice'
import LoginPending from './LoginPending'


function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state)=>state.Auth.Loading)
    const LoginStatus = useSelector((state)=>state.Auth.Status)

    const login = async (data)=>{
        if(data){
            const updated_data = {
                password: data.password,
                username: data.loginmethod,
                email : data.loginmethod
            }
            
            const loginuser = await dispatch(UserLogin(updated_data)).unwrap()

            if(loginuser){
                navigate("/")
                console.log(loginuser)
                console.log(LoginStatus)
                console.log("logged in ")
            }
        }
    }
    useEffect(() => {
     
    }, [LoginStatus])
    

if(loading){
    return (<LoginPending text='...Logging you in Please Wait'/>)
}

    return (
        <div className="w-full h-screen bg-black text-white p-3 flex justify-center items-start">
            <div className="flex max-w-6xl bg-gray-950 flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
                <div className="flex items-center gap-2 mt-5">
                    <Logo />
                    <div className="logo-container"></div>
                </div>

                <form className="space-y-5 p-2" onSubmit={handleSubmit(login)}>
                    <div>
                        <label className="block mb-1">Username / email :</label>
                        <Input
                            type="text"
                            placeholder="Enter Username/Email"
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700"
                            {...register("loginmethod", {
                                required: "Username or Email is Required",
                            })}
                        />
                        {errors.loginmethod && (
                        <span className="text-red-500 text-sm">{errors.loginmethod.message}</span>

                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Password:</label>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700"
                            {...register("password", {
                                required: "Password is Required",
                            })}

                        />
                        {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>

                        )}
                    </div>

                    <Button
                        type="submit"
                        className=" w-full   rounded hover:bg-red-700 text-lg text-white"
                        bgColor="bg-red-500"
                    >
                        Login
                    </Button>

                    <p className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                       <Link
                       to={"/register"} className='text-red-600'>
                        Signup
                       
                       </Link>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Login
