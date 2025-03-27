import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const TournamentsContext = createContext()

const TournamentsProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([])

  const fetchTournaments = async () => {
    try {
      const response = await axios(
        'http://localhost:5500/api/v1/tournaments/get-all-tournaments'
      )
      if (!response) {
        throw new Error('Failed to fetch tournaments')
      }
      
      setTournaments(response.data.data) 
    } catch (error) {
      console.error('Error fetching tournaments:', error)
    }
  }

  useEffect(() => {
    fetchTournaments()
  }, [])
  

  return (
    <TournamentsContext.Provider value={{ tournaments, fetchTournaments }}>
      {children}
    </TournamentsContext.Provider>
  )
}

export default TournamentsProvider
export { TournamentsContext }
