import React, { useContext } from 'react'
import Button from '../components/Button'
import { TournamentsContext } from '../context/TournamentsProvider'
import { PlayersContext } from '../context/PlayersProvider'

const Temp = () => {
  const { players } = useContext(PlayersContext)

  return (
    <div className='h-screen w-screen flex space-x-5  items-center justify-center'>
      {players?.map((elem) => (
        <div>{elem?.domain_name}</div>
      ))}
    </div>
  )
}

export default Temp
