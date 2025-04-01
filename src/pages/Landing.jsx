import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../context/ModalProvider'
import Modal from '../layouts/Modal/Modal'
import ModalHead from '../layouts/Modal/ModalHead'
import ModalBody from '../layouts/Modal/ModalBody'
import '../Styles/Landing_Exit.css'
import { useScroll } from '@react-three/drei'
import Button from '../components/Button'
import { Link } from 'react-router'
import { LuSkipForward } from 'react-icons/lu'
import { TeamContext } from '../context/TeamProvider'

const Landing = () => {
  const [isVideoComplete, setIsVideoComplete] = useState(false)

  const { openModal } = useContext(ModalContext)
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

      {isVideoComplete && (
        <img
          src='/Exit_BG.jpg'
          className='absolute inset-0 w-full h-full object-cover backdrop-blur-3xl'
        />
      )}

      {/*Content */}
      {isVideoComplete && (
        <div className='absolute inset-0 flex justify-center '>
          <div>
            <h1>Members of Parliament's Corner</h1>
          </div>

          {/* <div className='entry_content'>
            <p className='bg-red-500'>{teamInfo.short_name}</p>

            <h2>{teamInfo.description}</h2>

            <div>
              <img src={teamInfo.logo} alt='Logo Not Loaded' />
            </div>

            <div className='absolute right-10 bottom-[20vh] flex flex-col space-y-5'>
              <Link to={'/team'}>
                <Button>I'm a Player</Button>
              </Link>
              <Link to={'/login'}>
                <Button variant='secondary'>I'm a Coach</Button>
              </Link>
            </div>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default Landing
