import React, { createContext, useState } from 'react'

const FileExplorerContext = createContext()

// const FILE_SYSTEM = {
//   name: 'root',
//   type: 'folder',
//   children: [
//     {
//       name: 'Documents',
//       type: 'folder',
//       children: [
//         {
//           name: 'Resume.pdf',
//           type: 'file',
//           ext: 'pdf',
//           // url: 'https://manual.calibre-ebook.com/calibre.pdf',
//           // url: '../assets/sample_pdf.pdf',
//           url: 'https://drive.google.com/file/d/1Kjdv3GzyRfc7GvVs7io2AHrON_w0j7hg/view?usp=sharing',
//         },
//         {
//           name: 'New Folder',
//           type: 'folder',
//           children: [
//             { name: 'Project1.txt', type: 'file', ext: 'txt' },
//             { name: 'Project2.txt', type: 'file', ext: 'txt' },
//             { name: 'New Folder 2', type: 'folder' },
//           ],
//         },
//         { name: 'CoverLetter.docx', type: 'file', ext: 'docx' },
//       ],
//     },
//     {
//       name: 'Pictures',
//       type: 'folder',
//       children: [
//         { name: 'Vacation.jpg', type: 'file', ext: 'jpg' },
//         { name: 'Profile.png', type: 'file', ext: 'png' },
//       ],
//     },
//     {
//       name: 'Music',
//       type: 'folder',
//       children: [
//         { name: 'Song1.mp3', type: 'file', ext: 'mp3' },
//         { name: 'Song2.mp3', type: 'file', ext: 'mp3' },
//       ],
//     },
//   ],
// }

const FILE_SYSTEM = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'Individual Contribution',
      type: 'folder',
      children: [
        {
          name: 'Demo PDF',
          type: 'file',
          ext: 'pdf',
          uri: '/sample_pdf.pdf',
        },
        {
          name: 'Demo Excel',
          type: 'file',
          ext: 'xlsx',
          uri: '/ExcelSheet.xlsx',
        },
        { name: 'Individual Contribution 3', type: 'file', ext: 'pdf' },
      ],
    },
    {
      name: 'Personal Task',
      type: 'folder',
      children: [
        { name: 'Individual Contribution 1', type: 'file', ext: 'pdf' },
        { name: 'Manoj.Inbarajan', type: 'folder' },
        { name: 'Individual Contribution 2', type: 'file', ext: 'pdf' },
        { name: 'Individual Contribution 3', type: 'file', ext: 'pdf' },
      ],
    },
    {
      name: 'Website',
      type: 'folder',
      children: [
        { name: 'Individual Contribution 1', type: 'file', ext: 'pdf' },
        { name: 'Individual Contribution 2', type: 'file', ext: 'pdf' },
        { name: 'Individual Contribution 3', type: 'file', ext: 'pdf' },
      ],
    },
  ],
}

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
