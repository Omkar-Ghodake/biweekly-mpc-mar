import React, { createContext, useState } from 'react'

const ToastContext = createContext()

const ToastProvider = ({ children }) => {
  const [toastState, setToastState] = useState({
    display: false,
    message: null,
    type: 'success',
  })

  const showToast = (message, type = 'success') => {
    setToastState({ display: true, message, type })

    setTimeout(() => {
      setToastState({ display: false, message: null })
    }, 2000)
  }

  return (
    <ToastContext.Provider value={{ toastState, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
export { ToastContext }
