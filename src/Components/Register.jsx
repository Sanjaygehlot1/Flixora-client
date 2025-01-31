import React, { useRef } from 'react'
import Logo from './Logo'
import { useForm } from 'react-hook-form'
import Input from './Common/Input'
import Button from './Common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { CreateUserAccount, UserLogin } from '../Store/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import LoginPending from './LoginPending'
import GetImagePreview from './Common/GetImagePreview'

function Register() {
    const { control, formState: { errors }, register, handleSubmit } = useForm()
    const error = useSelector((state) => state.Auth.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.Auth.Loading)

    const signup = async (data) => {
        if (!data.avatar[0]) {

        }

        if (data) {
            const register = await dispatch(CreateUserAccount(data)).unwrap()

            if (register) {
                const username = data?.username
                const password = data?.password


                const login = await dispatch(UserLogin({ username, password })).unwrap()
                if (login) {

                    navigate("/")
                }
            }

        }

    }

    if (loading) {
        return (<LoginPending text='Registering...'/>)
    }
    return (
        <>
            <div className="w-full h-full bg-black  text-white p-3 flex justify-center items-center">
                <div className="flex flex-col space-y-2 bg-gray-950 justify-center items-center border border-slate-600 p-3">
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>
                    {error && <div className="text-red-500">{error.message}</div>}
                    <form
                        onSubmit={handleSubmit(signup)}
                        className="space-y-4 p-2 text-sm sm:w-96 w-full"
                    >
                        <div className="w-full relative h-28 bg-[#222222]">
                            <div className="w-full h-full">
                                <GetImagePreview
                                    name="coverImage"
                                    control={control}
                                    className="w-full h-28 object-cover border-none border-slate-900"
                                />
                                <div className="text-sm absolute right-2 bottom-2 hover:text-red-500 cursor-default">
                                    Cover Image
                                </div>
                            </div>
                            <div className="absolute left-2 bottom-2 rounded-full border-2">
                                <GetImagePreview
                                    name="avatar"
                                    control={control}
                                    className="object-cover rounded-full h-20 w-20 outline-none"

                                />
                            </div>
                        </div>
                        {errors.avatar && (
                            <div className="text-red-500">{errors.avatar.message}</div>
                        )}
                        <Input
                            label="Username: "
                            type="text"
                            placeholder="Enter username"
                            {...register("username", {
                                required: "Username is required",
                            })}
                            className="h-8"
                        />
                        {errors.username && (
                            <span className="text-red-500">{errors.username.message}</span>
                        )}
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="h-8"
                        />
                        {errors.email && (
                            <span className="text-red-500">{errors.email.message}</span>
                        )}
                        <Input
                            label="Fullname: "
                            type="text"
                            placeholder="Enter fullname"
                            {...register("fullName", {
                                required: "FullName is required",
                            })}
                            className="h-8"
                        />
                        {errors.fullName && (
                            <span className="text-red-500">{errors.fullName.message}</span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="h-8"
                        />
                        {errors.password && (
                            <span className="text-red-500">{errors.password.message}</span>
                        )}
                        <Button
                            type="submit"
                            bgColor="bg-red-600"
                            className="w-full rounded-2xl hover:bg-red-700 text-lg"
                        >
                            Signup
                        </Button>
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-red-600 cursor-pointer hover:opacity-70"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </>
    )

}

export default Register
