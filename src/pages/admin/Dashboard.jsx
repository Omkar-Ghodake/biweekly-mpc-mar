import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { CoachContext } from '../../context/CoachProvider'
import background from '../../assets/background5.jpg'
import { motion } from 'framer-motion'
import AdminBg from '../../components/AdminBg'

const Dashboard = () => {
  const { isCoachAuthenticated } = useContext(CoachContext)
  const navigate = useNavigate()

  const DASHBOARD_ITEMS = [
    { href: '/admin/dashboard/editPlayers', text: 'Players', subText: 'Edit' },
    { href: '/admin/dashboard/editTournaments', text: 'Tournaments', subText: 'Edit' },
    { href: '/admin/dashboard/editTeam', text: 'Team', subText: 'Edit' },
    { href: '/admin/dashboard/profile', text: 'Profile', subText: 'Coach' },
    { href: '/admin/dashboard/analytics-dashboard', text: 'Analysis', subText: 'Data' },
    { href: '/admin/dashboard/documents', text: 'Documents', subText: 'Team' },
  ]

  if (!isCoachAuthenticated) return navigate('/admin/login')

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center relative px-4 pt-20 pb-10'>
      <AdminBg />

      <h1 className='z-10 text-5xl text-white font-bold tracking-wide shadow-2xs mb-12'>
        Coach Controls
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-20'>
        {DASHBOARD_ITEMS.map((item, index) => (
          <Link key={item.href} to={item.href} className=''>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className='bg-white/90 w-64 h-44 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-center items-start px-6 py-4 hover:scale-[1.03] cursor-pointer'
            >
              <span className='text-gray-700 text-lg font-medium capitalize mb-1'>
                {item.subText}
              </span>
              <span className='text-3xl font-semibold text-blue-900 drop-shadow-sm tracking-wide'>
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
