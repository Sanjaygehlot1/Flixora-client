import React, {  useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { timeAgo } from '../../Utilities/TimeConversion'
import LoginPopUp from '../LoginPopUp'
import Video from './Video'
import VideoComments from './VideoComments'
import { GetUserVideos } from '../../Store/VideoSlice'

function Watch_Video() {
  const LoginStatus = useSelector((state) => state.Auth.Status)
  const UserData = useSelector((state) => state.Auth.UserData)
  const userVideos = useSelector((state) => state.Video.UserPublishedVideos)
  const dispatch = useDispatch()

 
  if (!LoginStatus) {
    return <LoginPopUp />
  }

  useEffect(()=>{
    const fetchUserVideos = async()=>{
      try {
        if(UserData.data._id){
          await dispatch(GetUserVideos(UserData.data._id)).unwrap()
        }
      } catch (error) {
        console.log(error.message)
        throw error
    }
  }
  fetchUserVideos()
  },[UserData])

  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-2">
      <div className="w-full lg:w-4/3 lg:pr-4">
        <div className="max-w-full mx-auto">
          
        <Video/>
          <VideoComments/>

        </div>
      </div>

      <div className="hidden lg:block w-full lg:w-1/3 bg-gray-900 p-4 rounded-lg">
        <h4 className="font-bold mb-4">Videos Uploaded By this Channel</h4>
        <div className="space-y-4">
          {userVideos.map((video) => (
            <NavLink
              key={video._id}
              to={`/watch/${video._id}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 border-l-4 border-red-600 flex items-center gap-4 p-2 rounded-lg cursor-pointer transition"
                  : "flex items-center gap-4 p-2 rounded-lg cursor-pointer transition "
              }
            >
              <div key={video._id} className="flex items-center cursor-pointer">
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
            </NavLink>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Watch_Video
