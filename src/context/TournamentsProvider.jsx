import React, { createContext, useState } from 'react'

const TournamentsContext = createContext()

const TournamentsProvider = () => {
  const [tournaments, setTournaments] = useState([])

  const fetchTournaments = async () => {
    try {
      const response = await fetch(
        'http://localhost:5500/api/v1/tournaments/get-all-tournaments',
        {
          method: 'GET',
          credentials: 'include', // Ensures authentication cookies are sent
        }
      )
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments')
      }
      const data = await response.json()
      setTournaments(data)
    } catch (error) {
      console.error('Error fetching tournaments:', error)
    }
  }

  return (
    <TournamentsContext.Provider value={{ tournaments, fetchTournaments }}>
      {children}
    </TournamentsContext.Provider>
  )
}

export default TournamentsProvider
