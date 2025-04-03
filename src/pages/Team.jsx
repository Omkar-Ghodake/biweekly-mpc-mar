import React, { useContext } from 'react'
import background from '../assets/background.jpg'
import Button from '../components/Button'
import { Link } from 'react-router'
import { TeamContext } from '../context/TeamProvider'
import { FaAngleRight } from 'react-icons/fa6'

const Team = () => {
  const { teamInfo } = useContext(TeamContext)

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='absolute inset-0 p-6 z-30 flex justify-between w-full'>
        <h1 className='text-white text-3xl tracking-wider'>
          <span className='font-semibold'>Our Team: </span>
          <span>{teamInfo?.tag_line}</span>
        </h1>

        <Button className={''} size='sm'>
          <Link
            to={'/tournaments'}
            className='flex justify-between items-center space-x-2'
          >
            <span>Tournaments</span> <FaAngleRight />
          </Link>
        </Button>
      </div>

      <img
        src={teamInfo?.display_picture}
        alt=''
        className='absolute inset-0 object-cover'
      />
    </div>
  )
}

export default Team
