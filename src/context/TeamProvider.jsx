import React, { createContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'

const TeamContext = createContext(null)

const TeamProvider = ({ children }) => {
  const [teamInfo, setTeamInfo] = useState(null)

  const { data, error, loading, refetch } = useAxios(
    'http://localhost:5500/api/v1/team/getTeam'
  )

  const updateData = () => {
    // console.log('refetching...')
    refetch()
    // console.log('refetched data:', data)
  }

  useEffect(() => {
    if (data) {
      setTeamInfo(data)
    } else {
      console.log('Data not found')
    }
  }, [data])

  return (
    <TeamContext.Provider value={{ teamInfo, setTeamInfo }}>
      {children}
    </TeamContext.Provider>
  )
}

export default TeamProvider
export { TeamContext }
