import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { MdHistoryToggleOff, MdHome, MdOutlineDashboard } from 'react-icons/md';
import { BiSolidLike } from 'react-icons/bi';

function UserInterface() {
  const user = useSelector((state) => state.Auth.UserData);

  const SideNavItems = [
    {
      name: 'Home',
      icon: <MdHome className="text-lg md:text-xl" />,
      path: '/',
    },
    {
      name: 'Liked Videos',
      icon: <BiSolidLike className="text-lg md:text-xl" />,
      path: '/liked-videos',
    },
    {
      name: 'Analytics',
      icon: <IoMdAnalytics className="text-lg md:text-xl" />,
      path: '/analytics',
    },
    {
      name: 'My Channel',
      icon: <MdOutlineDashboard className="text-lg md:text-xl" />,
      path: `/dashboard/${user?.data.username}/videos`,
    },
    {
      name: 'History',
      icon: <MdHistoryToggleOff className="text-lg md:text-xl" />,
      path: '/watch-history',
    },
  ];

  useEffect(() => {}, [user]);

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex  flex-col w-1/5 bg-gray-900 text-white p-4">
        <ul className="space-y-4 text-sm">
          {SideNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-800 border-l-4 border-red-600 flex items-center gap-4 p-2 rounded-lg cursor-pointer transition'
                  : 'flex items-center gap-4 p-2 rounded-lg cursor-pointer transition'
              }
            >
              <span>{item.icon}</span>
              <span className=" lg:block">{item.name}</span>
            </NavLink>
          ))}
          <div className="mt-auto border-t border-gray-700 py-4 px-6">
          <NavLink
            to={`/settings/update-details`}
            className="py-2  flex items-center text-gray-400 hover:text-white"
          >
            <FaCog className="text-lg md:text-xl mr-2" />
            <span className="">Settings</span>
          </NavLink>
        </div>
        </ul>
        
      </div>

      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      <div className="md:hidden fixed z-20 bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-around items-center border-t border-gray-700">
        <ul className="flex  w-full justify-around space-x-4">
          {SideNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 flex justify-center'
                  : 'text-gray-400 flex justify-center'
              }
            >
              <span className="text-2xl">{item.icon}</span>
            </NavLink>
          ))}
          <NavLink
            to={`/settings/update-details`}
            className={({ isActive }) =>
              isActive
                ? 'text-red-500 flex justify-center'
                : 'text-gray-400 flex justify-center'
            }
          >
            <FaCog className="text-lg md:text-xl " />
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default UserInterface;
