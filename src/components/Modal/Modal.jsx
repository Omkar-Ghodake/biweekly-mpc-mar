import React, { useContext } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { ModalContext } from '../../context/ModalProvider'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const Modal = ({ children, className }) => {
  const { isModalOpen, closeModal } = useContext(ModalContext)

  return (
    isModalOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='w-screen h-screen absolute inset-0 bg-black/10 backdrop-blur-sm z-50 flex justify-center items-center'
      >
        <div
          className={twMerge(
            'w-1/2 m-auto bg-white min-h-[70vh] rounded-md p-5 relative',
            className
          )}
        >
          {children}

          <RxCross2
            onClick={closeModal}
            className='cursor-pointer absolute -top-10 -right-10 text-2xl hover:text-black/50 duration-150'
          />
        </div>
      </motion.div>
    )
  )
}

export default Modal
