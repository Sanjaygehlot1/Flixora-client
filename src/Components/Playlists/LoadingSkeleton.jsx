import React from "react";

const LoadingSkeleton = () => (
  <div className="flex flex-col lg:flex-row p-4 mx-auto bg-gray-900 text-white min-h-screen">
    <div className="w-full lg:w-1/4 border border-gray-700 border-b-8 rounded-xl overflow-hidden bg-gray-900 p-4 shadow-md">
      <div className="flex flex-col gap-2 justify-between items-center mb-5">
        <div className="bg-gray-700 w-36 h-8 rounded-full animate-pulse"></div>
        <div className="flex gap-2">
          <div className="bg-gray-700 w-16 h-8 rounded-md animate-pulse"></div>
          <div className="bg-gray-700 w-16 h-8 rounded-md animate-pulse"></div>
        </div>
      </div>
      <h2 className="text-white mt-2">Description</h2>
      <div className="bg-gray-700 w-full h-5 mt-2 rounded animate-pulse"></div>
      <div className="bg-gray-700 w-full h-5 mt-2 rounded animate-pulse"></div>
      <div className="mt-2 text-sm text-gray-500">
        <div className="bg-gray-700 w-32 h-4 mt-2 rounded animate-pulse"></div>
        <div className="bg-gray-700 w-32 h-4 mt-2 rounded animate-pulse"></div>
      </div>
    </div>

    <div className="w-full lg:w-3/4 mt-4 lg:mt-0 lg:ml-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col sm:flex-row bg-gray-900 border border-gray-700 border-b-4 overflow-hidden shadow-md rounded-xl p-4">
          <div className="w-full sm:w-1/3">
            <div className="bg-gray-700 w-full h-32 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full sm:w-2/3 sm:ml-4 mt-2 sm:mt-0 flex justify-between items-start">
            <div>
              <div className="bg-gray-700 w-48 h-6 mb-2 rounded animate-pulse"></div>
              <div className="bg-gray-700 w-36 h-5 rounded animate-pulse"></div>
              <div className="bg-gray-700 w-24 h-3 mt-2 rounded animate-pulse"></div>
            </div>
            <div className="bg-gray-700 w-16 h-8 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center justify-center h-64">
          <div className="bg-gray-700 w-48 h-8 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
