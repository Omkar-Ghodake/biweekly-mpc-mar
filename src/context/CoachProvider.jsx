import React, { createContext, useState } from 'react'

const CoachContext = createContext()

const CoachProvider = ({ children }) => {
  const [isCoachAuthenticated, setIsCoachAuthenticated] = useState(false)

  return (
    <CoachContext.Provider
      value={{ isCoachAuthenticated, setIsCoachAuthenticated }}
    >
      {children}
    </CoachContext.Provider>
  )
}

export default CoachProvider
export { CoachContext }
