import React, { useContext, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from './Button'
import useAxios from '../hooks/useAxios'
import { ToastContext } from '../context/ToastProvider'
import { LoadingContext } from '../context/LoadingProvider'

const ForgotPassword = ({ closeModal }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [actualOTP, setActualOTP] = useState('')
  const [isBlurred, setIsBlurred] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')

  const { showToast } = useContext(ToastContext)
  const { setIsLoading } = useContext(LoadingContext)

  const handleOTPChange = (e, index) => {
    const value = e.target.value

    if (/[^0-9]/.test(value)) {
      return // Allow only numeric characters
    }

    setOtp((prevOtp) => {
      const otpArray = prevOtp.split('')
      otpArray[index] = value
      return otpArray.join('')
    })

    if (index < 5 && value) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }
  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('Text')
    const digits = pastedValue.replace(/\D/g, '').slice(0, 6) // Only get numbers and ensure no more than 6 digits
    setOtp(digits)
  }

  const togglePasswordVisibility1 = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const sendOTP = async (email) => {
    try {
      setIsLoading(true)

      if (!email) {
        setIsLoading(false)
        return setError2('Enter Valid Email')
      }

      const response = await fetch(
        'http://localhost:5500/api/v1/auth/send-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      )

      const json = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setIsBlurred(true)
        setStep(2)
        setIsLoading(false)
        showToast('OTP sent successfully')
      } else {
        if (
          response.status === 401 ||
          response.status === 404 ||
          response.status === 500
        ) {
          setIsLoading(false)
          return setError2(json.message)
        }
      }
    } catch (error) {}
  }

  const verifyOTP = async (otp) => {
    try {
      setIsLoading(true)

      if (!otp) {
        setIsLoading(false)
        return setError1('Enter Valid OTP')
      }

      const response = await fetch(
        'http://localhost:5500/api/v1/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, user_otp: otp }),
        }
      )

      const json = await response.json()

      if (response.ok) {
        setIsLoading(false)
        setStep(3) // Move to password reset step
        showToast('OTP verified successfully')
      } else {
        if (
          response.status === 401 ||
          response.status === 404 ||
          response.status === 500
        ) {
          setIsLoading(false)
          return setError1(json.message)
        }
      }
    } catch (error) {}
  }

  const handleEmailSubmit = async () => {
    await sendOTP(email)
  }

  const handleOTPSubmit = async () => {
    await verifyOTP(otp)
  }

  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      return setError('Enter All Fields')
    }
    if (newPassword !== confirmPassword) {
      return setError('Passwords Do Not Match')
    }
    setError('')

    try {
      setIsLoading(true)

      const response = await fetch(
        'http://localhost:5500/api/v1/coach/update-coach'
      )

      setIsLoading(false)
      closeModal()
    } catch (error) {}
  }

  return (
    <div className='flex justify-center items-center h-[50vh]'>
      <div className='w-96'>
        <h2 className='text-xl mb-4 text-center'>
          {step === 1 && 'Enter Your Email'}
          {step === 2 && 'Enter OTP'}
          {step === 3 && 'Create New Password'}
        </h2>

        {step === 1 && (
          <div>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-blue-500 transition-all'
            />

            {error2 && (
              <div className='text-red-500 text-sm  mt-1 mx-2'>{error2}</div>
            )}
            {
              <Button onClick={handleEmailSubmit} className={'w-full my-2'}>
                Send OTP
              </Button>
            }
          </div>
        )}

        {step === 2 && otpSent && (
          <div>
            <div className='flex justify-center gap-x-4 mb-4'>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type='text'
                  maxLength='1'
                  value={otp[index] || ''}
                  onChange={(e) => handleOTPChange(e, index)}
                  onPaste={handlePaste}
                  className='w-10 h-13  text-center text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 transition-all'
                />
              ))}
            </div>
            {error1 && (
              <div className='text-red-500 text-sm  mt-1 mx-9'>{error1}</div>
            )}
            {
              <Button onClick={handleOTPSubmit} className={'w-full my-2'}>
                Verify OTP
              </Button>
            }
          </div>
        )}

        {step === 3 && (
          <div className='justify-items-centers'>
            <div className='mb-4 mt-4'>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-blue-500 transition-all'
              />
            </div>
            <div className='relative'>
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring focus:ring-blue-500 transition-all'
              />
              {confirmPassword != '' && (
                <button
                  type='button'
                  onClick={togglePasswordVisibility1}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                >
                  {isConfirmPasswordVisible ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              )}
            </div>
            {error && (
              <div className='text-red-500 text-sm  mt-1 mx-2'>{error}</div>
            )}

            {
              <Button onClick={handlePasswordSubmit} className={'w-full mt-5'}>
                Reset Password
              </Button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
