import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const CoachContext = createContext()

const CoachProvider = ({ children }) => {
  const [isCoachAuthenticated, setIsCoachAuthenticated] = useState(false)
  const [coach, setCoach] = useState(null)
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('token') || null
  )

  const navigate = useNavigate()

  const login = (token, coachData) => {
    localStorage.setItem('token', token)
    setAuthToken(token)

    if (coachData?.domain_name) {
      setIsCoachAuthenticated(true)
    }

    setCoach(coachData)
  }

  const checkForSession = async () => {
    if (!authToken) {
      setIsCoachAuthenticated(false)
      setCoach(null)
    }

    try {
      const response = await fetch(
        'http://localhost:5500/api/v1/coach/get-coach',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken }),
        }
      )

      if (response.ok) {
        const json = await response.json()
        setIsCoachAuthenticated(true)
        setCoach(json.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsCoachAuthenticated(false)
    setAuthToken(null)
    setCoach(undefined)
    navigate('/login')
  }

  useEffect(() => {
    checkForSession()
  }, [localStorage.getItem('token'), isCoachAuthenticated])

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
