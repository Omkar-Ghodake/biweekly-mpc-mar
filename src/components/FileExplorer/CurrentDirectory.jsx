import React, { useContext, useEffect } from 'react'
import { FileExplorerContext } from '../../context/FileExplorerProvider'
import Folder from './Folder'
import File from './File'
import { IoMdArrowBack, IoMdHome } from 'react-icons/io'
import { MdChevronRight } from 'react-icons/md'
import { motion } from 'framer-motion'

const CurrentDirectory = () => {
  const { currentDirectory, goBack, goHome, currentDirectoryPath } =
    useContext(FileExplorerContext)

  const setCurrentDirectory = () => {}

  useEffect(() => {
    // console.log('currentDirectory:', currentDirectory)
  }, [currentDirectory])

  return (
    <div className='text-white bg-black/50 backdrop-blur-2xl h-[80vh] rounded-lg p-5'>
      <motion.h1 className='text-2xl font-medium mb-10 flex space-x-5 items-center'>
        <span className='flex items-center space-x-2'>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-xl rounded-full hover:bg-slate-500/30 p-2 border border-white/20 cursor-pointer disabled:cursor-default disabled:text-white/50 disabled:border-white/10 disabled:hover:bg-transparent'
            onClick={goBack}
            disabled={currentDirectory.name === 'root'}
          >
            <IoMdArrowBack />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className='text-xl rounded-full hover:bg-slate-500/30 p-2 border border-white/20 cursor-pointer disabled:cursor-default disabled:text-white/50 disabled:border-white/10 disabled:hover:bg-transparent'
            onClick={goHome}
            disabled={currentDirectory.name === 'root'}
          >
            <IoMdHome />
          </motion.button>
        </span>

        {currentDirectoryPath.map((path) => (
          <motion.span
            key={path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex items-center space-x-2'
          >
            <span>{path}</span>
            <span>
              <MdChevronRight />{' '}
            </span>
          </motion.span>
        ))}
      </motion.h1>

      {currentDirectory?.children ? (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ delay: 0.15 }}
          className='flex items-center space-x-5'
        >
          {currentDirectory.children.map((item) => (
            <li key={item.name} className='w-1/4'>
              {item.type === 'folder' ? (
                <Folder name={item.name} />
              ) : (
                <File name={item.name} ext={item.ext} uri={item.uri} />
              )}
            </li>
          ))}
        </motion.ul>
      ) : (
        <span>Folder is empty</span>
      )}
    </div>
  )
}

export default CurrentDirectory
