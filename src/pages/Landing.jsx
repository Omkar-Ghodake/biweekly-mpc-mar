import React, { useContext } from 'react'
import { ModalContext } from '../context/ModalProvider'
import Modal from '../layouts/Modal/Modal'
import ModalHead from '../layouts/Modal/ModalHead'
import ModalBody from '../layouts/Modal/ModalBody'
import EntryVideo from '/public/Entry_BG.mp4';
import '../Styles/Landing_Exit.css';
import MpcLogo from '/public/Logo.png'

const Landing = () => {
  const { openModal } = useContext(ModalContext)

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
     

      <div className="relative w-full h-screen overflow-hidden bg-blur">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        muted
      >
        <source src={EntryVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/*Content */}
      <div className="absolute inset-0 flex justify-center ">
        <div className='entry_content '>
        <h1>MPC</h1>
        <span>
        <img src={MpcLogo} alt="Logo Not Loaded"/>

        </span>
        <h2>Bi-weekly</h2>
        </div>
        
      </div>
    </div>
  )
}

export default Landing
