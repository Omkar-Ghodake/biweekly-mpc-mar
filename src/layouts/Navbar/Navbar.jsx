import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import ball from '../../assets/BallLoader.png'
import { motion } from 'framer-motion'
// icons
import { HiOutlineLogin } from 'react-icons/hi'
import { RiTeamFill } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { MdSportsScore } from 'react-icons/md'
import { IoExitOutline } from 'react-icons/io5'
import { IoMdHome } from 'react-icons/io'
import useClickOutsideElement from '../../hooks/useClickOutsideElement'

const VERTICAL_NAV_LINKS = [
  {
    label: 'Home',
    path: '/landing',
    icon: <IoMdHome />,
  },
]

const HORIZONTAL_NAV_LINKS = []

const Navbar = () => {
  const navRef = useRef(null)
  useClickOutsideElement(navRef, () => {})

  return (
    <nav
      className='h-fit w-fit fixed left-6 bottom-6 cursor-pointer overflow-hidden z-40'
      ref={navRef}
    >
      <ul className='vertical-nav-list'></ul>

      <img src={ball} alt='' className='w-14 h-14 bg-red-500 object-cover' />

      <ul className='horizontal-nav-list'></ul>
    </nav>
  )
}

export default Navbar
