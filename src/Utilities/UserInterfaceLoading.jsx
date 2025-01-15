import React from 'react'

function UserInterfaceLoading() {
  return (
   
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

  )
}

export default UserInterfaceLoading
