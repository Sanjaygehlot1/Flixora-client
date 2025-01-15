import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetAllVideos, GetUserVideos, WatchVideo } from '../../Store/VideoSlice'
import Input from '../Common/Input'
import { timeAgo } from '../../Utilities/TimeConversion'
import VideoLoading from '../../Utilities/VideoLoading'
import { CheckSubscription, ToggleSubscription } from '../../Store/SubscriptionSlice'

function Watch_Video() {
  let isSubscribed = useSelector((state) => state.Subscription.isSubscribed)
  const [videoData, setvideoData] = useState(null)
  const [userVideos, setuserVideos] = useState([])
  const [SubscribeLoading, setSubscribeLoading] = useState(false)
  const dispatch = useDispatch()
  const videoId = useParams()
  const navigate = useNavigate()

  const video = async () => {
    try {
      const videoResponse = await dispatch(WatchVideo(videoId)).unwrap()

      if (videoResponse) {
        setvideoData(videoResponse)
      }

      const UserVideoResponse = await dispatch(GetUserVideos(videoResponse.owner_details._id)).unwrap()

      if (UserVideoResponse) {
        setuserVideos(UserVideoResponse.data)
      }

    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  const Subscribe = async () => {
    try {
      const isCurrentlySubscribed = isSubscribed;
      setSubscribeLoading(true)
      await dispatch(ToggleSubscription(videoData.owner_details._id)).unwrap();
      setSubscribeLoading(false)
  
      setvideoData((prev) => ({
        ...prev,
        owner_details: {
          ...prev.owner_details,
          subscribersCount: isCurrentlySubscribed
            ? prev.owner_details.subscribersCount - 1
            : prev.owner_details.subscribersCount + 1,
        },
      }));
  
    } catch (error) {
      console.error("Error toggling subscription:", error.message);
    }
  };
  
  const CheckSubs = async ()=>{
    try {
      await dispatch(CheckSubscription(videoData.owner_details._id)).unwrap()

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    video()
  }, [videoId])
 
  useEffect(()=>{
    CheckSubs()
  },[videoData])

  

  if (!videoData) {
    return (<VideoLoading/>)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-4/3 lg:pr-4">
        <div className="max-w-full mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <video
              src={videoData.videoFile.url}
              controls
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-bold">{videoData.title}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">{videoData.views} Views</p>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <img
              src={videoData?.owner_details.avatar}
              alt="Channel Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold">{videoData.owner_details.username}</h3>
              <p className="text-sm text-gray-400">
                {videoData?.owner_details.subscribersCount} Subscribers
              </p>
            </div>
            <button className="ml-auto bg-red-600 px-4 py-2 rounded-lg text-sm"
            disabled={SubscribeLoading}
              onClick={Subscribe}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold mb-4">Comments</h4>
            <div className="mb-4">
              <Input
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
                type="text"
                placeholder="Add a Comment"
              />
              <button className="mt-2 bg-red-600 px-4 py-2 rounded-lg text-sm">
                Send
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <p className="text-sm">testuser1</p>
                <p className="text-gray-400 text-sm ml-4">8 weeks ago</p>
              </div>
              <p className="text-gray-300">This is a comment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full lg:w-1/3 bg-gray-900 p-4 rounded-lg">
        <h4 className="font-bold mb-4">Videos Uploaded By this Channel</h4>
        <div className="space-y-4">
          {userVideos.map((video) => (
            <div
              key={video._id}
              className="flex items-center cursor-pointer"
              onClick={() => navigate(`/watch/${video._id}`)}
            >
              <img
                src={video.thumbnail.url}
                alt="Thumbnail"
                className="w-20 h-12 object-cover rounded"
              />
              <div className="ml-4">
                <h5 className="text-sm font-bold">{video.title}</h5>
                <p className="text-gray-400 text-xs">
                  {video.views} Views · {timeAgo(video.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Watch_Video
