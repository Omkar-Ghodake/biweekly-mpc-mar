import React from 'react'
import background from '../assets/background5.jpg'

const AdminBg = () => {
  return (
    <img
      src={background}
      alt=''
      className='fixed inset-0 h-screen w-screen brightness-75 -z-10'
    />
  )
}

export default AdminBg
