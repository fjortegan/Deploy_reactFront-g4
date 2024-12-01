import  { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/userContext.jsx'
import Navbar from '../components/navbar/index.jsx'
import Footer from '../components/footer/index.jsx'

const LayoutPrivate = () => {

  const {user} = useContext(UserContext)

  return ( 
    <>
      <Navbar/>
      {user? <Outlet /> : <Navigate to ="/" />}
      <Footer/>
    </>
  )
}

export default LayoutPrivate