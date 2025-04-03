import { motion } from 'framer-motion'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({
  children,
  className,
  onClick,
  size = 'md',
  variant = 'primary',
  type = 'solid',
  initial,
  animate,
}) => {
  return (
    <motion.button
      className={twMerge(
        `btn-${variant} btn-${size} btn-${type} flex items-center justify-center space-x-2 rounded-lg shadow-md w-fit h-fit cursor-pointer font-medium border-2 border-inherit text-center`,
        className
      )}
      onClick={onClick}
      initial={initial}
      animate={animate}
    >
      {children}
    </motion.button>
  )
}

export default Button
