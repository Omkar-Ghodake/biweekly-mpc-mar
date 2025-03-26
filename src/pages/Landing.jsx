import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";
import ModalHead from "../layouts/Modal/ModalHead";
import ModalBody from "../layouts/Modal/ModalBody";
import EntryVideo from "/public/Entry_BG.mp4";
import "../Styles/Landing_Exit.css";
import MpcLogo from "/public/Logo.png";
import { useScroll } from "@react-three/drei";

const Landing = () => {
  const { openModal } = useContext(ModalContext);

  const  {isVideoComplete,setIsVideoComplete} = useState(false);

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
        className="absolute inset-0 w-full h-full object-cover backdrop-blur-3xl"
        autoPlay
      >
        <source src={EntryVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

     {/*Content */}
     <div className="absolute inset-0 flex justify-center ">
        <div className="entry_content">
          
            
              <h1>Members of Parliament's Corner</h1>
              
            <div>
              <img src={MpcLogo} alt="Logo Not Loaded" />
            </div>
            
          
          {/* <h2>Bi-weekly</h2> */}
        </div>
      </div>
     
    </div>
  );
};

export default Landing;
