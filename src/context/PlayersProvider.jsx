import React, { createContext, useEffect, useState } from 'react'

const PlayersContext = createContext()

const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([])

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5500/api/v1/players/get-all-players',
        {
          method: 'GET',
          credentials: 'include', // Ensures authentication cookies are sent
        }
      )

      if (!response.ok) {
        throw new Error("Couldn't fetch players")
      }

      const data = await response.json() // Extract JSON data
      const fetchedPlayers = data.data // Assuming response has { data: [...] }

      setPlayers(fetchedPlayers) // ✅ Correct way to update state with an array

      // ✅ Log the updated state after React updates it
    } catch (error) {
      console.error('Error fetching players:', error)
      alert('Failed to fetch players. Please try again.')
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  return (
    <PlayersContext.Provider value={{ players, fetchPlayers }}>
      {children}
    </PlayersContext.Provider>
  )
}

export default PlayersProvider
