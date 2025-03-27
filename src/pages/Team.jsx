import React from 'react'
import background from '../assets/background.jpg'
import Button from '../components/Button'
import { Link } from 'react-router'

const Team = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <img
        src={background}
        alt=''
        className='fixed inset-0 h-screen w-screen brightness-75'
      />

      <img
        src='/Team Photo MPC.png'
        alt=''
        className='absolute -bottom-16 z-30 object-cover'
      />

      <Link to={'/tournaments'} className=' absolute right-10 top-6 z-40 h-fit'>
        <Button className={''}>Tournaments</Button>
      </Link>
    </div>
  )
}

export default Team
