import React from 'react'
import Input from '../Common/Input'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '../Common/Button'
import { GetCurrentUser, UpdateAvatar, UpdateCoverImage } from '../../Store/AuthSlice'
import { useState } from 'react'
import Loader from '../../Utilities/Loader'

function UpdateProfile() {
    const { register,handleSubmit ,reset} = useForm()
    const [Progress, setProgress] = useState(false)
    const dispatch = useDispatch()
    const Update = async (data)=>{
        try {
            if(data){
                setProgress(true)
                if(data.avatar[0]){
                    await dispatch(UpdateAvatar(data)).unwrap()
                    await dispatch(GetCurrentUser()).unwrap()
                }
                if(data.coverImage[0]){
                    await dispatch(UpdateCoverImage(data)).unwrap()
                }
                reset()
                setProgress(false)
            }
        } catch (error) {
            setProgress(false)
            reset()
            console.log(error)
            throw error
        }
    }

  return (
    <div className="w-full max-w-sm mx-auto border-gray-500 border bg-gray-900 text-white shadow-lg rounded-lg p-8">
    <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
    <form onSubmit={handleSubmit(Update)}>
      <div className="mb-6">
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Upload Avatar
        </label>
        <Input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 focus:outline-none"
          {...register("avatar")}
        />
      </div>
  
      <div className="mb-6">
        <label
          htmlFor="coverImage"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Upload Cover Image
        </label>
        <Input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 focus:outline-none"
          {...register("coverImage")}
        />
      </div>
  
      <div className="text-center">
        <Button
          type="submit"
          className="w-full py-3 bg-red-500 rounded-md text-lg font-bold hover:bg-red-600 transition duration-200"
        >
          {Progress ? <Loader /> : "Update"}
        </Button>
      </div>
    </form>
  </div>
  

  )
}

export default UpdateProfile
