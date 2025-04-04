import React from 'react'
import '../Styles/Landing_Exit.css'

const Exit = () => {
  console.log('secondsecondsecondsecond')

  return (
    <div>
      <div className='relative w-full h-screen overflow-hidden bg-blur'>
        {/* Background Video */}
        <img
          className='absolute inset-0 w-full h-full object-cover'
          src={'/Exit_BG.jpg'}
          alt='..'
        />

        {/* Overlay Content */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='exit_content'>
            <h1>Thank you !</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exit
