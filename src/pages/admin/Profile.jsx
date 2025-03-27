import React from 'react'
import background from '../../assets/background5.jpg'

const Profile = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <img
        src={background}
        alt=''
        className='fixed inset-0 h-screen w-screen brightness-75'
      />
    </div>
  )
}

export default Profile
