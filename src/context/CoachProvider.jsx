import React, { createContext, useState } from 'react'

const CoachContext = createContext()

const CoachProvider = ({ children }) => {
  const [isCoachAuthenticated, setIsCoachAuthenticated] = useState(false)
  const [coach, setCoach] = useState(undefined)

  const login = (token, coachData) => {
    localStorage.setItem('token', token)
    if (coachData.domain_name) {
      setIsCoachAuthenticated(true)
    }

    setCoach(coachData)
  }

  const logout = () => {
    setIsCoachAuthenticated(false)
    setCoach(undefined)
    localStorage.removeItem('token')
  }

  return (
    <CoachContext.Provider
      value={{
        coach,
        isCoachAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </CoachContext.Provider>
  )
}

export default CoachProvider
export { CoachContext }
