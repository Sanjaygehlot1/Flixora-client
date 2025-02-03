import React,{useEffect} from 'react';

function UploadingPopup({ file }) {

   

    const convertToMB = (size) => (size / (1024 * 1024)).toFixed(2);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-center items-center mb-4">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Uploading Video</h3>
                <p className="text-gray-300 mb-2">Name: {file.title}</p>
                <p className="text-gray-300 mb-4">Size: {convertToMB(file.video[0].size)} MB</p>
            </div>
        </div>
    );
}

export default UploadingPopup;
