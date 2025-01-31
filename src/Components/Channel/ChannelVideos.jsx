import React, { useEffect, useState } from 'react'
import Loader from '../../Utilities/Loader'
import { GetChannelVideos } from '../../Store/ChannelSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { timeAgo } from '../../Utilities/TimeConversion'
import { formatTime } from '../../Utilities/TimeConversion'
import { Link } from 'react-router-dom'
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import Button from '../Common/Button'
import Input from '../Common/Input'
import { UpdateVideoDetails, VideoDelete, WatchVideo } from '../../Store/VideoSlice'
import { useForm } from 'react-hook-form'
import PlaylistPopup from '../Playlists/PlaylistPopup'
function ChannelVideos() {

    const ChannelData = useOutletContext()
    const channelVideos = useSelector((state) => state.Channel.channelVideos)
    const CurrentUser = useSelector((state) => state.Auth.UserData)
    const LoadingStatus = useSelector((state) => state.Video.Loading)
    const [VideoId, setVideoId] = useState(null);
    const [isEditable, setisEditable] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [OpenPlaylistPopup, setOpenPlaylistPopup] = useState(false)
    const { handleSubmit, register, formState: { errors }, setValue } = useForm()
    const dispatch = useDispatch()
   

    const openModal = (video) => {
        setIsOpen(true)
        setVideoId(video._id)
    }
    const closeModal = () => {
        setIsOpen(false)
        setVideoId(null)
    }

    const DeleteVideo = async (data) => {
        try {
            if (data) {
                await dispatch(VideoDelete(VideoId)).unwrap()
                await dispatch(GetChannelVideos(ChannelData._id)).unwrap()
                closeModal()
            }
        } catch (error) {
            throw error
        }
    }
    const EditVideo = async (data) => {
        try {
            if (data) {
                await dispatch(UpdateVideoDetails({ ...data, videoId: VideoId })).unwrap()
                await dispatch(GetChannelVideos(ChannelData._id)).unwrap()
                setisEditable(false)
            }
        } catch (error) {
            throw error
        }
    }
    console.log(LoadingStatus)
    useEffect(() => {
        const response = async () => {
            if (isEditable) {
                const data = await dispatch(WatchVideo({ videoId: VideoId })).unwrap()
                setValue("title", data.title)
                setValue("description", data.description)
                setValue("thumbnail", data.thumbnail)
            }
        }
        response()
    }, [isEditable])

    useEffect(() => {
        const videos = async () => {
            await dispatch(GetChannelVideos(ChannelData._id)).unwrap()
        }
        videos()
    }, [ChannelData])
    return (
        <div className="flex-grow overflow-y-auto p-6">
            <div className="flex gap-4 flex-wrap mb-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Latest</button>
                <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded hover:bg-gray-700">Popular</button>
                <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded hover:bg-gray-700">Oldest</button>
            </div>

            <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {channelVideos.length !== 0 ? (
                    channelVideos.map((video) => (
                        <div
                            key={video._id}
                            className="flex flex-col bg-gray-900 rounded-md border border-gray-700 border-b-2 overflow-hidden relative"
                        >
                            {ChannelData._id === CurrentUser.data._id && (
                                <div className="absolute z-10 bg-gray-700 rounded-full top-2 right-2 flex space-x-2">
                                <Button
                                    onClick={() => {
                                        setVideoId(video._id)
                                        setisEditable(true)
                                    }}
                                    className="bg-gray-700  text-gray-300 p-2 rounded-full hover:bg-blue-600 hover:text-black"
                                >
                                    <FiEdit size={18} />
                                </Button>
                                <Button
                                    onClick={() => openModal(video)}
                                    className="bg-gray-700 text-gray-300 p-2 rounded-full hover:bg-red-600 hover:text-black"
                                >
                                    <FiTrash2 size={18} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setOpenPlaylistPopup(true)
                                        setVideoId(video._id)
                                    }}
                                    className="bg-gray-700 text-gray-300 p-2 rounded-full hover:bg-yellow-500 hover:text-black"
                                >
                                    <FiPlus size={18} />
                                </Button>
                            </div>
                            )}

                            <Link to={`/watch/${video._id}`}>
                                <div className="relative">
                                    <img
                                        src={video.thumbnail?.url}
                                        alt={video.title}
                                        className="w-full aspect-video object-cover"
                                    />
                                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                                       {formatTime(Math.round(video.duration))}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-3 flex flex-col gap-2">
                                <h3 className="text-white font-medium line-clamp-2">
                                    {video.title}
                                </h3>
                                <div className="text-sm text-gray-400 space-y-1">
                                    <p>
                                        {video.views} views • {timeAgo(video.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex w-full justify-center p-6 bg-gray-900'>
                    <h1 className='font-bold text-lg'>
                        No Videos
                    </h1>
                </div>
                )}

            </div>

            {<PlaylistPopup isOpen={OpenPlaylistPopup} onClose={()=>setOpenPlaylistPopup(false)} videoId={VideoId} />}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 rounded-2xl shadow-lg w-96 p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Confirm Delete
                        </h2>
                        <p className="text-white mt-2">
                            Are you sure you want to delete this video? This action cannot be
                            undone.
                        </p>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button
                                onClick={closeModal}
                                className="bg-gray-600 text-white rounded-lg px-2 py-1  hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    DeleteVideo(VideoId)
                                }}
                                className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-2 py-1 "
                            >
                                {!LoadingStatus ? "Delete" : <Loader />}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {isEditable && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Update Video Details</h2>

                        <form onSubmit={handleSubmit(EditVideo)}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                    Title
                                </label>
                                <Input
                                    type="text"
                                    className="w-full mt-1 p-2 bg-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter video title"
                                    {...register("title")}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full mt-1 p-2 bg-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter video description"
                                    {...register("description")}

                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-300">
                                    Thumbnail URL
                                </label>
                                <input
                                    id="thumbnail"
                                    type="file"
                                    accept='image/*'
                                    className="w-full mt-1 p-2 bg-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                                    {...register("thumbnail")}
                                />
                            </div>

                            <div className="flex gap-1 justify-end">
                                <Button
                                    type="button"
                                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-600"
                                    onClick={() => setisEditable(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500"
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

export default ChannelVideos
