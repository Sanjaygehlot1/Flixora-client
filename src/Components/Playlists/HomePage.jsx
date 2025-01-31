import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSkeleton from './LoadingSkeleton'
import { useNavigate, useParams } from 'react-router-dom'
import { DeletePlaylist, GetPlaylistById, RemoveVideoFromPlaylist, UpdatePlaylist } from '../../Store/PlaylistSlice'
import { timeAgo } from '../../Utilities/TimeConversion'
import Button from '../Common/Button'
import Input from '../Common/Input'
import Loader from '../../Utilities/Loader'
import { useForm } from 'react-hook-form'
import { MdDeleteSweep } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IoIosRemoveCircleOutline } from "react-icons/io";



function HomePage() {

  const PlaylistDetails = useSelector((state) => state.Playlist.PlaylistDetails)
  const LoadingStatus = useSelector((state) => state.Playlist.Loading)
  const [OpenEditPopup, setOpenEditPopup] = useState(false)
  const [OpenDeletePopup, setOpenDeletePopup] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const playlistId = useParams()
  const dispatch = useDispatch()
  const GetPlaylist = async () => {
    try {
      if (playlistId) {
        await dispatch(GetPlaylistById(playlistId)).unwrap()
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  useEffect(() => {
    GetPlaylist()
  }, [playlistId.playlistId])

  const Delete = async () => {
    try {
      if (playlistId) {
        await dispatch(DeletePlaylist(playlistId.playlistId)).unwrap()
        navigate('/')
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
  const EditDetails = async (data) => {
    try {
      if (playlistId) {
        await dispatch(UpdatePlaylist({ playlistId: playlistId.playlistId, data: data })).unwrap()
      }
      GetPlaylist()
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  const RemoveVideo = async (video_Id) => {
    try {
      if (video_Id) {
        await dispatch(RemoveVideoFromPlaylist({ playlistId: playlistId.playlistId, videoId: video_Id })).unwrap()
        GetPlaylist()
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  if (Object.keys(PlaylistDetails).length === 0) {
    return <LoadingSkeleton />
  }


  return (
    <div>
      {PlaylistDetails ? (
        <div className="flex flex-col lg:flex-row p-4 mx-auto bg-gray-900 text-white min-h-screen">
          <div className="w-full lg:w-1/4 \  border border-gray-700 border-b-8 rounded-xl overflow-hidden bg-gray-900 p-4  shadow-md">
            <div className="flex flex-col gap-2 justify-between items-center mb-5">
              <h2 className="text-xl border-2 px-4 py-1 border-gray-700 rounded-full font-bold">{PlaylistDetails.name}</h2>
              <div className="flex gap-2">
                <Button className="bg-blue-600 text-white px-3 py-1 text-md font-bold rounded hover:bg-blue-700"
                  onClick={() => setOpenEditPopup(true)}>
                  <TbEdit className="text-xl" />Edit
                </Button>
                <Button className="bg-red-600 text-white px-3 py-1 text-md font-bold rounded hover:bg-red-700"
                  onClick={() => setOpenDeletePopup(true)}>
                  <MdDeleteSweep className="text-xl" />Delete
                </Button>
              </div>
            </div>
            <h2 className="text-white mt-2">Description</h2>
            <p className="text-gray-400 mt-2">{PlaylistDetails.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Total Videos: {PlaylistDetails.TotalVideos}</p>
              <p>Total Views: {PlaylistDetails.TotalViews}</p>
            </div>
          </div>

          <div className="w-full lg:w-3/4 mt-4 lg:mt-0 lg:ml-4">
            <div className="grid grid-cols-1 gap-4">
              {PlaylistDetails.videos[0].ownerDetails.length !== 0 ? PlaylistDetails.videos.map((video) => (
                <div
                  key={video._id}
                  className="flex flex-col sm:flex-row  bg-gray-900  border border-gray-700 border-b-4 overflow-hidden shadow-md rounded-xl p-4"

                >
                  <div className="w-full sm:w-1/3">
                    <div className="bg-gray-700 w-full h-32 rounded-lg">
                      <img
                        src={video.thumbnail.url}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-lg"
                        onClick={() => navigate(`/watch/${video._id}`)}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-2/3 sm:ml-4 mt-2 sm:mt-0 flex justify-between items-start">
                    <div
                      onClick={() => navigate(`/watch/${video._id}`)}>
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                      <p className="text-gray-400 text-sm">{video.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {video.views} views • {timeAgo(video.createdAt)}
                      </p>
                    </div>
                    <Button
                      onClick={() => RemoveVideo(video._id)}
                      className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                    >
                      <IoIosRemoveCircleOutline className="text-2xl" />
                    </Button>
                  </div>
                </div>
              )) :
                (<div className="flex items-center justify-center h-64">
                  <h2 className="md:text-2xl text-md ">No Videos Found</h2>
                </div>)}
            </div>
          </div>
        </div>
      ) : "No Playlist Found"
      }

      {OpenDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 rounded-2xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-white">
              Confirm Delete
            </h2>
            <p className="text-white mt-2">
              Are you sure you want to perform this action? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={() => setOpenDeletePopup(false)}
                className="bg-gray-500 px-2 py-1 rounded-md text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => Delete()}
                className="bg-red-600 px-2 py-1 rounded-md text-white hover:bg-red-700"
              >
                {LoadingStatus ? <Loader /> : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {OpenEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Update Playlist Details</h2>

            <form onSubmit={handleSubmit(EditDetails)}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <Input
                  type="text"
                  className="w-full mt-1 p-2 bg-gray-800 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter video title"
                  {...register("updatedName", {
                    maxLength: { value: 30, message: "Title should not exceed 50 characters" },
                    minLength: { value: 5, message: "Title should be atleast 5 characters" },

                  })}
                />
                {errors.updatedName && <p className="text-red-500 text-sm mt-1">{errors.updatedName.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full mt-1 p-2 bg-gray-800 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter video description"
                  {...register("updatedDescription", {
                    maxLength: { value: 400, message: "Description should not exceed 500 characters" },
                    minLength: { value: 10, message: "Description should be atleast 10 characters" }
                  })}

                ></textarea>
                {errors.updatedDescription && <p className="text-red-500 text-sm mt-1">{errors.updatedDescription.message}</p>}
              </div>

              <div className="flex gap-1 justify-end">
                <Button
                  type="button"
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-500"
                  onClick={() => setOpenEditPopup(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 "
                >
                  {LoadingStatus ? <Loader /> : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>)
      }

    </div>
  )


}

export default HomePage

