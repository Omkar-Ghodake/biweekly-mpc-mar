import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { Link } from 'react-router'
import { CoachContext } from '../../context/CoachProvider'

const NavLink = ({
  label,
  icon,
  path,
  index,
  tooltipPos,
  isNavbarOpen,
  listLength,
  showOnAuth,
  showWithoutAuth,
  isCoachAuthenticated,
  role,
}) => {
  const { logout } = useContext(CoachContext)

  const handleClick = () => {
    if (role === 'logout') {
      logout()
    }
  }

  return (
    <motion.li
      // initial={{ opacity: 0 }}
      // animate={{ opacity: isNavbarOpen ? 1 : 0 }}
      // transition={{ delay: index * 0.05, ease: 'easeInOut' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavbarOpen ? 1 : 0 }}
      transition={{
        delay: isNavbarOpen ? index * 0.05 : (listLength - index) * 0.05,
      }}
      className='bg-white rounded-full w-10 h-10 flex justify-center items-center text-2xl relative group'
      onClick={handleClick}
    >
      <Link
        to={path}
        // title={label}
        className='flex justify-center items-center rounded-full w-full h-full'
      >
        {icon}
      </Link>

      <span
        className={`absolute flex justify-center items-center h-8 rounded-md ${
          tooltipPos === 'top' && '-top-10 left-1/2 -translate-x-1/2 bg-black'
        } ${
          tooltipPos === 'right' && 'left-[48px] bg-black'
        } z-40 text-white text-sm duration-150 cursor-pointer opacity-0 group-hover:opacity-100`}
      >
        <span className='relative h-full flex justify-center items-center'>
          <span className='mx-2'>{label}</span>

          <span
            className={`absolute w-0 h-0 border-black ${
              tooltipPos === 'top' &&
              'top-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent'
            } ${
              tooltipPos === 'right' &&
              'right-full border-r-8 border-t-8 border-b-8 border-t-transparent border-b-transparent'
            }`}
          ></span>
        </span>
      </span>
    </motion.li>
  )
}

export default NavLink
