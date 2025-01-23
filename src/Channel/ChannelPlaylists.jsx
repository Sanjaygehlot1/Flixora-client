import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { GetChannelPlaylists } from '../Store/ChannelSlice'
import { useSelector } from 'react-redux'
import ChannelPlaylistSkeleton from './ChannelPlaylistSkeleton'


function ChannelPlaylists() {
  
    const ChannelData = useOutletContext()
  const dispatch = useDispatch()
    const PlaylistsData = useSelector((state) => state.Channel.channelPlaylists)
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const Playlists = async ()=>{
        try {
         await dispatch(GetChannelPlaylists(ChannelData._id)).unwrap()

        } catch (error) {
          console.log(error.message)
          throw error
        }
      }
      Playlists()
    }, [])

    if(!PlaylistsData){
      return <ChannelPlaylistSkeleton/>
    }
    

  return (
   
   PlaylistsData.length !== 0 ? PlaylistsData.map((playlist)=>(
    <div
    key={playlist._id}
      className="relative w-64 bg-gray-800 text-gray-100 rounded-lg overflow-hidden shadow-md m-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src='https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg'
        alt={playlist.title}
        className="w-full h-36 object-cover"
      />

      <div
        className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-lg font-semibold shadow-lg"
          onClick={() => alert(`Playing ${playlist.name}`)}
        >
          Play
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{playlist.name}</h3>
        <p className="text-sm text-gray-400">
          {playlist.TotalVideos} {playlist.TotalVideos === 1 ? "video" : "videos"}
        </p>
      </div>
    </div>
   ))
  : (
    <div className="h-full flex items-center justify-center">
        <h1 className="text-xl text-gray-500">No Playlist</h1>
    </div>
)
  )
}

export default ChannelPlaylists
