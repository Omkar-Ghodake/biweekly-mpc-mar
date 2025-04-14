import React, { useContext } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { ModalContext } from '../../context/ModalProvider'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const Modal = ({ children, className, afterClosing }) => {
  const { isModalOpen, closeModal } = useContext(ModalContext)

  return (
    isModalOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='w-screen h-screen p-10 absolute inset-0 bg-black/20 backdrop-blur-xl z-50 flex justify-center items-center'
      >
        <div
          className={twMerge(
            'relative min-h-[70vh] max-h-[95vh] max-w-[60vw] flex justify-center items-center'
          )}
        >
          <div
            className={twMerge(
              'relative min-h-[70vh] max-h-[95vh] min-w-[60vw] m-auto bg-white rounded-md p-5 overflow-y-',
              className
            )}
          >
            {children}

            <RxCross2
              onClick={() => {
                closeModal()
                afterClosing && afterClosing()
              }}
              className='cursor-pointer absolute -top-5 -right-10 border-2 border-white font-bold  text-white p-1 font-bold rounded-full text-2xl hover:bg-white hover:text-black duration-150'
            />
          </div>
        </div>
      </motion.div>
    )
  )
}

export default Modal
