import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetChannelDetails } from '../../Store/ChannelSlice'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import DashboardSkeleton from './DashboardSkeleton'
import LoginPopUp from '../LoginPopUp'
import { FaCog } from 'react-icons/fa'
import Button from '../Common/Button'
import { ToggleSubscription } from '../../Store/SubscriptionSlice'
import { FaBell } from "react-icons/fa";
import { FaBellSlash } from "react-icons/fa";
function Dashboard() {
    const dispatch = useDispatch()
    const channel = useParams()
    const [SubscribeLoading, setSubscribeLoading] = useState(false)
    const isSubscribed = useSelector((state) => state.Subscription.isSubscribed)

    const LoginStatus = useSelector((state) => state.Auth.Status)
    const UserData = useSelector((state) => state.Auth.UserData)
    const channelData = useSelector((state) => state.Channel.channelData)
    useEffect(() => {
        const ChannelDetails = async () => {
            try {
                await dispatch(GetChannelDetails(channel.channel)).unwrap()

            } catch (error) {
                console.log(error.message)
                throw error

            }
        }
        ChannelDetails()
    }, [channel])

    const Subscribe = async () => {
        try {

            setSubscribeLoading(true)
            await dispatch(ToggleSubscription(channelData._id)).unwrap();
           
          const channel =  await dispatch(GetChannelDetails(channelData.username)).unwrap();

            setSubscribeLoading(false)


        } catch (error) {
            setSubscribeLoading(false)
            console.error("Error toggling subscription:", error);
        }
    };



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
            </div>

            <div className="px-6 mt-4">
                <div className="flex flex-wrap items-start relative">
                    <img
                        src={channelData.avatar}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-gray-700 hover:border-white transition-all"
                    />

                    <div className="ml-4">
                        <h1 className="text-2xl font-bold">{channelData.fullname}</h1>
                        <p className="text-gray-400">@{channelData.username}</p>
                        <p className="text-gray-400">
                            {channelData.subscribersCount} Subscribers | {channelData.subscribedToCount} Subscribed
                        </p>
                    </div>

                    {UserData.data.username !== channelData.username && (
                        <div className="ml-auto">
                            <Button
                                disabled={SubscribeLoading}
                                onClick={Subscribe}
                                className={`${channelData.isSubscribed ? "bg-red-500 text-white flex gap-1 items-center mt-1 px-3 py-1 rounded hover:bg-red-600" : "bg-gray-400 text-white gap-1 items-center flex px-3 mt-1 py-1 rounded hover:bg-gray-500"}`}>
                                {channelData.isSubscribed ?  <FaBellSlash/>:<FaBell/> } {channelData.isSubscribed ? "unsusbcribe" : "Subscribe"}
                            </Button>
                        </div>
                    )}

                    {
                        UserData.data.username === channelData.username && (
                            <NavLink
                                to={`/settings/update-details`}
                                className="absolute max-2xs:hidden bottom-0 right-0 bg-gray-800 text-white px-4 py-2 rounded-full flex items-center shadow-md hover:bg-gray-700"
                            >
                                <FaCog className="mr-2" /> Settings
                            </NavLink>
                        )
                    }
                </div>
            </div>


            <div className="border-t border-gray-700 mt-4">
                <nav className="flex justify-around flex-wrap text-sm">

                    <NavLink to={`/dashboard/${channelData.username}/videos`} className={({ isActive }) => (
                        isActive ? "py-3 px-4 text-red-500 border-b-2 border-red-500" : "py-3 px-4 text-gray-400 hover:text-white"
                    )}>Videos</NavLink>

                    {UserData.data.username === channelData.username && (
                        <NavLink to={`/dashboard/${channelData.username}/playlists`} className={({ isActive }) => (
                            isActive ? "py-3 px-4 text-red-500 border-b-2 border-red-500" : "py-3 px-4 text-gray-400 hover:text-white"
                        )}>Playlist</NavLink>
                    )}

                    <NavLink to={`/dashboard/${channelData.username}/tweets`} className={({ isActive }) => (
                        isActive ? "py-3 px-4 text-red-500 border-b-2 border-red-500" : "py-3 px-4 text-gray-400 hover:text-white"
                    )}>Tweets</NavLink>

                    <NavLink to={`/dashboard/${channelData.username}/subscribed`} className={({ isActive }) => (
                        isActive ? "py-3 px-4 text-red-500 border-b-2 border-red-500" : "py-3 px-4 text-gray-400 hover:text-white"
                    )}>Subscribed</NavLink>


                </nav>
            </div>

            <Outlet context={channelData} />

        </div>



    )
}

export default Dashboard
