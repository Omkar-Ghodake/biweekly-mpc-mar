import React, { useContext } from 'react'
import ball from '../assets/BallLoader.png'
import { motion } from 'framer-motion'
import { ToastContext } from '../context/ToastProvider'

const ToastNotification = () => {
  const { toastState } = useContext(ToastContext)

  return (
    <motion.div
      initial={{ x: '150%' }}
      animate={{ x: toastState?.display ? 0 : '150%' }}
      // transition={{ duration: 1, ease: 'easeInOut' }}
      className='z-50 fixed top-5 right-0 bg-white w-fit h-10 shadow-inner shadow-gray-500/80 flex items-center pl-5'
    >
      <img src={ball} alt='' className='absolute h-[150%] -translate-x-full' />
      <span
        className={`w-full text-right px-2 font-medium text-lg ${
          toastState.type === 'error' && 'text-red-500'
        }`}
      >
        {toastState?.message}
      </span>
    </motion.div>
  )
}

export default ToastNotification
