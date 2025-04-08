import React, { useContext, useState, useEffect } from 'react'
import { ModalContext } from '../context/ModalProvider'
import Modal from '../layouts/Modal/Modal'
import { FaTrophy } from 'react-icons/fa'
import { TournamentsContext } from '../context/TournamentsProvider'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Link } from 'react-router'
import { FaAngleRight } from 'react-icons/fa6'

const Tournaments = () => {
  const { openModal } = useContext(ModalContext)
  const [current, setCurrent] = useState({})
  const { tournaments, fetchTournaments } = useContext(TournamentsContext)

  useEffect(() => {
    // fetchTournaments()
  }, [fetchTournaments])

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col items-center">
      <Link to={'/scores'}>
        <Button
          className={'absolute top-6 right-6 z-40 flex items-center space-x-2'}
          size='sm'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span>Scores</span>
          <FaAngleRight />
        </Button>
      </Link>

      {/* Header */}
      <h1 className='text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg h-[20%] w-full items-center tracking-wide text=center flex justify-center item-center'>
        Tournaments
      </h1>

      {/* Tournament Cards */}
      <div className='flex flex-wrap justify-center items-center flex-1 p-6 gap-8 w-full'>
        {tournaments.map((tournament, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            key={tournament.id}
            onClick={() => {
              openModal()
              setCurrent(tournament)
              console.log(tournament)
            }}
            className='cursor-pointer relative bg-white/10 border border-white/30 backdrop-blur-lg px-6 rounded-2xl shadow-xl flex flex-col items-center w-[280px] hover:border-green-400 hover:bg-white/20 object-cover'
          >
            <img
              src={tournament.logo}
              alt={tournament.title}
              className='w-full h-[220px]  object-fill rounded-xl transition duration-300 hover:opacity-90'
            />
          </motion.div>
        ))}
      </div>

      {/* Modal Section */}
      <Modal className='bg-transparent'>
        <div className='absolute left-[0.99%]  right-[6.27%] top-[9.56%] bottom-[3.24%] bg-[#03104A] rounded-[40px] '>
          {/* White Background Layer */}
          <div className='absolute inset-0 bottom-6 right-3 bg-white rounded-[40px]'></div>

          {/* Inner Light Gray Box */}
          <div className='absolute left-[6.18%] right-[19.53%] top-[23.38%]  bg-[#d6d6d6] rounded-[20px] p-4 flex flex-col'>
            {/* Trophy Icon */}
            {/* <FaTrophy className="text-black-500 inline mx-4 " /> */}
            <div
              className='mt-2 bg-transparent resize-none outline-none h-[150px] max-h-[30vh] p-2 rounded-md overflow-y-auto
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#03104A] w-[87%]'
            >
              <p className='font-bold text-xl whitespace-pre-wrap '>
                {current.description || 'No description available'}
              </p>
            </div>
          </div>

          <div className='absolute bottom-6 w-full h-[100px] flex justify-center items-end'>
            <div className='relative flex justify-center items-center bg-red-500 w-[500px] z-50'>
              {/* Bottom Blue Rectangle with V-Cut Corners */}
              <div
                className='absolute top-[94.40%] -bottom-6 left-0 bg-[#1E4788] w-full z-[2] h-10'
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%,10% 100%)',
                }}
              ></div>

              <div className='absolute z-[2]  left-1/2 -translate-x-1/2 -bottom-10  w-[350px] h-[70px]  bg-[#03104A]  rounded-t-[40px] flex items-center justify-evenly text-white'>
                {
                  // current.numeric_data !== 0 &&
                  current.numeric_data?.map((obj) => {
                    console.log(obj.key, ':', obj.value)
                    return (
                      obj.key &&
                      obj.value &&
                      obj.key.length > 0 &&
                      obj.value.toString().length > 0 && (
                        <span className='text-xl'>
                          <span>{obj.key}</span>
                          <span className='font-bold '>: {obj.value}</span>
                        </span>
                      )
                    )
                  })
                  // console.log('tournaments:', current.numeric_data)
                }
                {/* <p className='text-lg'>
                      <b>Issues:</b> {current.issueCount || 0}
                    </p>
                    <p className='text-lg'>
                      <b>Score:</b> {current.totalScore || 0}
                    </p> */}
              </div>
            </div>
          </div>
          {/* Group 12 - Inner Section */}
          <div className='absolute left-[22.13%] right-[30.11%] -top-6 bottom-[83.28%]'>
            {/* Blue Box */}
            <div className='absolute left-[0.75%] right-0 top-0 bottom-0 bg-[#03104A] rounded-[20px]'></div>
            {/* White Box */}

            <div className='absolute left-0 right-[2.44%] top-[14.29%] bottom-0 bg-white rounded-[20px] flex items-center justify-center'>
              <p className='text-black text-4xl  text-center font-bold'>
                {current.title || 'Error'}
              </p>
            </div>
          </div>

          <div className='absolute left-[69.49%] top-[18%] drop-shadow-lg w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] flex items-center justify-center'>
            {/* Outer Dark Blue Circle */}
            <div className='w-full h-full bg-[#03104A] rounded-full flex items-center justify-center relative'>
              {/* Inner White Circle with Dynamic Image */}
              <div className='absolute w-[90%] h-[90%] bg-amber-50 rounded-full overflow-hidden flex items-center justify-center'>
                <img
                  src={current.logo || '/default-logo.png'}
                  alt={current.name || 'Tournament Logo'}
                  className='w-[60%] h-[100%] object-contain rounded-full'
                  style={{ filter: 'drop-shadow(2px 6px 4px rgba(0,0,0,0.9))' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Modal>
    </div>
  )
}

export default Tournaments
