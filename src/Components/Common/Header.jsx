import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Input from "../Common/Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { UserLogOut } from "../../Store/AuthSlice";
import { GetAllVideos } from "../../Store/VideoSlice";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";


function Header() {
  const loginStatus = useSelector((state) => state.Auth.Status);
  const UserAvatar = useSelector((state) => state.Auth.UserData);
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navitems = [
    {
      name: "Register",
      path: "/register",
      Status: !loginStatus,
      icon : <VscAccount className="text-xl" />
    },
    {
      name: "Login",
      path: "/login",
      Status: !loginStatus,
      icon : <IoMdLogIn className="text-xl" />
    }
  ];
  const navigate = useNavigate()

  const search =async (data) => {
    if (data?.query) {
      await dispatch(GetAllVideos(data.query)).unwrap()
    }
  }

  const logout = async () => {
    try {
      const user = await dispatch(UserLogOut()).unwrap()

      if (user) {
        navigate("/")
      }
    } catch (error) {
      console.log(error.message)
      throw error

    }
  }

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center space-x-2 ">
        <Link
          to={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-4 mt-4 sm:mt-0">
        <form onSubmit={handleSubmit(search)}>

          <Input
            placeholder="Search Videos"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700"
            {...register("query")}
          />
        </form>
      </div>

      <div className="flex max-2xs:w-full  flex-wrap space-x-4 mt-4 sm:mt-0">
       {
        navitems.map((option)=>{
          
         return option.Status ? (
            <Link to={option.path} key={option.path}> 
            <Button
                className=" px-4 py-1 flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-300"
                bgColor="bg-red-700"
                type="button">
              {option.icon}{option.name}
            </Button>
            </Link>
          ): null
        })
       }
       {
       
        loginStatus ? (
          <div className="flex items-center max-2xs:w-full  max-2xs:justify-end gap-4">
                
                <Button
              className="px-4 py-1 bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white rounded-md transition duration-300"
              bgColor="bg-red-700"
              type="button"
              onClick={logout}>
                <IoMdLogOut className="text-xl" />Logout
          </Button>
          <img
                  src={UserAvatar.data.avatar} 
                  alt="Channel Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div> 
          
          
        ) :null
       }
      </div>
    </nav>
  );
}

export default Header;
