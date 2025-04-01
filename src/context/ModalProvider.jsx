import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const location = useLocation()

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    setIsModalOpen(false)
  }, [location])

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
export { ModalContext }
