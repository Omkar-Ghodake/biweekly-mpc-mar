import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import ball from '../../assets/BallLoader.png'
import { motion } from 'framer-motion'
// icons
import { HiOutlineLogin } from 'react-icons/hi'
import { RiTeamFill } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { MdSportsScore, MdDashboardCustomize } from 'react-icons/md'
import { IoMdHome } from 'react-icons/io'
import { TbLogout } from 'react-icons/tb'
import { FaPowerOff } from 'react-icons/fa6'
import useClickOutsideElement from '../../hooks/useClickOutsideElement'
import NavLink from './NavLink'
import { CoachContext } from '../../context/CoachProvider'

const VERTICAL_NAV_LINKS = [
  {
    label: 'Logout',
    path: '/exit',
    icon: <TbLogout />,
    showOnAuth: true,
    showWithoutAuth: false,
    role: 'logout',
  },
  {
    label: 'Exit',
    path: '/exit',
    icon: <FaPowerOff />,
    showOnAuth: true,
    showWithoutAuth: true,
  },
  {
    label: 'Login',
    path: '/login',
    icon: <HiOutlineLogin />,
    showOnAuth: false,
    showWithoutAuth: true,
  },
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <MdDashboardCustomize />,
    showOnAuth: true,
    showWithoutAuth: false,
  },
]

const HORIZONTAL_NAV_LINKS = [
  {
    label: 'Home',
    path: '/landing',
    icon: <IoMdHome />,
    showOnAuth: true,
    showWithoutAuth: true,
  },
  {
    label: 'Team',
    path: '/team',
    icon: <RiTeamFill />,
    showOnAuth: true,
    showWithoutAuth: true,
  },
  {
    label: 'Tournaments',
    path: '/tournaments',
    icon: <FiActivity />,
    showOnAuth: true,
    showWithoutAuth: true,
  },
  {
    label: 'Scores',
    path: '/scores',
    icon: <MdSportsScore />,
    showOnAuth: true,
    showWithoutAuth: true,
  },
]

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  const { isCoachAuthenticated, logout } = useContext(CoachContext)

  const navRef = useRef(null)
  const { pathname } = useLocation()
  useClickOutsideElement(navRef, () => setIsNavbarOpen(false))

  const excludeNavbarLinks = ['/', '/landing']

  useEffect(() => {
    setIsNavbarOpen(false)
  }, [logout, pathname])

  if (excludeNavbarLinks.includes(pathname)) return

  return (
    <motion.nav
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className='h-fit w-fit fixed left-6 bottom-6 z-40'
      ref={navRef}
    >
      <div className='relative w-14 h-14'>
        <ul className='vertical-nav-list absolute left-0 bottom-14 mb-5 flex flex-col justify-center items-center space-y-2 w-14 bg--500 z-30'>
          {isNavbarOpen &&
            VERTICAL_NAV_LINKS.map((link, index) =>
              isCoachAuthenticated
                ? link.showOnAuth && (
                    <NavLink
                      label={link.label}
                      icon={link.icon}
                      path={link.path}
                      index={HORIZONTAL_NAV_LINKS.length - 1 - index}
                      key={link.label}
                      tooltipPos={'right'}
                      flag={link.flag}
                      isNavbarOpen={isNavbarOpen}
                      listLength={VERTICAL_NAV_LINKS.length}
                      role={link.role}
                    />
                  )
                : link.showWithoutAuth && (
                    <NavLink
                      label={link.label}
                      icon={link.icon}
                      path={link.path}
                      index={HORIZONTAL_NAV_LINKS.length - 1 - index}
                      key={link.label}
                      tooltipPos={'right'}
                      flag={link.flag}
                      isNavbarOpen={isNavbarOpen}
                      listLength={VERTICAL_NAV_LINKS.length}
                    />
                  )
            )}
        </ul>

        <img
          src={ball}
          alt=''
          className='w-14 h-14 bg-red object-cover z-40 cursor-pointer brightness-90 hover:brightness-95 duration-150'
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        />

        <ul className='horizontal-nav-list absolute left-14 ml-5 bottom-0 flex justify-center items-center space-x-2 bg--500 h-12 z-30'>
          {isNavbarOpen &&
            HORIZONTAL_NAV_LINKS.map((link, index) => (
              <NavLink
                label={link.label}
                icon={link.icon}
                path={link.path}
                index={index}
                key={link.label}
                tooltipPos={'top'}
                isNavbarOpen={isNavbarOpen}
                listLength={HORIZONTAL_NAV_LINKS.length}
              />
            ))}
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navbar
