import React from 'react'
import ExitVideo from '/public/Exit_BG.mp4';
import '../Styles/Landing_Exit.css';


const Exit = () => {
  return <div>

    <div className="relative w-full h-screen overflow-hidden bg-blur">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            autoPlay
            muted
          >
            <source src={ExitVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex mt-40 justify-center ">
            <div className='exit_content text-center'>
            <h1>Thank you</h1>
            </div>
            
          </div>
        </div>
  </div>
}

export default Exit
