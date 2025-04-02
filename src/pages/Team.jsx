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
      {/* <img
        src={background}
        alt=''
        className='fixed inset-0 h-screen w-screen brightness-75'
      /> */}

      <img
        src={teamInfo?.display_picture}
        alt=''
        className='absolute inset-0 z-30 object-cover'
      />

      <Button className={'absolute right-6 top-6 z-40 h-fit'} size='sm'>
        <Link
          to={'/tournaments'}
          className='flex justify-between items-center space-x-2'
        >
          <span>Tournaments</span> <FaAngleRight />
        </Link>
      </Button>
    </div>
  )
}

export default Team
