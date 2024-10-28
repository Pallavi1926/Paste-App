import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row justify-center gap-5 bg-blue-950 h-[30px]'>
    <NavLink
    className='text-blue-500'
    to='/'
    >
    Home
    </NavLink>
    <NavLink
    className='text-white'
    to='/pastes'
    >
    Paste
    </NavLink>
    </div>
  )
}

export default NavBar