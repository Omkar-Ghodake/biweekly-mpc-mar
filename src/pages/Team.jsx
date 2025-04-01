import React, { useContext } from 'react'
import background from '../assets/background.jpg'
import Button from '../components/Button'
import { Link } from 'react-router'
import { TeamContext } from '../context/TeamProvider'

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

      <Link to={'/tournaments'} className=' absolute right-10 top-6 z-40 h-fit'>
        <Button className={''}>Tournaments</Button>
      </Link>
    </div>
  )
}

export default Team
