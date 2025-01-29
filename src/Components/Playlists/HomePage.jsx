import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSkeleton from './LoadingSkeleton'
import { useNavigate, useParams } from 'react-router-dom'
import { DeletePlaylist, GetPlaylistById, RemoveVideoFromPlaylist, UpdatePlaylist } from '../../Store/PlaylistSlice'
import {timeAgo} from '../../Utilities/TimeConversion'
import Button from '../Common/Button'
function HomePage() {

    const PlaylistDetails = useSelector((state) => state.Playlist.PlaylistDetails)
    const LoadingStatus = useSelector((state) => state.Playlist.Loading)
    const [OpenEditPopup, setOpenEditPopup] = useState(false)
    const [OpenDeletePopup, setOpenDeletePopup] = useState(false)
    const [videoId, setvideoId] = useState(null)
    const navigate = useNavigate()
    const playlistId = useParams()
    const dispatch = useDispatch()

    const GetPlaylist = async () => {
        try {
            if (playlistId) {
                await dispatch(GetPlaylistById(playlistId)).unwrap()
            }
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    useEffect(() => {
        GetPlaylist()
    }, [playlistId.playlistId])

    const Delete = async () => {
        try {
            if (playlistId) {
                await dispatch(DeletePlaylist(playlistId)).unwrap()
                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
    const EditDetails = async (data) => {
        try {
            if (playlistId) {
                await dispatch(UpdatePlaylist({ playlistId: playlistId, data: data })).unwrap()
            }
            GetPlaylist()
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const RemoveVideo = async (video_Id) => {
        try {
            if (video_Id) {
                console.log(video_Id)
                await dispatch(RemoveVideoFromPlaylist({ playlistId: playlistId.playlistId, videoId: video_Id })).unwrap()
                GetPlaylist()
            }
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    if (Object.keys(PlaylistDetails).length === 0) {
        return <LoadingSkeleton />
    }


    return (
       
        PlaylistDetails ? (
            <div className="flex flex-col lg:flex-row p-4 mx-auto bg-gray-900 text-white min-h-screen">
            <div className="w-full lg:w-1/4 bg-gray-800 p-4 rounded-xl shadow-md">
              <div className="flex flex-col gap-2 justify-between items-center">
                <h2 className="text-xl font-bold">{PlaylistDetails.name}</h2>
                <div className="flex gap-2">
                  <Button className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">
                    Edit
                  </Button>
                  <Button className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600">
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-gray-400 mt-2">{PlaylistDetails.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Total Videos: {PlaylistDetails.TotalVideos}</p>
                <p>Views: {PlaylistDetails.TotalViews}</p>
              </div>
            </div>
      
            <div className="w-full lg:w-3/4 mt-4 lg:mt-0 lg:ml-4">
              <div className="grid grid-cols-1 gap-4">
                {PlaylistDetails.videos[0].ownerDetails.length !==0 ?  PlaylistDetails.videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row bg-gray-800 shadow-md rounded-xl p-4"
                    
                  >
                    <div className="w-full sm:w-1/3">
                      <div className="bg-gray-700 w-full h-32 rounded-lg">
                        <img
                          src={video.thumbnail.url}
                          alt={video.title}
                          className="w-full h-full object-cover rounded-lg"
                          onClick={()=>navigate(`/watch/${video.id}`)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-2/3 sm:ml-4 mt-2 sm:mt-0 flex justify-between items-start">
                      <div 
                      onClick={()=>navigate(`/watch/${video.id}`)}>
                        <h3 className="text-lg font-semibold">{video.title}</h3>
                        <p className="text-gray-400 text-sm">{video.description}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {video.views} views • {timeAgo(video.createdAt)}
                        </p>
                      </div>
                      <Button
                        onClick={() => RemoveVideo(video._id)}
                        className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )) : 
                (<div className="flex items-center justify-center h-64">
                    <h2 className="text-2xl">No Videos Found</h2>
                </div>)}
              </div>
            </div>
          </div>
        ) : "No Playlist Found"     
    )
}

export default HomePage

       