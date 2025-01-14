import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllVideos } from '../Store/VideoSlice';
import { Link, useNavigate } from 'react-router-dom';
import LoginPending from './LoginPending';
import LoginPopUp from './LoginPopUp';

function UserInterface() {
  const dispatch = useDispatch();
  const [Allvideos, setAllvideos] = useState([])
  const [ShowLoginPopup, setShowLoginPopup] = useState(false)
  const navigate = useNavigate()
  const loginStatus = useSelector((state) => state.Auth.Status)



  const videos = async () => {
    const videoRes = await dispatch(GetAllVideos()).unwrap();
    if (videoRes) {
      setAllvideos(videoRes.data.docs)
    }
  };

  const CheckLogin = (url) => {
    if (!loginStatus) {
      setShowLoginPopup(true)
    }
    console.log(url)
    navigate('/watch/')
  }

  React.useEffect(() => {
    videos();
  }, []);

  return (
    <div className="flex bg-black min-h-screen">
      <div className="w-1/5 bg-gray-900 text-white p-4 hidden md:block">
        <ul className="space-y-4 text-sm">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Liked Videos</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Subscriptions</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">My Content</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">History</li>
        </ul>
      </div>

      <div
        key={Math.random()}
        className="w-full md:w-4/5  p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {Allvideos.length !== 0 ? (
          Allvideos.map((video) => (

            <div

              key={video._id}
              className="bg-gray-800 rounded-lg overflow-hidden text-white flex flex-col cursor-pointer"
              style={{ width: "100%", height: "300px" }}
            >
              <div className="relative" style={{ height: "65%" }}>
                {video.thumbnail.url && (
                  <img
                    src={video.thumbnail.url}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    onClick={() => {
                      navigate(`/watch/${video._id}`)
                    }}
                  />
                )}
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-xs text-white px-2 py-1 rounded">
                  {Math.round(video.duration)}s
                </span>
              </div>


              <div className="p-3 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-bold truncate">{video.title}</h2>
                  <p className="text-gray-400 text-xs">
                    {video.views} Views · {video.uploaded_at}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  {video.owner_details.avatar && (
                    <img
                      src={video.owner_details.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <p className="ml-2 text-sm text-gray-300">
                    {video.owner_details.username}
                  </p>
                </div>
              </div>
            </div>

          ))
        ) : (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden text-white flex flex-col cursor-pointer animate-pulse"
                style={{ width: "100%", height: "300px" }}
              >
                <div className="relative bg-gray-700" style={{ height: "65%" }}></div>

                <div className="p-3 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="bg-gray-700 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-700 h-3 w-1/2 rounded"></div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div className="ml-2 bg-gray-700 h-4 w-1/3 rounded"></div>
                  </div>
                </div>
              </div>
            )
            )
        )}
      </div>
      {ShowLoginPopup && (
        <LoginPopUp
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </div>

  );
}

export default UserInterface;
