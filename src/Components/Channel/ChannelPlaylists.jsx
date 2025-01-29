import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { CreatePlaylist, GetChannelPlaylists } from '../../Store/PlaylistSlice.js'
import { useSelector } from 'react-redux'
import ChannelPlaylistSkeleton from './ChannelPlaylistSkeleton'
import Button from '../Common/Button.jsx'
import { useForm } from 'react-hook-form'
import { FaEllipsisH } from 'react-icons/fa'

function ChannelPlaylists() {

  const ChannelData = useOutletContext()
  const dispatch = useDispatch()
  const PlaylistsData = useSelector((state) => state.Channel.channelPlaylists)
  const User = useSelector((state) => state.Auth.UserData)
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate()

  const toggleDropdown = (tweetId) => {
    if (dropdownOpen === tweetId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(tweetId);
    }
  };
  const openEditModal = (tweet) => {
    setEditTweetId(tweet._id);
    setEditContent(tweet.content);
  };

  const closeEditModal = () => {
    setEditTweetId(null);
    setEditContent('');
  };
  useEffect(() => {
    const Playlists = async () => {
      try {
        await dispatch(GetChannelPlaylists(ChannelData._id)).unwrap()

      } catch (error) {
        console.log(error.message)
        throw error
      }
    }
    Playlists()
  }, [])
  console.log(PlaylistsData)

  const PlaylistSubmit = async (data) => {
    try {
      console.log(data)
      await dispatch(CreatePlaylist(data)).unwrap()
      await dispatch(GetChannelPlaylists(ChannelData._id)).unwrap()
      setisOpen(false)
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  if (!PlaylistsData) {
    return <ChannelPlaylistSkeleton />
  }


  return (

    <div className="w-full">
      <div className="flex justify-end">
        <Button
          className="px-4  my-2 mr-4 text-white rounded-md bg-red-500 hover:bg-red-600"
          onClick={() => setisOpen(true)}
        >
          Create Playlist
        </Button>
      </div>

      <div className="grid mx-4 my-4 gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
        {PlaylistsData.length !== 0 ? (
          PlaylistsData.map((playlist, index) => (
            <div
              key={playlist._id}
              className="relative bg-gray-800 text-gray-100 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              onClick={()=>navigate(`/playlist/${playlist._id}`)}
            >
              <img
                src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg"
                alt={playlist.name}
                className="w-full h-40 object-cover"
              />
              

              <div
                className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity ${isHovered === index ? "opacity-100" : "opacity-0"
                  }`}
              >
                <button
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-lg font-semibold shadow-md"
                  onClick={() => alert(`Playing ${playlist.name}`)}
                >
                  Play
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold truncate mb-1">
                  {playlist.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {playlist.TotalVideos}{" "}
                  {playlist.TotalVideos === 1 ? "video" : "videos"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <h1 className="text-xl text-gray-500">No Playlists</h1>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4 text-white">
              Create Playlist
            </h2>
            <form onSubmit={handleSubmit(PlaylistSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="playlistName"
                  className="block text-sm font-medium mb-1 text-gray-200"
                >
                  Playlist Name
                </label>
                <input
                  type="text"
                  id="playlistName"
                  className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-500"
                  placeholder="Enter playlist name"
                  {...register("name", {
                    required: "Playlist name is required",
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1 text-gray-200"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-500"
                  placeholder="Enter description"
                  rows="3"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <div className="text-red-500">{errors.description.message}</div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={() => setisOpen(false)}
                  className="bg-gray-500 text-white px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-red-500 text-white px-4  rounded hover:bg-red-600"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelPlaylists
