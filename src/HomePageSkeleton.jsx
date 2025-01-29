import React from 'react'

function HomePageSkeleton() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
                <div className="h-10 w-32 bg-gray-700 rounded-lg"></div>
                <div className="h-10 w-96 bg-gray-700 rounded-lg"></div>
                <div className="h-10 w-20 flex bg-gray-700 rounded-lg gap-1">
                <div className="h-10 w-96 bg-gray-700 rounded-lg"></div>
                    <div className="h-10 w-20 bg-gray-700 rounded-full "></div>
                </div>
            </div>

            <div className="flex">
                <div className="w-1/5 bg-gray-800 min-h-screen p-4">
                    {Array(6)
                        .fill(" ")
                        .map((_, index) => (
                            <div
                                key={index}
                                className="h-10 mb-4 bg-gray-700 rounded-lg"
                            ></div>
                        ))}
                    <div className="h-10 bg-gray-700 rounded-lg"></div>
                </div>

                <div className="flex-1 p-6">
                    <div className="h-6 w-40 bg-gray-700 rounded-lg mb-6"></div>


                    <div className="grid grid-cols-2 gap-6">
                        {Array(6)
                            .fill(" ")
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 p-4 rounded-lg shadow-md"
                                >
                                    <div className="h-40 bg-gray-700 rounded-lg mb-4"></div>

                                    <div className="h-6 w-3/4 bg-gray-700 rounded-lg mb-2"></div>

                                    <div className="h-4 w-1/2 bg-gray-700 rounded-lg mb-4"></div>

                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-gray-700 rounded-full mr-4"></div>
                                        <div className="h-4 w-1/3 bg-gray-700 rounded-lg"></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageSkeleton
