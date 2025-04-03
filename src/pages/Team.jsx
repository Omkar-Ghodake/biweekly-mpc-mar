import React, { useContext } from 'react'
import Button from '../components/Button'
import { Link } from 'react-router'
import { TeamContext } from '../context/TeamProvider'
import { FaAngleRight } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Team = () => {
  const { teamInfo } = useContext(TeamContext)

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='absolute inset-0 p-6 z-30 flex justify-between w-full'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-white text-3xl tracking-wider'
        >
          <span className='font-semibold'>Our Team: </span>
          <span>{teamInfo?.tag_line}</span>
        </motion.h1>

        <Button
          className={''}
          size='sm'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Link
            to={'/tournaments'}
            className='flex justify-between items-center space-x-2'
          >
            <span>Tournaments</span> <FaAngleRight />
          </Link>
        </Button>
      </div>

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={teamInfo?.display_picture}
        alt=''
        className='absolute inset-0 object-cover'
      />
    </div>
  )
}

export default Team
