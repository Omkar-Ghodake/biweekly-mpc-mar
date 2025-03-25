import ForgotPassword from '../../components/ForgotPassword';
import { ModalContext } from '../../context/ModalProvider';
import Modal from '../../layouts/Modal/Modal';
import React, { useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from '../../components/Button'

const Login = () => {
  const [domain, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const { openModal, closeModal } = useContext(ModalContext)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!domain || !password) {
      setError('Please enter both domain id and password');
      return;
    }

    if (password.length < 8 || password.length > 20) {
      setError('Password must be between  8-20 characters');
      return;
    }
    if(domain.length < 10){
      setError('Domain Id should be atleast 10 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {

      // const response = await fetch('', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ domain, password }),
      // });

      // const data = await response.json();

      // if (domain.length != 8) {
      //   setError('enter valid domain')
      //   return;
      // }
      if (response.ok) {

        console.log('Login successful', data);
      } else {

        setError(data.message || 'Invalid domain or password');
      }
    } catch (err) {

      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-sky-500 h-screen flex justify-center items-center'>
      <div className='bg-white w-full max-w-lg mx-auto px-12 py-12 rounded-3xl  shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-black mb-6'>Sign In</h1>
        
        <div >

          <div className='flex flex-col'>
            <label className='text-black text-sm font-medium ml-3 mb-2'>Domain Id</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
              placeholder='Enter your domain id'
              type="domain"
              value={domain}
              onChange={handleEmailChange}
            />
          </div>


          <div className='flex flex-col'>
            <label className='text-black text-sm font-medium ml-3 mt-2 mb-2'>Password</label>
            <div className='relative'>
              <input
                className='w-full p-2 border border-gray-300 rounded-2xl bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
                placeholder='Enter your password'
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
              />
              {password != "" &&<button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">

              {isPasswordVisible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}</button>}
            </div>
          </div>
          {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}

          <div className='flex justify-end'>
            <button onClick={openModal} className='text-black my-1 text-sm hover:underline focus:outline-none'>
              Forgot password?
            </button>

            <Modal className="w-[500px] min-h-fit flex justify-center items-center"><ForgotPassword closeModal={closeModal} /></Modal>
          </div>


          <div>

            {<Button onClick={handleSubmit} className={'w-full'} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
