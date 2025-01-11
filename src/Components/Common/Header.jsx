import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <nav className="w-full bg-gray-900 flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
      <div className="flex items-center justify-center gap-2 cursor-pointer">
        <Logo />
      </div>

      <div className="w-full sm:w-1/3 hidden sm:block">
        <Search />
      </div>

      <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
        <CiSearch size="30" fontWeight="bold" onclick="setOpenSearch(!openSearch)" />
        <SearchForSmallScreen open="openSearch" setOpenSearch="setOpenSearch" />
      </div>

      <div>
        <div className="space-x-2 sm:block hidden">
          <Link to="/login">
            <Button className="bg-gray-800 border hover:bg-black border-gray-500 sm:px-4 sm:py-2 p-2">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="font-semibold border hover:bg-gray-800 border-gray-500 sm:px-4 sm:py-2">Sign up</Button>
          </Link>
        </div>

        <div className="rounded-full sm:block hidden">
          <img src="profileImg" alt="Profile" className="rounded-full w-10 h-10 object-cover" />
        </div>
      </div>

      <div className="sm:hidden block">
        <div className="text-white">
          <SlMenu size="24" onclick="setToggleMenu(!toggleMenu)" />
        </div>
      </div>

      <div v-if="toggleMenu" className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-gray-900 sm:hidden rounded-lg outline-none">
        <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <IoCloseCircleOutline size="35" onclick="setToggleMenu(!toggleMenu)" />
        </div>

        <div className="flex flex-col justify-between h-full py-5 px-3">
          <div className="flex flex-col gap-5">
            <NavLink to="/liked-videos" className="flex items-center border border-gray-500 gap-5 px-3 py-1 hover:bg-purple-500">
              <BiLike size="25" />
              <span className="text-lg">Liked Videos</span>
            </NavLink>
          </div>

          <div className="flex flex-col space-y-5 mb-3">
            <Link to="/login">
              <Button className="w-full bg-gray-800 border hover:bg-white hover:text-black border-gray-500 py-1 px-3">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full font-semibold border border-gray-500 hover:bg-white hover:text-black py-1 px-3">Sign up</Button>
            </Link>
          </div>

          <div v-if="authStatus" className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-gray-600" size="25" />
          <span className="text-base">Logout</span>
        </div>
      </div>
    
</nav >

  )
}

export default Header
