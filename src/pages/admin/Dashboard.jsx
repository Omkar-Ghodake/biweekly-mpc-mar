import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { CoachContext } from '../../context/CoachProvider'
import background from '../../assets/background.jpg'
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
      href: '/admin/profile',
      text: 'Profile',
      subText: '',
    },
  ]

  return (
    <div className='h-screen flex items-center justify-center'>
      <img
        src={background}
        alt=''
        className='fixed inset-0 h-screen w-screen brightness-75'
      />
      <div className='grid grid-cols-2'>
        {DASHBOARD_ITEMS.map((item, index) => (
          <Link key={item.title} to={item.href} className='rounded-lg p-5'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className='bg-white/30 backdrop-blur-lg rounded-lg w-64 h-44 text-primary flex flex-col justify-center p-5 cursor-pointer shadow-md hover:shadow-xl hover:scale-105 duration-150'
            >
              <span className='text-2xl font-semibold'>{item.subText}</span>
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
