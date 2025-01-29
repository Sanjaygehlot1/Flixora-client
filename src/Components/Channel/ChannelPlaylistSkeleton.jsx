import React from 'react'

function ChannelPlaylistSkeleton() {
  return (
    <div className="w-64 bg-gray-800 rounded-lg overflow-hidden shadow-md m-4 animate-pulse">
    <div className="w-full h-36 bg-gray-700"></div>

    <div className="p-4">
      <div className="h-4 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
  )
}

export default ChannelPlaylistSkeleton
