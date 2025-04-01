import React from 'react'
import Button from '../Button'

const ForgotPasswordEmail = ({ email, setEmail, setStep,error, handleEmailSubmit}) => {



  return (
    <>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-blue-500 transition-all'
        />
        {/* <button onClick={handleEmailSubmit} className='w-full py-2 mt-7 bg-gradient-to-r bg-blue-500 text-white font-bold rounded-3xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 transform transition-all hover:scale-101 '>
                Send OTP
              </button>  */}
        {error && <div className='text-red-500 text-sm  mt-1 mx-2'>{error}</div>}
        {<Button onClick={() => {
          
          handleEmailSubmit();
          
          setStep(2);
        }} className={'w-full my-2'} >
          Send OTP
        </Button>}
      </div>
    </>
  )
}

export default ForgotPasswordEmail