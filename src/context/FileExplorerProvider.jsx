import React, { createContext, useState } from 'react'
import { FILE_SYSTEM } from '../data/Files'

const FileExplorerContext = createContext()

const FileExplorerProvider = ({ children }) => {
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState(['root'])

  const [currentDirectory, setCurrentDirectory] = useState(FILE_SYSTEM)

  const [fileSys, setFileSys] = useState(FILE_SYSTEM)

  const [openedFile, setOpenedFile] = useState([])

  const appendDirectory = (dirName) => {
    setCurrentDirectoryPath([...currentDirectoryPath, dirName])

    const newCurrentDirectory = currentDirectory.children.filter(
      (directory) => directory.name === dirName
    )
    setCurrentDirectory(newCurrentDirectory[0])

    setCurrentDirectoryPath([...currentDirectoryPath, dirName])
    // localStorage.setItem('currentDirectoryPath', currentDirectoryPath)
  }

  const goBack = () => {
    var temp = fileSys

    currentDirectoryPath.forEach((path) => {
      if (path === 'root' || path === currentDirectory.name) return

      if (!temp.children) return

      temp = temp.children.filter((directory) => directory.name === path)[0]
    })

    setCurrentDirectory(temp)
    setCurrentDirectoryPath(currentDirectoryPath.slice(0, -1))
  }

  const goHome = () => {
    setCurrentDirectory(FILE_SYSTEM)
    setCurrentDirectoryPath(['root'])
    // localStorage.setItem('currentDirectoryPath', ['root'])
  }

  const openFile = (file_url, ext) => {
    setOpenedFile([
      {
        uri: file_url,
        fileType: ext,
      },
    ])
  }

  const closeFile = () => setOpenedFile([])

  return (
    <FileExplorerContext.Provider
      value={{
        currentDirectory,
        setCurrentDirectory,
        currentDirectoryPath,
        appendDirectory,
        fileSys,
        setFileSys,
        goBack,
        goHome,
        openedFile,
        openFile,
        closeFile,
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  )
}

export default FileExplorerProvider
export { FileExplorerContext }
