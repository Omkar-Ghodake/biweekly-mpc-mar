import ForgotPassword from '../../components/ForgotPassword'
import { ModalContext } from '../../context/ModalProvider'
import Modal from '../../layouts/Modal/Modal'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '../../components/Button'
import { CoachContext } from '../../context/CoachProvider'
import { ToastContext } from '../../context/ToastProvider'
import { useNavigate } from 'react-router'
import { LoadingContext } from '../../context/LoadingProvider'

const Login = () => {
  const [domain, setDomain] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // const [loading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { openModal, closeModal } = useContext(ModalContext)
  const { login } = useContext(CoachContext)
  const { showToast } = useContext(ToastContext)
  const { isCoachAuthenticated } = useContext(CoachContext)
  const { isLoading, setIsLoading } = useContext(LoadingContext)

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setDomain(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!domain || !password) {
      showToast('Credentials required', 'error')
      return setError('Please enter both domain id and password')
    }

    if (password.length < 8 || password.length > 20) {
      return setError('Password must be between  8-20 characters')
    }
    if (domain.length < 10) {
      return setError('Domain Id should be atleast 10 characters')
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(
        'http://localhost:5500/api/v1/auth/coach-login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain_name: domain, password }),
        }
      )

      const json = await response.json()

      if (response.ok) {
        showToast(`Welcome coach ${json.data.coach.domain_name}`)
        login(json.data.token, json.data.coach)
      } else {
        setError(json.message || 'Invalid domain or password')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isCoachAuthenticated) {
      navigate('/admin/dashboard')
    }
  }, [isCoachAuthenticated, navigate])

  return (
    <div className="h-screen w-full overflow-auto bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col justify-center items-center py-10 px-6">
      <div className='bg-white w-full max-w-sm mx-auto px-8 py-12 rounded-3xl  shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-black mb-6'>
          Sign In
        </h1>

        <div>
          <div className='flex flex-col'>
            <label className='text-black text-sm font-medium ml-3 mb-2'>
              Domain Id
            </label>
            <input
              className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
              placeholder='Enter your domain id'
              type='domain'
              value={domain}
              onChange={handleEmailChange}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-black text-sm font-medium ml-3 mt-2 mb-2'>
              Password
            </label>
            <div className='relative'>
              <input
                className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
                placeholder='Enter your password'
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
              />
              {password != '' && (
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                >
                  {isPasswordVisible ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              )}
            </div>
          </div>
          {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}

          <div className='flex justify-end'>
            <button
              onClick={openModal}
              className='text-black my-1 text-sm hover:underline focus:outline-none cursor-pointer'
            >
              Forgot password?
            </button>

            <Modal className='w-[500px] min-h-fit flex justify-center items-center'>
              <ForgotPassword closeModal={closeModal} />
            </Modal>
          </div>

          <div>
            {
              <Button
                onClick={handleSubmit}
                className={'w-full'}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
