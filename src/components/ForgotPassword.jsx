import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from './Button';

const sendOTP = (email) => {
  console.log(`Sending OTP to: ${email}`);
  return true;
};

const verifyOTP = (enteredOTP, actualOTP) => {
  return enteredOTP === actualOTP;
};

const ForgotPassword = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [actualOTP, setActualOTP] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = () => {
    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP
    setActualOTP(otpGenerated);
    if (sendOTP(email)) {
      setOtpSent(true);
      setIsBlurred(true);
      setStep(2);
    }
  };


  const handleOTPSubmit = () => {
    // if (verifyOTP(otp, actualOTP)) {
    setStep(3); // Move to password reset step
    // } else {
    //   alert('Invalid OTP. Please try again.');
    // }
  };

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
  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('Text');
    const digits = pastedValue.replace(/\D/g, '').slice(0, 6); // Only get numbers and ensure no more than 6 digits
    setOtp(digits);
  };


  const handlePasswordSubmit = () => {

    if (!newPassword || !confirmPassword) {
      return setError('Enter all fields');
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    alert('Password reset successfully!');
    closeModal()
  };



  const togglePasswordVisibility1 = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };


  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="w-96">
        <h2 className="text-xl mb-4 text-center">
          {step === 1 && 'Enter Your Email'}
          {step === 2 && 'Enter OTP'}
          {step === 3 && 'Create New Password'}
        </h2>

        {step === 1 && (
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
            {<Button onClick={handleEmailSubmit} className={'w-full my-2'} >
              Send OTP
            </Button>}
          </div>
        )}

        {step === 2 && otpSent && (
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
                    value={otp[index] || ''}
                    onChange={(e) => handleOTPChange(e, index)}
                    onPaste={handlePaste}
                    className="w-10 h-13  text-center text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 transition-all"
                  />
                ))}
              </div>

              {<Button onClick={handleOTPSubmit} className={'w-full my-2'} >
                Verify OTP
              </Button>}
            </div>
        )}

            {step === 3 && (
              <div className='justify-items-centers'>
                <div className='mb-4 mt-4'>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-blue-500 transition-all'
                  />

                </div>
                <div className='relative'>
                  <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-blue-500 transition-all'
                  />
                  {confirmPassword != "" && <button
                    type="button"
                    onClick={togglePasswordVisibility1}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">

                    {isConfirmPasswordVisible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>}
                </div>
                {error && <div className='text-red-500 text-sm  mt-1'>{error}</div>}
                {/* <button onClick={handlePasswordSubmit} className='w-full py-2 mt-6 bg-gradient-to-r bg-blue-500 text-white font-bold rounded-3xl shadow-md hover:shadow-lg focus:outline-none focus:ring-1 transform transition-all hover:scale-101 '>
              Reset Password
            </button> */}

                {<Button onClick={handlePasswordSubmit} className={'w-full mt-5'} >
                  Reset Password
                </Button>}
              </div>
            )}
          </div>
    </div>
      );
};

      export default ForgotPassword;
