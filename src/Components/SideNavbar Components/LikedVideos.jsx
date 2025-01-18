import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserInterfaceLoading from '../../Utilities/UserInterfaceLoading'
import { GetLikedVideos } from '../../Store/VideoSlice'
import { timeAgo } from '../../Utilities/TimeConversion'
import { useNavigate } from 'react-router-dom'
import LoginPopUp from '../LoginPopUp'

function LikedVideos() {

  const LikedVideos = useSelector((state) => state.Video.AllLikedVideos)
  const LoginStatus = useSelector((state) => state.Auth.Status)
  console.log(LikedVideos)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const GetVideos = async () => {
      try {
        await dispatch(GetLikedVideos()).unwrap()
      } catch (error) {
        console.log(error.message)
        throw error
      }
    }
    GetVideos()
  }, [LoginStatus])

  if (!LoginStatus) {
    return <LoginPopUp />
  }

  if(LikedVideos.length === 0){
    return (
      <div className='flex w-full justify-center p-6 bg-gray-900 min-h-screen'>
          <h1 className='font-bold text-lg'>
              All your liked Videos will be shown here
          </h1>
      </div>
  )
  }

 
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Liked Videos</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LikedVideos.length !== 0 ? (
          LikedVideos.map((video) => (
            <div
              key={video._id}
              className="bg-gray-800 rounded-lg overflow-hidden text-white flex flex-col cursor-pointer shadow-lg hover:scale-105 transition-transform"
              style={{ height: "300px" }}
            >
              <div className="relative" style={{ height: "65%" }}>
                {video.result.thumbnail.url && (
                  <img
                    src={video.result.thumbnail.url}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    onClick={() => {
                      navigate(`/watch/${video.result._id}`);
                    }}
                  />
                )}
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-xs text-white px-2 py-1 rounded">
                  {Math.round(video.result.duration)}s
                </span>
              </div>

              <div className="p-3 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-bold truncate">{video.result.title}</h2>
                  <p className="text-gray-400 text-xs">
                    {video.result.views} Views · {timeAgo(video.result.createdAt)}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  {video.Owner.avatar && (
                    <img
                      src={video.Owner.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <p className="ml-2 text-sm text-gray-300">{video.Owner.username}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          
            <UserInterfaceLoading />
          
        )}
      </div>
    </div>
  )
}

export default LikedVideos
