import React from 'react'

function DashboardSkeleton() {
  return (
   
            <div className="w-full h-full bg-gray-900 text-white flex flex-col">
                <div className="relative bg-gray-800 h-48 animate-pulse"></div>
    
                <div className="px-6 mt-4">
                    <div className="flex items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse"></div>
                        <div className="ml-4 flex-grow">
                            <div className="h-6 bg-gray-700 rounded w-48 animate-pulse mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
                        </div>
                        <div className="ml-auto">
                            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
    
                <div className="border-t border-gray-700 mt-4">
                    <nav className="flex justify-around text-sm">
                        {Array(4).fill().map((_, i) => (
                            <div
                                key={i}
                                className="py-3 px-4 bg-gray-800 rounded w-24 animate-pulse"
                            ></div>
                        ))}
                    </nav>
                </div>
    
                <div className="flex-grow overflow-y-auto p-6">
                    <div className="flex gap-4 mb-4">
                        {Array(3).fill().map((_, i) => (
                            <div
                                key={i}
                                className="bg-gray-800 text-gray-400 px-4 py-2 rounded w-20 h-8 animate-pulse"
                            ></div>
                        ))}
                    </div>
    
                    <div className="flex flex-col gap-4">
                        {Array(4).fill().map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded overflow-hidden flex animate-pulse">
                                <div className="w-1/3 h-32 bg-gray-700"></div>
                                <div className="p-4 flex-grow">
                                    <div className="h-6 bg-gray-700 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    
    
  
}

export default DashboardSkeleton
