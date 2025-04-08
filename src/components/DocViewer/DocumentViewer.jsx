import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FileExplorerContext } from '../../context/FileExplorerProvider'
import { RxCross2 } from 'react-icons/rx'
import PDFViewer from './PDFViewer'
import SpreadsheetViewer from './SpreadsheetViewer'

export default function DocumentViewer() {
  // const docs = [
  //   {
  //     uri: '/file-sample_100kB.docx',
  //     fileType: 'docx',
  //     // fileName: 'Sample Word Document',
  //   },
  // ]

  const { openedFile, closeFile } = useContext(FileExplorerContext)

  return (
    openedFile.length > 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='z-50 absolute inset-0 flex justify-center h-screen w-screen items-center bg-black/30 backdrop-blur-lg'
      >
        {/* <h2>Word Document Viewer (.docx)</h2> */}
        <div className='relative h-[90vh] w-[50vw] bg-white'>
          <div className='h-[90vh] w-[50vw] absolute inset-0 overflow-y-auto'>
            {openedFile[0].fileType === 'pdf' && (
              <PDFViewer openedFile={openedFile} />
            )}
            {openedFile[0].fileType.includes('xls') && (
              <SpreadsheetViewer openedFile={openedFile} />
            )}
          </div>

          <span
            onClick={closeFile}
            className='cursor-pointer absolute top-2 right-5 p-1 text-base text-black hover:underline duration-150 z-50'
          >
            Close
          </span>
        </div>
      </motion.div>
    )
  )
}
