import React from 'react'
import { twMerge } from 'tailwind-merge'

const ModalHead = ({ children, className }) => {
  return <div className={twMerge('w-full text-2xl font-semibold mb-5', className)}>{children}</div>
}

export default ModalHead
