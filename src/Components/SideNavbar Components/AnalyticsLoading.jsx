import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiUpload } from 'react-icons/fi'
function AnalyticsLoading() {
    return (
        <div className="w-full min-h-screen p-6 bg-gray-900 text-white">
            <div className="container mx-auto">
                <div className="flex justify-end mb-6">
                    <NavLink
                        to={`/upload-video`}
                        className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center shadow-md hover:bg-gray-600"
                    >
                        <FiUpload className="mr-2" /> Upload Video
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    
                      {  [1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center animate-pulse"
                    >
                        <div className="bg-gray-700 w-12 h-12 rounded-full"></div>
                        <div className="ml-4">
                            <div className="h-5 bg-gray-700 rounded w-24 mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-16"></div>
                        </div>
                    </div>
                    ))
}

                </div>
            </div>
        </div>
    )
}

export default AnalyticsLoading



