import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserHistory } from '../../Store/VideoSlice'
import UserInterfaceLoading from '../../Utilities/UserInterfaceLoading'
import { useNavigate } from 'react-router-dom'
import { timeAgo } from '../../Utilities/TimeConversion'
import LoginPopUp from '../LoginPopUp'

function History() {
    const WatchHistory = useSelector((state) => state.Video.WatchHistory)
    const LoginStatus = useSelector((state) => state.Auth.Status)
    console.log(WatchHistory)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const History = async () => {
            try {
                const Response = await dispatch(UserHistory()).unwrap()

                if (Response) {
                    console.log(Response)
                }
            } catch (error) {
                console.log(error.message)
                throw error
            }
        }
        History()
    }, [])

    if(!LoginStatus){
        return <LoginPopUp/>
    }

    if(WatchHistory.length === 0){
        return (
          <div className='flex w-full justify-center p-6 bg-gray-900 min-h-screen'>
              <h1 className='font-bold text-lg'>
                  All your Watched Videos will be shown here
              </h1>
          </div>
      )
      }


    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Watch History</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {WatchHistory.length !== 0 ? (
                    WatchHistory.map((video) => (
                        <div
                            key={video.videoId}
                            className="bg-gray-800 rounded-lg overflow-hidden text-white flex flex-col cursor-pointer shadow-lg hover:scale-105 transition-transform"
                            style={{ height: "300px" }}
                        >
                            <div className="relative" style={{ height: "65%" }}>
                                {video.thumbnail.url && (
                                    <img
                                        src={video.thumbnail.url}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                        onClick={() => {
                                            navigate(`/watch/${video.videoId}`);
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
                                        {video.views} Views · {timeAgo(video.createdAt)}
                                    </p>
                                </div>
                                <div className="flex items-center mt-2">
                                    {video.owner.avatar && (
                                        <img
                                            src={video.owner.avatar}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full"
                                            onClick={()=>{navigate(`/dashboard/${video.owner.username}/videos`)}}
                                        />
                                    )}
                                    <p className="ml-2 text-sm text-gray-300">{video.owner.username}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (

                    <UserInterfaceLoading />
                )
                }
            </div>
        </div>
    )
}

export default History
