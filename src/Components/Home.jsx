import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Common/Header'
import Footer from './Common/Footer'

function Home() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
