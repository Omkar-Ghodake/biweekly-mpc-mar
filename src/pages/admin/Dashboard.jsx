import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { CoachContext } from '../../context/CoachProvider'
import background from '../../assets/background5.jpg'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { isCoachAuthenticated } = useContext(CoachContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isCoachAuthenticated) {
      navigate('/login')
    }
  }, [isCoachAuthenticated, navigate])

  if (!isCoachAuthenticated) {
    navigate('/login')
    return null
  }

  const DASHBOARD_ITEMS = [
    {
      href: '/admin/dashboard/editPlayers',
      text: 'Players',
      subText: 'Edit',
    },
    {
      href: '/admin/dashboard/editTournaments',
      text: 'Tournaments',
      subText: 'Edit',
    },
    {
      href: '/admin/dashboard/editTeam',
      text: 'Team',
      subText: 'Edit',
    },
    {
      href: '/admin/dashboard/profile',
      text: 'Profile',
      subText: 'coach',
    },
    {
      href: '/admin/dashboard/analytics-dashboard',
      text: 'Analysis',
      subText: 'data',
    },
    {
      href: '/admin/dashboard/documents',
      text: 'Documents',
      subText: 'team',
    },
  ]

  return (
    <div className='h-screen flex flex-col space-y-5 items-center justify-center w-[70%] mx-auto'>
      <img
        src={background}
        alt=''
        className='fixed inset-0 h-screen w-screen brightness-75'
      />

      <h1 className='z-10 text-5xl flex justify-start text-white px-10 items-center tracking-wide w-full font-medium rounded-xl h-[15%]'>
        Coach Controls
      </h1>

      <div className='grid grid-cols-3 z-40'>
        {DASHBOARD_ITEMS.map((item, index) => (
          <Link
            key={item.title}
            to={item.href}
            className='rounded-lg p-5 h-fit'
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className='bg-white/30 backdrop-blur-lg rounded-lg w-64 h-44 text-primary flex flex-col justify-center p-5 cursor-pointer shadow-md hover:shadow-xl hover:scale-105 duration-150'
            >
              <span className='text-2xl font-semibold capitalize'>
                {item.subText}
              </span>
              <span className='text-4xl font-semibold drop-shadow-lg'>
                {item.text}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
