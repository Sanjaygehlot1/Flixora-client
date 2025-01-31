
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LikeVideo, WatchVideo } from '../../Store/VideoSlice'
import VideoLoading from '../../Utilities/VideoLoading'
import { CheckSubscription, ToggleSubscription } from '../../Store/SubscriptionSlice'
import { CgPlayListAdd } from 'react-icons/cg'
import Button from '../Common/Button'
import PlaylistPopup from '../Playlists/PlaylistPopup'
import { FaBell } from "react-icons/fa";
import { FaBellSlash } from "react-icons/fa";
function Video() {

    const navigate = useNavigate()
    const isSubscribed = useSelector((state) => state.Subscription.isSubscribed)
    const UserData = useSelector((state) => state.Auth.UserData)
    const videoData = useSelector((state) => state.Video.videoData)
    const [OpenPlaylistPopup, setOpenPlaylistPopup] = useState(false)
    const videoId = useParams()
    const [SubscribeLoading, setSubscribeLoading] = useState(false)
    const dispatch = useDispatch()


    const Subscribe = async () => {
        try {

            setSubscribeLoading(true)
            await dispatch(ToggleSubscription(videoData.owner_details._id)).unwrap();
            setSubscribeLoading(false)


        } catch (error) {
            setSubscribeLoading(false)
            console.error("Error toggling subscription:", error);
        }
    };

    const CheckSubs = async () => {
        try {
            await dispatch(CheckSubscription(videoData.owner_details._id)).unwrap()

        } catch (error) {
            throw error
        }
    }
    const handleVideoLike = async () => {
        try {

            await dispatch(LikeVideo(videoId)).unwrap()
            await dispatch(WatchVideo(videoId)).unwrap();


        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
    useEffect(() => {
        CheckSubs()
    }, [videoData])


    useEffect(() => {
        const video = async () => {
            try {
                await dispatch(WatchVideo(videoId)).unwrap();

            } catch (error) {
                console.log(error.message);
                throw error;
            }
        };


        video();
    }, [videoId, isSubscribed]);

    if (Object.keys(videoData).length === 0) {
        return (<VideoLoading />)
    }

    return (
        <div>
            <div className="aspect-w-16 aspect-h-9 mb-6">
                <video
                    src={videoData.videoFile.url}
                    controls
                    className="w-full h-full rounded-lg"
                />
            </div>

            <p className="text-lg font-bold text-white mb-1">{videoData.title}</p>
            <p className="text-sm  text-gray-500 mb-3">{videoData.views} views</p>

            <div className="flex flex-col justify-between mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div className="flex items-center gap-4">
                        <img
                            onClick={() =>
                                navigate(`/dashboard/${videoData.owner_details.username}/videos`)
                            }
                            src={videoData.owner_details.avatar}
                            alt="Channel Profile"
                            className="w-12 h-12 cursor-pointer rounded-full object-cover"
                        />
                        <div>
                            <p className="text-white text-lg font-bold">
                                {videoData.owner_details.username}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {videoData.owner_details.subscribersCount} Subscribers
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <Button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${videoData.LikedbyMe ? "text-red-600" : ""
                                }`}
                            onClick={handleVideoLike}
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                className="cursor-pointer"
                                height="25"
                                width="25"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path>
                            </svg>
                            {videoData.LikesCount}
                        </Button>
                        <Button className="flex items-center gap-2 px-4 py-2 rounded-lg transition">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="25"
                                width="25"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path>
                            </svg>
                        </Button>
                        {UserData.data.username !== videoData.owner_details.username && (
                            <Button
                                onClick={Subscribe}
                                className={`${isSubscribed ? "bg-red-600 text-white flex gap-1 items-center mt-1 px-1 py-1 text-xs xs:text-base rounded hover:bg-red-700" : "bg-gray-400 text-white gap-1 items-center flex  mt-1 px-1 py-1 text-xs xs:text-base rounded hover:bg-gray-500"}`}>
                                {isSubscribed ? <FaBellSlash /> : <FaBell />} {isSubscribed ? "Unsusbcribe" : "Subscribe"}
                            </Button>
                        )}

                    </div>
                </div>

                <div className="w-full ">
                    <div className="bg-gray-800 gap-2 p-2 w-full mt-2 rounded-md shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-lg font-bold mb-1 text-gray-300">Description</p>
                            <p className="text-sm font-normal text-gray-300">
                                {videoData.description}
                            </p>
                        </div>
                        <Button
                            onClick={() => setOpenPlaylistPopup(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition bg-blue-500 text-white"
                        >
                            <CgPlayListAdd className="text-xl" />
                        </Button>
                    </div>

                </div>
            </div>
            {<PlaylistPopup isOpen={OpenPlaylistPopup} onClose={() => setOpenPlaylistPopup(false)} videoId={videoId.videoId} />}
        </div>
    )
}

export default Video
