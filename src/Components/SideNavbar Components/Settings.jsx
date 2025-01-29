import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import LoginPopUp from '../LoginPopUp'

function Settings() {
    const LoginStatus = useSelector((state)=>state.Auth.Status)
    const NavItems = [
        {
            name : "Update Details",
            path : "/settings/update-details"
        },
        {
            name: "Update Password",
            path : "/settings/update-password"
        },
        {
            name: "Update Profile",
            path : "/settings/update-profile"
        }
    ]
    if(!LoginStatus){
        return <LoginPopUp/>
    }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <nav className="w-full lg:w-auto space-y-2 lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row">
          {NavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  
    <main className="flex-grow p-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-gray-800 shadow-md rounded-lg p-6">
        <Outlet />
      </div>
    </main>
  </div>
  
  )
}

export default Settings
