import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Landing_Exit.css'
import Button from '../components/Button'
import { Link } from 'react-router'
import { LuSkipForward } from 'react-icons/lu'
import { TeamContext } from '../context/TeamProvider'
import { FaAngleRight } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Landing = () => {
  const [isVideoComplete, setIsVideoComplete] = useState(false)

  const { teamInfo } = useContext(TeamContext)

  // console.log(teamInfo)

  // description: "Members of Parliament's Corner description Details"
  // display_picture: 'http://res.cloudinary.com/djp8zilvt/image/upload/v1743359315/wjfhuhm3vbjot81lbfax.png'
  // logo: 'http://res.cloudinary.com/djp8zilvt/image/upload/v1743486984/ukgggppzuflxcomsogu5.jpg'
  // long_name: "Member of parliament's corner"
  // short_name: 'MPC'
  // tag_line: 'Tagline is Tagline'
  // __v: 0
  // _id: 'mpc_team'

  const skipVideo = () => {
    setIsVideoComplete(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsVideoComplete(true)
    }, 13600)
  }, [setIsVideoComplete])

  return (
    <div className='relative w-full h-screen overflow-hidden bg-blur'>
      {/* this button is for skipping the video to the end  */}
      {!isVideoComplete && (
        <div className='absolute w-full flex justify-end top-5 right-5 z-20 '>
          <Button
            variant='outline'
            className=' text-white border border-white-300 hover:bg-white hover:text-black'
            onClick={skipVideo}
          >
            <LuSkipForward />
          </Button>
        </div>
      )}

      {/* Background Video */}
      {!isVideoComplete && (
        <video
          className='absolute inset-0 w-full h-full object-cover backdrop-blur-3xl'
          autoPlay
        >
          <source src={'/Entry_BG.mp4'} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )}

      {/* {isVideoComplete && (
      )} */}

      {/*Content */}
      {isVideoComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute inset-0 flex flex-col items-center justify-center z-30 text-white space-y-10'
        >
          <img
            src='/Exit_BG.jpg'
            className='absolute inset-0 w-full h-full object-cover backdrop-blur-3xl -z-10'
          />

          {teamInfo && (
            <>
              <div className='text-center flex flex-col space-y-5 font-bold'>
                <h1 className='text-7xl'>{teamInfo.short_name}</h1>
                <h1 className='text-5xl'>{teamInfo.long_name}</h1>
              </div>

              <img
                src={teamInfo.logo}
                alt=''
                className='w-[50vh] landing-logo-spin'
              />

              <p className='text-3xl font-semibold w-[70%] mx-auto text-center text-wrap'>
                {teamInfo.description}
              </p>
            </>
          )}

          <div className='absolute right-6 bottom-6  flex flex-col items-center justify-center space-y-5'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Button className={'text-lg'} size='sm'>
                <Link
                  to={'/admin/login'}
                  className='flex justify-center items-center space-x-2'
                >
                  <span>I'm a Coach</span> <FaAngleRight />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button className={''} variant='secondary' size='sm'>
                <Link
                  to={'/team'}
                  className='flex justify-center items-center space-x-2'
                >
                  <span>I'm a Player</span> <FaAngleRight />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Landing
