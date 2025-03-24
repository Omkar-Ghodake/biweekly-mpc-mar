import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({
  children,
  className,
  onClick,
  size = 'md',
  variant = 'primary',
  type = 'solid',
}) => {
  return (
    <button
      className={twMerge(
        `btn-${variant} btn-${size} btn-${type} flex items-center justify-between space-x-2 rounded-lg shadow-md w-fit h-fit cursor-pointer font-medium duration-150 border-2 border-inherit`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
