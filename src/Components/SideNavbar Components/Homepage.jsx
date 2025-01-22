import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { timeAgo } from '../../Utilities/TimeConversion';
import { GetAllVideos } from '../../Store/VideoSlice';
import UserInterfaceLoading from '../../Utilities/UserInterfaceLoading';
function Homepage() {

  const dispatch = useDispatch();
  const [Allvideos, setAllvideos] = useState([])
  const navigate = useNavigate()

  const videos = async () => {
    const videoRes = await dispatch(GetAllVideos()).unwrap();
    if (videoRes) {
      setAllvideos(videoRes.data.docs)
    }
  };



  React.useEffect(() => {
    videos();
  }, []);


  return (
    <div className='p-6 bg-gray-900 w-full min-h-screen'>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Your Feed</h1>
      </div>

      <div
        key={Math.random()}
        className="grid xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {Allvideos.length !== 0 ? (
          Allvideos.map((video) => (

            <div

              key={video._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform text-white flex flex-col cursor-pointer"
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
                    {video.views} {video.views === 1 ? "view" : "views"} · {timeAgo(video.createdAt)}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  {video.owner_details.avatar && (
                    <img
                    onClick={()=>(navigate(`/dashboard/${video.owner_details.username}/videos`))}
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
        ) : (<UserInterfaceLoading />)}
      </div>
    </div>
  )
}

export default Homepage
