import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ChangePassword } from '../../Store/AuthSlice';
import Loader from '../../Utilities/Loader';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function UpdatePassword() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [showNewPass, setshowNewPass] = useState(false)
  const [showOldPass, setshowOldPass] = useState(false)

  const ChangePass = async (data) => {
    try {
      if (data) {
        setLoading(true)
        await dispatch(ChangePassword(data)).unwrap()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message)
      throw error
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto border-gray-500 border bg-gray-900 text-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Password</h2>
      <form onSubmit={handleSubmit(ChangePass)}>

        <div className="mb-6 relative">
          <label htmlFor="oldPassword" className="block font-medium mb-2">
            Old Password
          </label>
          <div>
            <Input
              type={showOldPass ? "text" : "password"}
              placeholder="old password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              {...register("oldpassword", {
                required: "Old password is required",
              })}
            />
            <div
              className="absolute right-2 top-[73%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setshowOldPass(!showOldPass)}
            >
              {showOldPass ? <FaEyeSlash className='size-5 text-red-600' /> : <FaEye className='size-5 text-red-600' />}
            </div>
          </div>

          {errors.oldpassword && (<div className="text-red-500 text-sm">{errors.oldpassword.message}</div>)}
        </div>

        <div className="mb-6 relative">
          <label htmlFor="newPassword" className="block font-medium mb-2">
            New Password
          </label>
          <div>
            <Input
              type={showNewPass ? "text" : "password"}
              placeholder="new password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              {...register("newpassword", {
                required: "New password is required",
                minLength: {"Password should be atleast 6 characters": 6}
              })}
            />
            <div
              className="absolute right-2 top-[73%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setshowNewPass(!showNewPass)}
            >
              {showNewPass ? <FaEyeSlash className='text-red-600 size-5' /> : <FaEye className='text-red-600 size-5'/>}
            </div>
            {errors.newpassword && (<div className="text-red-500 text-sm">{errors.newpassword.message}</div>)}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full  py-3 bg-red-500 rounded-md text-lg font-bold hover:bg-red-600 transition duration-200"
        >
          {Loading ? <Loader /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

export default UpdatePassword;
