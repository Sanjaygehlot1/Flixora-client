import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Store/Store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Home from './Components/Home.jsx'
import UserInterface from './Components/UserInterface.jsx'

const router = createBrowserRouter([
  {
    element: <Register/>,
    path: "/register",       
  },
  {
    element: <Login/>,
    path: "/login"
  },
  {
    element: <Home/>,
    path:'/',
    children:[
      {
        element:<UserInterface/>,
        path: "/"
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>

      <RouterProvider router={router}>
        <App />
      </RouterProvider>

    </Provider>
  
)
