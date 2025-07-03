import React, { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'
import home_icon from '../assets/home_logo.png'
import search_icon from '../assets/search_icon.svg'
import cart_icon from '../assets/cart_icon.svg'
import menu_icon from '../assets/menu_icon.svg'
import { useAppContext } from '../context/AppContext'
import profile_icon from '../assets/profile_icon.png'



const Navbar = () => {
  const [open, setOpen] = useState(true);
  const {user,setUser,setShowUserLogin,navigate,searchQuery,setSearchQuery,getCartCount,getCartAmount} = useAppContext();
  const logout=async()=>{
    setUser(null);
    navigate('/')
  }
  useEffect(()=>{
    if(searchQuery.length > 0) {
        navigate('/products');
    }else{
        navigate('/');}

    },[searchQuery])
  return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink onClick={()=>{setOpen(false)}} to="/" className="flex items-center gap-2">
                <img className="h-15" src={home_icon} alt=""/>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>Products</NavLink>
                <NavLink to='/contact'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>{setSearchQuery(e.target.value)}} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={search_icon} alt="" className='w-4 h-4'/>
                </div>

                <div onClick={()=>{navigate("/cart")}} className="relative cursor-pointer">
                    <img src={cart_icon} alt="" className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                {
                    user ? (
                        <div className='relative group '>
                        <img src={profile_icon} alt="" className='w-10'/>
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                        <li onClick={()=>{navigate("my-orders")}} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                        <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary-dull cursor-pointer'>Logout</li>
                        </ul>
                        
                        </div>
                    ) : (
                        <button onClick={() => { setShowUserLogin(true); setOpen(false) }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                            Login
                        </button>
                    )
                }
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={()=>{navigate("/cart")}} className="relative cursor-pointer">
                    <img src={cart_icon} alt="" className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={menu_icon} alt="" className='w-6 h-6'/>
            </button>
                
            </div>
            {/* Mobile Menu */}
            {open &&
            (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to='/' onClick={()=>setOpen(false)}>Home</NavLink>
                <NavLink to='/products' onClick={()=>setOpen(false)}>Products</NavLink>
                {user && <NavLink to='/products' onClick={()=>setOpen(false)}>My Orders</NavLink>}
                <NavLink to='/' onClick={()=>setOpen(false)}>Contact</NavLink>
                {
                    user ? (
                        <button onClick={logout} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => { setShowUserLogin(true); setOpen(false) }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full">
                            Login
                        </button>
                    )
                }

            </div>
            )}
        </nav>
    )
}
export default Navbar;