import React from 'react'
import Button from '../Button';

const ForgotPasswordOTP = ({ otp, setOtp,error, setStep,handleOTPSubmit }) => {


  const otpArray = [0,1,2,3,4,5]
 
  const handlePaste = ()=>{
    //To do : write code to handle the pasting of otp
  }

  const handleOTPChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      return; // Allow only numeric characters
    }

    setOtp((prevOtp) => {
      const otpArray = prevOtp.split('');
      otpArray[index] = value;
      return otpArray.join('');
    });

    if (index < 5 && value) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  return (
    <>
      <div>
        {/* <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-black transition-all'
                /> */}
        {/* <button onClick={handleOTPSubmit} className='w-full py-2 mt-7 bg-gradient-to-r bg-blue-500 text-white font-bold rounded-3xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 ring-blue-500 transform transition-all hover:scale-101 '>
                  Verify OTP
                </button> */}

        <div className="flex justify-center gap-x-4 mb-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    // value={otp[index] || ''}
                    // onChange={(e) => handleOTPChange(e, index)}
                    onPaste={handlePaste}
                    className="w-10 h-13  text-center text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 transition-all"
                  />
                ))}
        </div>
        {error && <div className='text-red-500 text-sm  mt-1 mx-9'>{error}</div>}
        {<Button onClick={() => {
          
          handleOTPSubmit(otp);
          setStep(3);
        }} className={'w-full my-2'} >
          Verify OTP
        </Button>}
      </div>
    </>
  )
}

export default ForgotPasswordOTP