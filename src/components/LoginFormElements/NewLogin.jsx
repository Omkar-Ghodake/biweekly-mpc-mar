import ForgotPassword from '../../components/ForgotPassword'
import { ModalContext } from '../../context/ModalProvider'
import Modal from '../../layouts/Modal/Modal'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '../../components/Button'
import { CoachContext } from '../../context/CoachProvider'
import { ToastContext } from '../../context/ToastProvider'
import { useNavigate } from 'react-router'
import background from '../../assets/background.jpg'
import ForgotPasswordEmail from '../../components/LoginFormElements/ForgotPasswordEmail'
import ForgotPasswordOTP from '../../components/LoginFormElements/ForgotPasswordOTP'
import ForgotPasswordReset from '../../components/LoginFormElements/ForgotPasswordReset'
import LoginFields from '../../components/LoginFormElements/LoginFields'

const sendOTP = (email) => {
  console.log(`Sending OTP to: ${email}`);
  return true;
};

const verifyOTP = (enteredOTP, actualOTP) => {
  return enteredOTP === actualOTP;
};

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [step, setStep] = useState(0);
  const [actualOTP, setActualOTP] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [otpSent,setOtpSent] = useState(false);
  const { openModal, closeModal } = useContext(ModalContext)
  const { login } = useContext(CoachContext)
  const { showToast } = useContext(ToastContext)
  const { isCoachAuthenticated } = useContext(CoachContext)

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleForgotPassword = (e) => {
    setStep(1);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      showToast('Credentials required', 'error')
      setError('Please enter both email id and password')
      return
    }

    if (password.length < 8 || password.length > 20) {
      setError('Password must be between  8-20 characters')
      return
    }
    if (email.length < 10) {
      setError('Email Id should be atleast 10 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'http://localhost:5500/api/v1/auth/coach-login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain_name: email, password }),
        }
      )

      const json = await response.json()

      if (response.ok) {
        showToast(`Welcome coach ${json.data.coach.domain_name}`)
        login(json.data.token, json.data.coach)
      } else {
        setError(json.message || 'Invalid email or password')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isCoachAuthenticated) {
      navigate('/admin/dashboard')
    }
  }, [isCoachAuthenticated, navigate])

  const handleEmailSubmit = () => {
    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP
    setActualOTP(otpGenerated);
    if(!email){
      return setError('Enter Valid Email');
    }
    if (sendOTP(email)) {
      setOtpSent(true);
      setIsBlurred(true);
      setStep(2);
    }
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
  const handleOTPSubmit = () => {
    // if(!otp){
    //   return setError('Enter Valid OTP');
    // }
    // if (verifyOTP(otp, actualOTP)) {
    setStep(3); // Move to password reset step
    // } else {
    //   alert('Invalid OTP. Please try again.');
    // }
  };
  const handlePasswordSubmit = () => {

    if (!newPassword || !confirmPassword) {
      return setError('Enter All Fields');
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords Do Not Match');
      return;
    }
    setError('');
    alert('Password Reset Successfully!');
    
  };

  return (

    <div
      className="h-screen flex items-center justify-center">
      <img
        src={background}
        alt=''
        className='fixed inset-0 h-screen w-screen brightness-75 z-0'
      />
      <div className="flex justify-between rounded-lg items-center h-[70vh] w-[80%] min-h-screen px-10 z-10">
        <div className="bg-sky-500 p-10 w-full h-full flex items-center justify-center rounded-l-lg">
          <span className="text-white text-2xl font-bold">Hello</span>
        </div>

        <div className="bg-white  p-10 shadow-lg w-full max-w-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            {step === 0 && 'Login'}
            {step === 1 && 'Enter Your Email'}
            {step === 2 && 'Enter OTP'}
            {step === 3 && 'Create New Password'}
          </h2>

          {step === 0 && (<LoginFields
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              loading={loading}
              error={error}
              setStep={setStep} 
            />)}





          {step === 1 && (<ForgotPasswordEmail
              email={email}
              setEmail={setEmail}
              error={error}
              handleEmailSubmit={handleEmailSubmit}
              setStep={setStep}
            />)}

          {step === 2 && !otpSent && (<ForgotPasswordOTP
          handleOTPSubmit={handleOTPSubmit}
          error={error}
          setStep={setStep}
          />)}

          {step === 3 && (<ForgotPasswordReset
          error = {error}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handlePasswordSubmit={handlePasswordSubmit}
  />)}



        </div>
      </div>
    </div>
  )
};

export default Login
