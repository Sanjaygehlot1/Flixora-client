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

const router = createBrowserRouter([
  
  {
    element: <App/>,
    path:'/',
    children:[
      {
        element:<UserInterface/>,
        path: "/"
      },
      {
        element:<Login/>,
        path: "/login"
      },
      {
        element:<Register/>,
        path: "/register"
      },
      {
        element:<Watch_Video/>,
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
