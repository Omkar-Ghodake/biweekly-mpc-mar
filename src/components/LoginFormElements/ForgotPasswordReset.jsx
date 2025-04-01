import React,{useState} from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from '../Button';

const ForgotPasswordReset = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, handlePasswordSubmit,error }) => {
  
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


 

  // const togglePasswordVisibility1 = () => {
  //   setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  // };
  // const togglePasswordVisibility1 = () => {
  //   setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  // };

  return (
    <>
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
        {error && <div className='text-red-500 text-sm  mt-1 mx-2'>{error}</div>}
        {/* <button onClick={handlePasswordSubmit} className='w-full py-2 mt-6 bg-gradient-to-r bg-blue-500 text-white font-bold rounded-3xl shadow-md hover:shadow-lg focus:outline-none focus:ring-1 transform transition-all hover:scale-101 '>
                  Reset Password
                </button> */}

        {<Button onClick={handlePasswordSubmit} className={'w-full mt-5'} >
          Reset Password
        </Button>}
      </div>
    </>
  )
}

export default ForgotPasswordReset