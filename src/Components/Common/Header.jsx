import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Input from "../Common/Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { UserLogOut } from "../../Store/AuthSlice";
import { GetAllVideos } from "../../Store/VideoSlice";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";

function Header() {
  const loginStatus = useSelector((state) => state.Auth.Status);
  const UserData = useSelector((state) => state.Auth.UserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const navitems = [
    {
      name: "Register",
      path: "/register",
      Status: !loginStatus,
      icon: <VscAccount className="text-xl" />,
    },
    {
      name: "Login",
      path: "/login",
      Status: !loginStatus,
      icon: <IoMdLogIn className="text-xl" />,
    },
  ];

  const search = async () => {
    try {
      console.log(query); 
      await dispatch(GetAllVideos({query: query , page : 1})).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      const user = await dispatch(UserLogOut()).unwrap();
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center space-x-2 ">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-4 mt-4 sm:mt-0">
        <form onSubmit={(e) => { e.preventDefault(); search(); }} className="w-full items-center gap-1 flex">
          <Input
            placeholder="Search Videos"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700"
            value={query} 
            onchange={(e) => setQuery(e.target.value)} 
          />
          <Button
            type="submit"
            bgColor="bg-red-600"
            className="rounded-full border-black border-2 p-2 hover:bg-red-700"
          >
            <FaSearch color="black" />
          </Button>
        </form>
      </div>

      <div className="flex max-2xs:w-full flex-wrap space-x-4 mt-4 sm:mt-0">
        {navitems.map((option) => {
          return option.Status ? (
            <Link to={option.path} key={option.path}>
              <Button
                className="px-4 py-1 flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-300"
                bgColor="bg-red-700"
                type="button"
              >
                {option.icon}
                {option.name}
              </Button>
            </Link>
          ) : null;
        })}
        {loginStatus ? (
          <div className="flex items-center max-2xs:w-full max-2xs:justify-end gap-4">
            <Button
              className="px-4 py-1 bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white rounded-md transition duration-300"
              bgColor="bg-red-700"
              type="button"
              onClick={logout}
            >
              <IoMdLogOut className="text-xl" /> Logout
            </Button>
            <img
            onClick={()=>navigate(`/dashboard/${UserData.data.username}/videos`)}
              src={UserData.data.avatar}
              alt="Channel Profile"
              className="w-12 h-12 cursor-pointer rounded-full border-2 border-gray-700 hover:border-white transition-all"
            />
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Header;
