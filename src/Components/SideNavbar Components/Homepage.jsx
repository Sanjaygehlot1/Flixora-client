import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, timeAgo } from '../../Utilities/TimeConversion';
import { GetAllVideos } from '../../Store/VideoSlice';
import UserInterfaceLoading from '../../Utilities/UserInterfaceLoading';
import Button from '../Common/Button';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Allvideos = useSelector((state) => state.Video.AllVideos)
  const [CurrentPage, setCurrentPage] = useState(1)
  const videos = async () => {
    try {
      await dispatch(GetAllVideos({ page: CurrentPage })).unwrap();
    } catch (error) {
      console.log(error.message)
    }

  }

  console.log(Allvideos)

  useEffect(() => {
    videos();
  }, [CurrentPage]);

  if (Object.keys(Allvideos).length === 0) {
    return (<UserInterfaceLoading />)
  }


  if (Allvideos.docs.length === 0) {
    return (
      <div className='flex w-full justify-center p-6 bg-gray-900 min-h-screen'>
          <h1 className='font-bold text-lg'>
              No Videos Found
          </h1>
      </div>
    )
  }


  return (
    <div className='p-6 bg-gray-900 w-full min-h-screen'>
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white">Your Feed</h1>
    </div>
  
    <div
      key={Math.random()}
      className="grid grid-cols-1 sm:grid-cols-2 mt-8 lg:grid-cols-3 gap-6">
      {
        Allvideos.docs.map((video) => (
          <div
            key={video._id}
            className="bg-gray-900 border border-gray-700 border-b-2 rounded-lg overflow-hidden text-white flex flex-col cursor-pointer transition-transform transform hover:scale-105"
            style={{ width: "100%", height: "300px" }}
          >
            <div className="relative" style={{ height: "65%" }}>
              {video.thumbnail.url && (
                <img
                  src={video.thumbnail.url}
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded-t-lg"
                  onClick={() => {
                    navigate(`/watch/${video._id}`);
                  }}
                />
              )}
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-xs text-white px-2 py-1 rounded">
                {formatTime(Math.round(video.duration))}
              </span>
            </div>
  
            <div className="p-3 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold truncate">{video.title}</h2>
                <p className="text-gray-400 text-xs">
                  {video.views} {video.views === 1 ? "view" : "views"} · {timeAgo(video.createdAt)}
                </p>
              </div>
              <div className="flex items-center mt-2">
                {video.owner_details.avatar && (
                  <img
                    onClick={() => navigate(`/dashboard/${video.owner_details.username}/videos`)}
                    src={video.owner_details.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-white transition-all"
                  />
                )}
                <p className="ml-2 text-sm text-gray-300">{video.owner_details.username}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  
    <div className="mt-6 flex justify-center gap-4">
      <Button
        bgColor='bg-red-600'
        className='rounded-lg py-2 px-4 cursor-pointer hover:bg-red-700 transition-colors'
        onClick={() => {
          setCurrentPage(CurrentPage - 1);
        }}
        disabled={CurrentPage === 1}
      >
        <MdOutlineKeyboardDoubleArrowLeft size='30px' />
      </Button>
      <Button
        bgColor='bg-red-600'
        className='rounded-lg py-2 px-4 cursor-pointer hover:bg-red-700 transition-colors'
        onClick={() => {
          setCurrentPage(CurrentPage + 1);
        }}
        disabled={CurrentPage === Allvideos.totalPages}
      >
        <MdOutlineKeyboardDoubleArrowRight size='30px' />
      </Button>
    </div>
    <div className= "mt-6 flex justify-center gap-4">
      <h1>
        Page {CurrentPage} of {Allvideos.totalPages}
      </h1>
    </div>
  </div>
  
  );
}

export default Homepage;
