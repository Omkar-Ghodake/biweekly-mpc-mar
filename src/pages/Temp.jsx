import React, { useState } from 'react'
import { PlayersContext } from '../context/PlayersProvider'
import ball from '../assets/BallLoader.png'
import { motion } from 'framer-motion'

const Temp = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  return (
    // <div className='h-screen w-screen flex space-x-5  items-center justify-center'>
    //   {players?.map((elem) => (
    //     <div>{elem?.domain_name}</div>
    //   ))}
    // </div>

    <div className='h-fit w-fit fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer overflow-hidden'>
      <div className='flex flex-col h-[14rem] w-[14rem]'>
        <motion.div
          initial={{ y: '0' }}
          animate={{ y: isNavbarOpen ? '0' : '14rem' }}
          className='flex flex-col space-y-2 z-40'
        >
          <div className='h-12 w-12 shadow-md border border-slate-300 rounded-full'></div>
          <div className='h-12 w-12 shadow-md border border-slate-300 rounded-full'></div>
          <div className='h-12 w-12 shadow-md border border-slate-300 rounded-full'></div>
        </motion.div>

        <img
          src={ball}
          alt=''
          className='h-12 w-12 hover:drop-shadow-xl z-50 absolute bottom-0'
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        />

        <motion.div
          initial={{ x: '3.5rem' }}
          animate={{ x: isNavbarOpen ? '3.5rem' : '-10.5rem' }}
          className='flex space-x-2 z-40 absolute left-0 bottom-0'
        >
          <div className='h-12 w-12 shadow-md border border-slate-300 rounded-full'></div>
          <div className='h-12 w-12 shadow-md border border-slate-300 rounded-full'></div>
          <div className='h-12 w-12 shadow-md border border-slate-300 rounded-full'></div>
        </motion.div>
      </div>
    </div>
  )
}

export default Temp
