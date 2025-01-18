import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetChannelDetails } from '../Store/ChannelSlice'
import { useParams } from 'react-router-dom'
import { GetChannelVideos } from '../Store/ChannelSlice'
import DashboardSkeleton from './DashboardSkeleton'
import LoginPopUp from '../Components/LoginPopUp'
import { timeAgo } from '../Utilities/TimeConversion'


function Dashboard() {
    const dispatch = useDispatch()
    const channel = useParams()
    console.log(channel)
    const LoginStatus = useSelector((state) => state.Auth.Status)
    const channelData = useSelector((state) => state.Channel.channelData)
    const channelVideos = useSelector((state) => state.Channel.channelVideos)
    useEffect(() => {
        const ChannelDetails = async () => {
            try {
                await dispatch(GetChannelDetails(channel.channel)).unwrap()
                console.log(channelData._id)

            } catch (error) {
                console.log(error.message)
                throw error

            }
        }
        ChannelDetails()
    }, [])

    useEffect(() => {
        const videos = async () => {
            await dispatch(GetChannelVideos(channelData._id)).unwrap()
        }
        videos()
    }, [channelData])

    console.log(channelData)
    console.log(channelVideos)

    if (!LoginStatus) {
        return <LoginPopUp />
    }

    if (Object.keys(channelData).length === 0) {
        return <DashboardSkeleton />
    }


    return (
        <div className="w-full h-full bg-gray-900 text-white flex flex-col">
            <div className="relative bg-cover bg-center h-48">
                <img
                    src={channelData.coverimage}
                    alt="Cover Image"
                    className="w-full h-full border-4 border-gray-900"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            <div className="px-6 mt-4">
                <div className="flex items-center">
                    <img
                        src={channelData.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-gray-900"
                    />
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold">{channelData.fullname}</h1>
                        <p className="text-gray-400">@{channelData.username}</p>
                        <p className="text-gray-400">
                        {channelData.subscribersCount} Subscribers | {channelData.subscribedToCount} Subscribed
                        </p>
                    </div>
                    <div className="ml-auto">
                        <button className="bg-red-500 flex-grow text-white px-4 py-2 rounded hover:bg-red-600">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-4">
                <nav className="flex justify-around text-sm">
                    <a href="#" className="py-3 px-4 text-red-500 border-b-2 border-red-500">Videos</a>
                    <a href="#" className="py-3 px-4 text-gray-400 hover:text-white">Playlists</a>
                    <a href="#" className="py-3 px-4 text-gray-400 hover:text-white">Tweets</a>
                    <a href="#" className="py-3 px-4 text-gray-400 hover:text-white">Subscribed</a>
                </nav>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
                <div className="flex gap-4 mb-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Latest</button>
                    <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded hover:bg-gray-700">Popular</button>
                    <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded hover:bg-gray-700">Oldest</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {channelVideos.length !== 0 ? channelVideos.map((video) => (
                        <div key={video._id} className="flex flex-col bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative">
                                <img
                                    src={video.thumbnail?.url}
                                    alt={video.title}
                                    className="w-full aspect-video object-cover"
                                />
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                                    {Math.round(video.duration) + 's'}
                                </span>
                            </div>

                            <div className="p-3 flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-white font-medium line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <button className="text-gray-400 hover:text-white">
                                    </button>
                                </div>

                                <div className="text-sm text-gray-400 space-y-1">
                                    <p>{video.views} views • {timeAgo(video.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="h-full flex items-center justify-center">
                            <h1 className="text-xl text-gray-500">No Videos</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>



    )
}

export default Dashboard
