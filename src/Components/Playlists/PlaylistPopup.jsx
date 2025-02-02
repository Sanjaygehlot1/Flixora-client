import React, { useEffect } from 'react'
import { AddVideoToPlaylist, GetChannelPlaylists } from '../../Store/PlaylistSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Common/Button'
function PlaylistPopup({ isOpen, onClose, videoId }) {
    const dispatch = useDispatch()
    const ChannelData = useSelector((state) => state.Auth.UserData)
    const ChannelPlaylists = useSelector((state) => state.Playlist.channelPlaylists)

    const GetPlaylists = async () => {
        try {
            if(ChannelData){

                await dispatch(GetChannelPlaylists(ChannelData.data._id)).unwrap()
            }

        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const AddVideo = async (playlistId) => {
        try {
            await dispatch(AddVideoToPlaylist({ videoId: videoId, playlistId: playlistId })).unwrap()
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    useEffect(() => {
        GetPlaylists()
    }, [ChannelData])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 p-4">

            <div className="bg-gray-900 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-lg shadow-lg p-5 border border-gray-700 max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center border-b border-gray-700 pb-2">

                    <h2 className="text-lg font-semibold text-white">Your Playlists</h2>
                    <Button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl">
                        &times;
                    </Button>
                </div>

                <div className="mt-3 space-y-4">
                    {ChannelPlaylists.map((playlist) => (
                        <div
                            key={playlist._id}
                            className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 cursor-pointer"
                            onClick={() => AddVideo(playlist._id)}
                        >
                            <img
                                src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg"
                                alt={playlist.name}
                                className="w-20 h-20 object-cover rounded-md sm:w-24 sm:h-24 md:w-28 md:h-28"
                            />
                            <div className="ml-4 flex-1">
                                <h3 className="text-white font-medium text-sm sm:text-base md:text-lg">{playlist.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default PlaylistPopup
