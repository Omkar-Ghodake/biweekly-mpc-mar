import React ,{useState} from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'


const LoginFields = ({ email, password, setEmail, setPassword, handleSubmit, isPasswordVisible, togglePasswordVisibility, loading, error, setStep }) => {



    const [domain1, setDomain1] = useState('')
    const [password1, setPassword1] = useState('')
    // const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)
    // const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleEmailChange = (e) => {
      setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
    // const togglePasswordVisibility = () => {
    //   setIsPasswordVisible(!isPasswordVisible)
    // }

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
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
          <i
            onClick={togglePasswordVisibility}
            className={`absolute right-3 top-3 text-purple-800 cursor-pointer ${isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'
              }`}
          >
            {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </i>
        </div>

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
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
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
      </form>
    </>



  )
}

export default LoginFields