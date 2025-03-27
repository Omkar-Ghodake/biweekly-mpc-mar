import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../context/ModalProvider'
import Modal from '../layouts/Modal/Modal'
import ModalHead from '../layouts/Modal/ModalHead'
import ModalBody from '../layouts/Modal/ModalBody'
import '../Styles/Landing_Exit.css'
import { useScroll } from '@react-three/drei'
import ballButton from '../assets/Landingpage/BallButton.gif'

const Landing = () => {
  const { openModal } = useContext(ModalContext)

  const [isVideoComplete, setIsVideoComplete] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVideoComplete(true)
    }, 13600)
  }, [isVideoComplete])

  return (
    // <div>
    //   <button onClick={openModal}>Open Modal</button>
    // </div>
    // <Modal>
    //   <ModalHead>Modal Heading</ModalHead>

    //   <ModalBody>
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
    //     nostrum, natus animi beatae culpa doloremque consequuntur reiciendis
    //     quae blanditiis corrupti deleniti repellat veniam quidem sit modi quia
    //     est. Illo, earum!

    //   </ModalBody>
    // </Modal>

    <div className='relative w-full h-screen overflow-hidden bg-blur'>
      {/* Background Video */}
      <video
        className='absolute inset-0 w-full h-full object-cover backdrop-blur-3xl'
        autoPlay
      >
        <source src={'/Entry_BG.mp4'} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/*Content */}
      {isVideoComplete && (
        <div className='absolute inset-0 flex justify-center '>
          <div className='entry_content'>
            <h1>Members of Parliament's Corner</h1>

            <div>
              <img src={'/logo.png'} alt='Logo Not Loaded' />
            </div>
            <h2>Bi-Weekly March 2025</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
              tenetur facere pariatur dolore, molestias praesentium temporibus
              quasi eum aut eaque!
            </p>

            {/* button  */}

            {/* <div className="ballButton" >
          
            <img src={ballButton} alt="Ball button not loaded "/>
            
            <h3>Enter Stadium</h3>
            </div> */}
            {/* <h2>Bi-weekly</h2> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing
