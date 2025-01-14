import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import Header from './Components/Common/Header'
import Footer from './Components/Common/Footer'
import { useDispatch } from 'react-redux'
import { GetCurrentUser, UserLogin } from './Store/AuthSlice'
import { useEffect } from 'react'


function App() {

    const dispatch = useDispatch()
  useEffect( () => {
    dispatch(GetCurrentUser()).unwrap()
  }, [])
  

  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>

  )
}

export default App
