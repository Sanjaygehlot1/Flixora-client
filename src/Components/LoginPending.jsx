import React from 'react'

function LoginPending({
    text = "Please Wait"
}) {
   
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">

        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-solid border-opacity-50"></div>
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">{text}</h1>
        <p className="text-gray-400">Set your heart on fire...</p>
      </div>
    </div>
);
}

export default LoginPending
