import React from 'react'

const Login = () => {
  return (
    <div className='bg-sky-500 h-screen flex justify-center items-center'>
      <div className='bg-white w-full max-w-sm mx-auto px-8 py-12 rounded-3xl  shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-black mb-6'>Sign In</h1>

        <div >

          <div className='flex flex-col'>
            <label className='text-black text-sm font-medium mb-2'>Email</label>
            <input
              className='w-full p-3 border-2 border-gray-300 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
              placeholder='Enter your email'
              type="email"
            />
          </div>


          <div className='flex flex-col'>
            <label className='text-black text-sm font-medium mb-2'>Password</label>
            <input
              className='w-full p-3 border-2 border-gray-300 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
              placeholder='Enter your password'
              type="password"
            />
          </div>


          <div className='flex justify-end'>
            <button className='text-black text-sm hover:underline focus:outline-none'>
              Forgot password?
            </button>
          </div>


          <div>
            <button className='w-full py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 transform transition-all hover:scale-105'>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
