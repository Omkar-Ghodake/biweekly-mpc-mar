
import React, { useContext, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '../../components/Button'
import { CoachContext } from '../../context/CoachProvider'
import { ToastContext } from '../../context/ToastProvider'
import { useNavigate } from 'react-router'
import { LoadingContext } from '../../context/LoadingProvider'
import background from '../../assets/background.jpg'




const Login = () => {
    const [domain, setDomain] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    //const [loading, setIsLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)


    const { login } = useContext(CoachContext)
    const { showToast } = useContext(ToastContext)
    const { isCoachAuthenticated } = useContext(CoachContext)
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [error3, setError3] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [actualOTP, setActualOTP] = useState('')
    const [isBlurred, setIsBlurred] = useState(false)

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false)
    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')




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
    //forgot
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
        } catch (error) { }
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
        } catch (error) { }
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
                'http://localhost:5500/api/v1/coach/reset-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        newPassword,
                    }),
                }
            )

            const json = await response.json()

            if (response.ok) {
                setIsLoading(false)
                showToast(json.message)
                navigate('/login')
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

            setIsLoading(false)

        } catch (error) { }
    }

    return (
        <>
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

                        {step === 0 && (<form>
                            <div className="mb-4">
                                <input
                                    type="domain"
                                    placeholder="Domain Id"
                                    value={domain}
                                    onChange={handleEmailChange}
                                    className="w-full px-4 py-2 rounded-lg bg-purple-200 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <div className="mb-4 relative">
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 rounded-lg bg-purple-200 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                            {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}
                            <div className="mb-4 text-right">
                                <button

                                    className="text-purple-800 hover:underline"
                                    onClick={() => setStep(1)}
                                >
                                    Forgot Password?
                                </button>


                            </div>
                            <div className="mb-4">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Login'}
                                </button>
                            </div>

                            <div className="flex items-center justify-center mb-4">
                                <span className="text-purple-800">Or Login with</span>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-full bg-purple-200 text-purple-800 py-2 rounded-lg flex items-center justify-center hover:bg-purple-300"
                                >
                                    <img
                                        src="https://storage.googleapis.com/a1aa/image/63S9DpZ_r5gRKQOHEo_CGzeTG7mvCGqHEEYY2Xlvkuk.jpg"
                                        alt="Google logo"
                                        className="mr-2"
                                        width="20"
                                        height="20"
                                    />
                                    Google
                                </button>
                            </div>
                        </form>)}





                        {step === 1 && (<div>
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
                                <Button onClick={() => {
                                    handleEmailSubmit();
                                    // setStep(2);
                                }} className={'w-full my-2'}>
                                    Send OTP
                                </Button>
                            }
                        </div>)}

                        {step === 2 && otpSent && (
                            <div>
                                <div className='flex justify-center gap-x-4 mb-4'>
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type='text'
                                            maxLength='1'
                                            // value={otp[index] || ''}
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
                                    <Button onClick={() => {
                                        handleOTPSubmit();
                                        // setStep(3);
                                    }
                                    } className={'w-full my-2'}>
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
                                {error3 && (
                                    <div className='text-red-500 text-sm  mt-1 mx-2'>{error3}</div>
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
            </div>

        </>
    )
}

export default Login