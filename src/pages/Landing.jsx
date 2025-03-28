import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";
import ModalHead from "../layouts/Modal/ModalHead";
import ModalBody from "../layouts/Modal/ModalBody";
import "../Styles/Landing_Exit.css";
import { useScroll } from "@react-three/drei";
import Button from "../components/Button";
import { Link } from "react-router";
import { LuSkipForward } from "react-icons/lu";

const Landing = () => {
  const { openModal } = useContext(ModalContext);
  const [isVideoComplete, setIsVideoComplete] = useState(false);

  const skipVideo = () => {
    setIsVideoComplete(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVideoComplete(true);
    }, 13600);
  }, [setIsVideoComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-blur">

      {/* this button is for skipping the video to the end  */}
      {isVideoComplete && (
        <div className="absolute w-full flex justify-end top-5 right-5 z-20 ">
          <Button variant="outline" className = "bg-black text-white border border-white-300 hover:bg-white hover:text-black" onClick={skipVideo}>
            <LuSkipForward/>
          </Button>
        </div>
      )}


      {/* Background Video */}
      {!isVideoComplete && (
        <video
          className="absolute inset-0 w-full h-full object-cover backdrop-blur-3xl"
          autoPlay
        >
          <source src={"/Entry_BG.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {isVideoComplete && (
        <img
          src="/Exit_BG.jpg"
          className="absolute inset-0 w-full h-full object-cover backdrop-blur-3xl"
        />
      )}

      {/*Content */}
      {isVideoComplete && (
        <div className="absolute inset-0 flex justify-center ">
          <div className="entry_content">
            <h1>Members of Parliament's Corner</h1>

            <div>
              <img src={"/logo.png"} alt="Logo Not Loaded" />
            </div>
            <h2>Bi-Weekly March 2025</h2>

            {/* button  */}

            {/* <div className="ballButton" >
          
            <img src={ballButton} alt="Ball button not loaded "/>
            
            <h3>Enter Stadium</h3>
            </div> */}
            {/* <h2>Bi-weekly</h2> */}

            <div className="absolute right-10 bottom-[20vh] flex flex-col space-y-5">
              <Link to={"/team"}>
                <Button>I'm a Player</Button>
              </Link>
              <Link to={"/login"}>
                <Button variant="secondary">I'm a Coach</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Landing;
