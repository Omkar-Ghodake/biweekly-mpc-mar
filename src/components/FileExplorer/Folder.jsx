import React, { useContext } from 'react'
import { FaFolder } from 'react-icons/fa'
import { FileExplorerContext } from '../../context/FileExplorerProvider'

const Folder = ({ name }) => {
  const { appendDirectory } = useContext(FileExplorerContext)

  return (
    <div
      className='flex items-center text-lg space-x-5 bg-[#1B1B1B] hover:bg-[#242424] p-4 rounded-lg cursor-pointer duration-150 w-full h-full'
      onClick={() => appendDirectory(name)}
      title={name}
    >
      <span>
        <FaFolder />
      </span>
      <span>
        {name.substring(0, 12)} {name.length > 12 && '...'}
      </span>
    </div>
  )
}

export default Folder
