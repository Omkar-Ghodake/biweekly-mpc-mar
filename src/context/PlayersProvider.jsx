import React, { createContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'

const PlayersContext = createContext()

const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([])

  const { data, error, loading, refetch } = useAxios(
    'http://localhost:5500/api/v1/players/get-all-players'
  )

  const updateData = () => {
    // console.log('refetching...')
    refetch()
    // console.log('refetched data:', data)
  }

  useEffect(() => {
    if (data) {
      setPlayers(data)
    } else {
      console.log('Data not found')
    }
  }, [data])

  return (
    <PlayersContext.Provider value={{ players, updateData }}>
      {children}
    </PlayersContext.Provider>
  )
}

export default PlayersProvider
export { PlayersContext }
