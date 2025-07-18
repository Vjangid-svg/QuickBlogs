import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import SideBar from '../../components/admin/SideBar'
function Layout() {

// const {setToken} =useAppContext();
//  const navigate = useNavigate()
const {axios,setToken,navigate}=useAppContext();
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    axios.default.headers.common["Authorization"]=null;
    setToken(null);
    navigate("/") // Clear context
    // navigate("/login"); // Redirect
  };
  return (
    <>
           <div className=' flex justify-between items-center py-5  sm:mx-12 xl:mx:24 '>
                <img  onClick={()=>navigate("/")} src={assets.logo} alt="_logo "  className='w-32 sm:w-44 cursor-pointer'/>
                <button  onClick={()=>{
                  navigate("/")
                  handleLogout();
                }} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Logout </button>
               
            </div>
            <div className='w-full cursor-pointer border-b border-gray-200 '></div>
            <div className='flex  h-[calc(100vh-70px)]'>
                <SideBar/>
                <Outlet/>

            </div>
           
    </>
  )
}

export default Layout