import React from 'react'
import { twMerge } from 'tailwind-merge'

const ModalBody = ({ children, className }) => {
  return <div className={twMerge('', className)}>{children}</div>
}

export default ModalBody
