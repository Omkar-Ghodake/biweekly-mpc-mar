import React, { useContext } from 'react'
import { ErrorContext } from '../context/ErrorProvider'
import Modal from '../layouts/Modal/Modal'

const NetworkErrorModal = () => {
  const { networkError, setNetworkError } = useContext(ErrorContext)

  return (
    !networkError && (
      <div className='networkerror absolute inset-0 z-[1000] bg-white text-black'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
        maxime repudiandae facere earum quae odio reiciendis consequatur
        doloremque, suscipit, fuga ratione distinctio! Dolor consequuntur
        provident molestias ipsum alias itaque obcaecati.
      </div>
    )
  )
}

export default NetworkErrorModal
