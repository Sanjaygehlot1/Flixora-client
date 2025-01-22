import React, { useEffect, useState,useMemo } from 'react';
import { FaVideo, FaEye, FaList, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllVideos, GetChannelStats, TogglePublishStatus } from '../../Store/ChannelSlice';
import { timeAgo } from '../../Utilities/TimeConversion';
import { Link } from 'react-router-dom';
import LoginPopUp from '../LoginPopUp';
import Button from '../Common/Button';
import { toast } from 'react-toastify';
import Loader from '../../Utilities/Loader';
import { FiUpload } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import AnalyticsLoading from './AnalyticsLoading';

function Analytics() {

  const dispatch = useDispatch()
  const [publishStatus, setpublishStatus] = useState(false)
  const [PublishingId, setPublishingId] = useState('')
  const UserData = useSelector((state) => state.Auth.UserData)
  const ChannelStats = useSelector((state) => state.Channel.channelStats)
  const ChannelVideos = useSelector((state) => state.Channel.channelVideos)
  const memoizedChannelVideos = useMemo(() => ChannelVideos, [ChannelVideos]);


  console.log(ChannelVideos)
  useEffect(() => {
    const GetStats = async () => {
      try {
        if (UserData) {
          console.log(UserData)
          const channelId = UserData.data._id
          await dispatch(GetChannelStats(channelId)).unwrap()
          await dispatch(GetAllVideos(channelId)).unwrap()
          setPublishingId('')
        }
      } catch (error) {
        console.log(error.message)
        throw error
      }
    }
    GetStats()
  }, [UserData, publishStatus,dispatch])


  const TogglePublish = async (videoId) => {
    try {
      setPublishingId(videoId)
      const PublishStatusRes = await dispatch(TogglePublishStatus(videoId)).unwrap()
      setpublishStatus(PublishStatusRes)
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 3000,
        position: "bottom-right",
        theme: "colored"
      })
      console.log(error.message)
      throw error
    }
  }

  if (!UserData) {
    return <LoginPopUp />
  }
  if (Object.keys(ChannelStats).length === 0) {
    return <AnalyticsLoading />
  }


  return (
    <div className="w-full min-h-screen p-6 bg-gray-900 text-white">
      
      <div className="container mx-auto">
      
      <div className="flex justify-end mb-6">
        <NavLink
          to={`/upload-video`}
          className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center shadow-md hover:bg-gray-600"
        >
          <FiUpload
          className="mr-2"/> Upload Video
        </NavLink>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4  overflow-hidden  hover:scale-105 transition-transform rounded-lg shadow-lg flex items-center">
          <FaVideo className="text-blue-500 w-12 h-12" />
          <div className="ml-4">
            <h4 className="text-xl font-semibold">Videos</h4>
            <p className="text-gray-400">{ChannelStats.TotalVideos}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg overflow-hidden  hover:scale-105 transition-transform shadow-lg flex items-center">
          <FaEye className="text-green-500 w-12 h-12" />
          <div className="ml-4">
            <h4 className="text-xl font-semibold">Views</h4>
            <p className="text-gray-400">{ChannelStats.TotalViews}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg overflow-hidden  hover:scale-105 transition-transform shadow-lg flex items-center">
          <FaList className="text-yellow-500 w-12 h-12" />
          <div className="ml-4">
            <h4 className="text-xl font-semibold">Playlists</h4>
            <p className="text-gray-400">{ChannelStats.Totalplaylists}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg overflow-hidden  hover:scale-105 transition-transform shadow-lg flex items-center">
          <FaUser className="text-purple-500 w-12 h-12" />
          <div className="ml-4">
            <h4 className="text-xl font-semibold">Subscribers</h4>
            <p className="text-gray-400">{ChannelStats.Totalsubscribers}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <table className="w-full text-left text-gray-300 overflow-x-auto">
          <thead>
            <tr>
              <th className="py-2">Video Title (Click To Navigate)</th>
              <th className="py-2">Publish Status</th>
              <th className="py-2">Date Uploaded</th>
              <th className="py-2">Total Views</th>
              <th className="py-2">Toggle Publish</th>
            </tr>
          </thead>
          <tbody>
            {memoizedChannelVideos.length ? memoizedChannelVideos.map((video) => (
              <tr key={video._id} className="border-t border-gray-700 hover:text-red-500">
                <td className="py-2">
                  <Link to={`/watch/${video._id}`}>
                    {video.title}
                  </Link>
                </td>
                <td className="py-2">{video.isPublished ? 'Published' : 'Unpublished'}</td>
                <td className="py-2">{video.createdAt.split('T')[0].trim()}</td>
                <td className="py-2">{video.views}</td>
                <td className="py-2">
                  <Button

                    onClick={() => {
                      TogglePublish(video._id);
                    }}
                    className={`${video.isPublished
                      ? "bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                      : "bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                      }`}
                  >
                    {PublishingId === video._id && <Loader />}
                    {PublishingId === video._id
                      ? ""
                      : video.isPublished
                        ? "Unpublish"
                        : "Publish"}
                  </Button>
                </td>

              </tr>
            )) : (
              <tr>
                <td>
                  <div className="h-full flex items-center ">
                    <h1 className="text-xl text-gray-500">No Videos</h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div >


  );
}

export default Analytics;
