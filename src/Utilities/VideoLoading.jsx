import React from 'react'

function VideoLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-4/3 lg:pr-4">
        <div className="max-w-full mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-800 animate-pulse rounded-lg"></div>

          <div className="h-6 bg-gray-700 animate-pulse rounded mb-4 w-3/4"></div>

          <div className="h-4 bg-gray-700 animate-pulse rounded mb-4 w-1/2"></div>

          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-1/3"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-1/4"></div>
            </div>
            <div className="ml-auto h-8 bg-purple-500 animate-pulse rounded w-20"></div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="h-5 bg-gray-700 animate-pulse rounded mb-4 w-1/4"></div>
            <div className="space-y-4">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
                      <div className="h-4 bg-gray-700 rounded animate-pulse ml-4 w-1/6"></div>
                    </div>
                    <div className="h-3 bg-gray-700 rounded animate-pulse w-5/6"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full lg:w-1/3 bg-gray-900 p-4 rounded-lg">
        <div className="h-5 bg-gray-700 animate-pulse rounded mb-4 w-1/3"></div>
        <div className="space-y-4">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 h-12 bg-gray-700 rounded animate-pulse"></div>
                <div className="ml-4 w-full">
                  <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    
  )
}

export default VideoLoading
