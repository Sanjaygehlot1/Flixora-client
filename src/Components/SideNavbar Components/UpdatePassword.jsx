import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ChangePassword } from '../../Store/AuthSlice';
import Loader from '../../Utilities/Loader';
import Button from '../Common/Button';
import Input from '../Common/Input';
function UpdatePassword() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const ChangePass = async (data) => {
    try {
      if (data) {
        console.log(data)
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
    <div className="w-full max-w-sm mx-auto border-gray-500 border bg-gray-800 text-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Password</h2>
      <form onSubmit={handleSubmit(ChangePass)}>
        <div className="mb-6">
          <label htmlFor="oldPassword" className="block font-medium mb-2">
            Old Password
          </label>
          <Input
            type="password"
            placeholder="Enter old password"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("oldpassword", {
              required: "Old password is required"
            })}
          />
          {errors.thumbnail && (
            <div className="text-red-500">{errors.thumbnail.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block font-medium mb-2">
            New Password
          </label>
          <Input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("newpassword", {
              required: "New password is required"
            })}
          />
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
