import React, {useEffect} from 'react'
import { GetChannelVideos } from '../Store/ChannelSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { timeAgo } from '../Utilities/TimeConversion'
import { Link } from 'react-router-dom'
function ChannelVideos() {

    const ChannelData = useOutletContext()
    const channelVideos = useSelector((state) => state.Channel.channelVideos)
    console.log(channelVideos)
    console.log(ChannelData)

    const dispatch = useDispatch()

    useEffect(() => {
        const videos = async () => {
            await dispatch(GetChannelVideos(ChannelData._id)).unwrap()
        }
        videos()
    }, [ChannelData])
    return (
        <div className="flex-grow overflow-y-auto p-6">
            <div className="flex gap-4 mb-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Latest</button>
                <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded hover:bg-gray-700">Popular</button>
                <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded hover:bg-gray-700">Oldest</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {channelVideos.length !== 0 ? channelVideos.map((video) => (
                    <Link to={`/watch/${video._id}`}>
                    <div key={video._id} className="flex flex-col bg-gray-800 rounded-lg overflow-hidden">
                        <div className="relative">
                            <img
                                src={video.thumbnail?.url}
                                alt={video.title}
                                className="w-full aspect-video object-cover"
                            />
                            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                                {Math.round(video.duration) + 's'}
                            </span>
                        </div>

                        <div className="p-3 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-white font-medium line-clamp-2">
                                    {video.title}
                                </h3>
                                <button className="text-gray-400 hover:text-white">
                                </button>
                            </div>

                            <div className="text-sm text-gray-400 space-y-1">
                                <p>{video.views} views • {timeAgo(video.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    </Link>
                )) : (
                    <div className="h-full flex items-center justify-center">
                        <h1 className="text-xl text-gray-500">No Videos</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChannelVideos
