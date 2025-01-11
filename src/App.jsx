import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import Home from './Components/Home'


function App() {

  return (
    <>
    <ToastContainer/>

   <main>
    <Home/>
   </main>
    </>
    
  )
}

export default App
