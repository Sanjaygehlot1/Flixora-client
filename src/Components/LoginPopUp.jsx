import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import Button from './Common/Button'
function LoginPopUp() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
    <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
        <div className="flex flex-col gap-2 items-center mb-10">
            <Logo size="30" />
        </div>
        <p className="text-xl font-medium mb-2">
            Login or Signup to continue
        </p>
        <Link to="/login">
            <Button
                className="bg-red-500 w-full my-2 py-1 px-4 font-bold text-lg rounded"
                textColor="text-black"
            >
                Login
            </Button>
        </Link>
        <Link to="/register">
            <Button
                className="bg-red-500 w-full  px-4 py-1 font-bold text-lg rounded"
                textColor="text-black"
            >
                Signup
            </Button>
        </Link>
    </div>
</div>
  )
}

export default LoginPopUp
