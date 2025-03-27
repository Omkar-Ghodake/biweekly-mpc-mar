import React, { useContext } from 'react'
import loader from '../assets/Landingpage/loader.gif'
import { motion } from 'framer-motion'
import { LoadingContext } from '../context/LoadingProvider'

const Loader = () => {
  const { isLoading } = useContext(LoadingContext)

  return (
    isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='w-screen h-screen fixed inset-0 bg-white/30  backdrop-blur-lg flex items-center justify-center z-[500]'
      >
        <img src={loader} alt='' className='w-40' />
      </motion.div>
    )
  )
}

export default Loader
