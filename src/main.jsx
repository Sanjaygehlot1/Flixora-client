import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { store } from './Store/Store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import UserInterface from './Components/UserInterface.jsx'
import Watch_Video from './Components/Videos/Watch_Video.jsx'
import LikedVideos from './Components/SideNavbar Components/LikedVideos.jsx'
import Homepage from './Components/SideNavbar Components/Homepage.jsx'
import MySubscriptions from '../src/Components/Channel/MySubscriptions.jsx'
import History from './Components/SideNavbar Components/History.jsx'
import Dashboard from '../src/Components/Channel/Dashboard.jsx'
import ChannelVideos from '../src/Components/Channel/ChannelVideos.jsx'
import ChannelPlaylists from '../src/Components/Channel/ChannelPlaylists.jsx'
import ChannelTweets from '../src/Components/Channel/ChannelTweets.jsx'
import UploadVideo from './Components/Videos/UploadVideo.jsx'
import Analytics from './Components/SideNavbar Components/Analytics.jsx'
import Settings from './Components/SideNavbar Components/Settings.jsx'
import UpdateDetails from './Components/SideNavbar Components/UpdateDetails.jsx'
import UpdatePassword from './Components/SideNavbar Components/UpdatePassword.jsx'
import UpdateProfile from './Components/SideNavbar Components/UpdateProfile.jsx'
import HomePage from './Components/Playlists/HomePage.jsx'

const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login"
  },
  {
    element: <Register />,
    path: "/register"
  },
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <UserInterface />,
        path: "/",
        children: [
          {
            element: <Homepage />,
            path: "/"
          },
          {
            element: <Analytics />,
            path: "/analytics"
          },
          {
            element: <UploadVideo />,
            path: "/upload-video"
          },
          {
            element: <LikedVideos />,
            path: "/liked-videos"
          },
          {
            element: <History />,
            path: "/watch-history"
          },
          {
            element: <Settings/>,
            path: '/settings',
            children:[
              {
                element: <UpdateDetails/>,
                path: '/settings/update-details'
              },
              {
                element: <UpdatePassword/>,
                path: '/settings/update-password'
              },
              {
                element: <UpdateProfile/>,
                path: '/settings/update-profile'
              }
            ]
          },
          {
            element: <Dashboard />,
            path: "/dashboard/:channel",
            children: [
              {
                element: <ChannelVideos />,
                path: "/dashboard/:channel/videos"
              },
              {
                element: <ChannelPlaylists />,
                path: "/dashboard/:channel/playlists"
              },
              {
                element: <ChannelTweets />,
                path: "/dashboard/:channel/tweets"
              },
              {
                element: <MySubscriptions />,
                path: "/dashboard/:channel/subscribed"
              },
            ]
          }
        ]
      },
      {
        element: <HomePage/>,
        path : '/playlist/:playlistId'
      },
      {
        element: <Watch_Video />,
        path: "/watch/:videoId"
      },

    ]
  }
  
])

createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <RouterProvider router={router}>

    </RouterProvider>

  </Provider>

)
