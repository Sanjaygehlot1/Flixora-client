import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetAllVideos, GetUserVideos, WatchVideo } from '../../Store/VideoSlice'
import Input from '../Common/Input'

function Watch_Video() {

  const [videoData, setvideoData] = useState()
  const [userVideos, setuserVideos] = useState([])
  const dispatch = useDispatch()
  const videoId = useParams()
  const navigate = useNavigate()

  const video = async () => {
    try {
      const videoResponse = await dispatch(WatchVideo(videoId)).unwrap()
      console.log(videoId)

      if (videoResponse) {

        console.log(videoResponse)

        setvideoData(videoResponse)
        console.log(videoData)
      }

      const UserVideoResponse = await dispatch(GetUserVideos(videoResponse.owner_details._id)).unwrap()

      console.log(UserVideoResponse)

      if (UserVideoResponse) {
        setuserVideos(UserVideoResponse.data)
        console.log(userVideos)
      }

    } catch (error) {
      console.log(error.message)
      throw error

    }
  }

  useEffect(() => {
    video()
    console.log(videoData)
  }, [])

  if (!videoData) {
    return (<div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-4/3 lg:pr-4">
        <div className="max-w-full mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-800 animate-pulse rounded-lg"></div>

          <div className="h-6 bg-gray-700 animate-pulse rounded mb-4 w-3/4"></div>

          <div className="h-4 bg-gray-700 animate-pulse rounded mb-4 w-1/2"></div>

          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-1/3"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-1/4"></div>
            </div>
            <div className="ml-auto h-8 bg-purple-500 animate-pulse rounded w-20"></div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="h-5 bg-gray-700 animate-pulse rounded mb-4 w-1/4"></div>
            <div className="space-y-4">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
                      <div className="h-4 bg-gray-700 rounded animate-pulse ml-4 w-1/6"></div>
                    </div>
                    <div className="h-3 bg-gray-700 rounded animate-pulse w-5/6"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full lg:w-1/3 bg-gray-900 p-4 rounded-lg">
        <div className="h-5 bg-gray-700 animate-pulse rounded mb-4 w-1/3"></div>
        <div className="space-y-4">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 h-12 bg-gray-700 rounded animate-pulse"></div>
                <div className="ml-4 w-full">
                  <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    )
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
            <button className="ml-auto bg-purple-500 px-4 py-2 rounded-lg text-sm">
              {videoData?.owner_details?.isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold mb-4">Comments</h4>
            <div className="mb-4">
              <input
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
                type="text"
                placeholder="Add a Comment"
              />
              <button className="mt-2 bg-purple-500 px-4 py-2 rounded-lg text-sm">
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
                  {video.views} Views · {video.uploaded_at}
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
