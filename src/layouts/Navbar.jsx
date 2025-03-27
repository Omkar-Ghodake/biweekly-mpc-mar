import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { CoachContext } from '../context/CoachProvider'
import ball from '../assets/BallLoader.png'
import { motion } from 'framer-motion'
import { HiOutlineLogin } from 'react-icons/hi'
import { RiTeamFill } from 'react-icons/ri'
import { IoMdHome } from 'react-icons/io'
import { FiActivity } from 'react-icons/fi'
import { MdSportsScore } from 'react-icons/md'
import { IoExitOutline } from 'react-icons/io5'

const Navbar = () => {
  const { pathname } = useLocation()

  const { isCoachAuthenticated, logout } = useContext(CoachContext)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  useEffect(() => {}, [logout])

  return (
    <div className='h-fit w-fit fixed left-6 bottom-6 cursor-pointer overflow-hidden'>
      <div className='flex flex-col h-[16rem] w-[16rem]'>
        <motion.div
          initial={{ y: '2.5rem' }}
          animate={{ y: isNavbarOpen ? '2.5rem' : '16rem' }}
          // transition={{ bounce: false }}
          className='flex flex-col space-y-2 z-40 w-fit'
        >
          <Link
            to={'/login'}
            className='h-12 w-12 flex justify-center items-center text-2xl bg-white shadow-md border border-slate-300 rounded-full'
            title='Login'
          >
            <HiOutlineLogin />
          </Link>

          <Link
            to={'/team'}
            className='h-12 w-12 flex justify-center items-center text-2xl bg-white shadow-md border border-slate-300 rounded-full'
            title='Team'
          >
            <RiTeamFill />
          </Link>

          <Link
            to={'/landing'}
            className='h-12 w-12 flex justify-center items-center text-2xl bg-white shadow-md border border-slate-300 rounded-full'
            title='Home'
          >
            <IoMdHome />
          </Link>
        </motion.div>

        <img
          src={ball}
          alt=''
          className='h-12 w-12 hover:drop-shadow-xl z-50 absolute bottom-0'
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        />

        <motion.div
          initial={{ x: '3.5rem' }}
          animate={{ x: isNavbarOpen ? '3.5rem' : '-10.5rem' }}
          className='flex space-x-2 z-40 absolute left-0 bottom-0'
        >
          <Link
            to={'/tournaments'}
            className='h-12 w-12 flex justify-center items-center text-2xl bg-white shadow-md border border-slate-300 rounded-full'
            title='Tournaments'
          >
            <FiActivity />
          </Link>
          <Link
            to={'/scores'}
            className='h-12 w-12 flex justify-center items-center text-2xl bg-white shadow-md border border-slate-300 rounded-full'
            title='Scores'
          >
            <MdSportsScore />
          </Link>
          <Link
            to={'/exit'}
            className='h-12 w-12 flex justify-center items-center text-2xl bg-white shadow-md border border-slate-300 rounded-full'
            title='Exit'
          >
            <IoExitOutline />
          </Link>
        </motion.div>
      </div>
      {/* <ul className='navlist list-disc'>
        <li className='navitem hover:underline text-blue-700'>
          <Link to='/' className={`navlink ${pathname === '/' && 'underline'}`}>
            Black
          </Link>
        </li>
        <br />
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/landing'
            className={`navlink ${pathname === '/landing' && 'underline'}`}
          >
            Landing
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/team'
            className={`navlink ${pathname === '/team' && 'underline'}`}
          >
            Team
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/tournaments'
            className={`navlink ${pathname === '/tournaments' && 'underline'}`}
          >
            Tournaments
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/scores'
            className={`navlink ${pathname === '/scores' && 'underline'}`}
          >
            Scores
          </Link>
        </li>

        <br />

        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/admin/dashboard'
            className={`navlink ${
              pathname === '/admin/dashboard' && 'underline'
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/admin/dashboard/editTeam'
            className={`navlink ${
              pathname === '/admin/dashboard/editTeam' && 'underline'
            }`}
          >
            EditTeam
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/admin/dashboard/editTournaments'
            className={`navlink ${
              pathname === '/admin/dashboard/editTournaments' && 'underline'
            }`}
          >
            EditTournaments
          </Link>
        </li>

        <br />

        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/exit'
            className={`navlink ${pathname === '/exit' && 'underline'}`}
          >
            Exit
          </Link>
        </li>

        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/temp'
            className={`navlink ${pathname === '/temp' && 'underline'}`}
          >
            Temp
          </Link>
        </li>

        <br />

        {isCoachAuthenticated ? (
          <li
            className='navitem cursor-pointer hover:underline text-blue-700'
            onClick={logout}
          >
            <span>Logout</span>
          </li>
        ) : (
          <li className='navitem hover:underline text-blue-700'>
            <Link
              to='/login'
              className={`navlink ${pathname === '/login' && 'underline'}`}
            >
              Login
            </Link>
          </li>
        )}
      </ul> */}
    </div>
  )
}

export default Navbar
