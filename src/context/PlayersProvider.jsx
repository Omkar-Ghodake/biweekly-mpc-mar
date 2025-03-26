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

      const json = await response.json()
      const data = json.data

      setPlayers(data)
    } catch (error) {
      console.error('Error fetching players:', error)
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
export { PlayersContext }
