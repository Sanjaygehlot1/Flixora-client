import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllVideos } from '../Store/VideoSlice';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LoginPopUp from './LoginPopUp';
import { timeAgo } from '../Utilities/TimeConversion';
import UserInterfaceLoading from '../Utilities/UserInterfaceLoading';
import { FaCog } from 'react-icons/fa'
function UserInterface() {
  
  const user = useSelector((state)=>state.Auth.UserData)
  console.log(user)
  const SideNavItems = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Liked Videos",
      path: "/liked-videos"
    },
    {
      name: "Analytics",
      path: "/analytics"
    },
    {
      name: "My Channel",
      path: `/dashboard/${user?.data.username}/videos`
    },
    {
      name: "History",
      path: "/watch-history"
    }
  ]

  useEffect(()=>{
    
  },[user])

  return (
    <div className="flex bg-black min-h-screen">
      <div className="w-1/5 bg-gray-900 text-white p-4 hidden md:block">
        <ul className="space-y-4 text-sm">
          {SideNavItems.map((item) => (
            <NavLink
            key={item.name}
            to={item.path}
            className={({isActive})=>(
              isActive ? "bg-gray-800 border-l-4 border-red-600 flex items-center gap-4 p-2 rounded-lg cursor-pointer transition" : "flex items-center gap-4 p-2 rounded-lg cursor-pointer transition "
            )}
            >
              <li className="hover:bg-gray-700 w-full p-2 rounded cursor-pointer">{item.name}</li>
            </NavLink>
          ))}
        </ul>
        <div className="mt-auto border-t border-gray-700 py-4 px-6">
                <NavLink
                    to={`/dashboard/${user?.data.username}/settings`}
                    className="py-2 px-4 flex items-center text-gray-400 hover:text-white"
                >
                    <FaCog className="mr-2" /> Settings
                </NavLink>
            </div>
      </div>

          <Outlet/>

    </div>

  );
}

export default UserInterface;
