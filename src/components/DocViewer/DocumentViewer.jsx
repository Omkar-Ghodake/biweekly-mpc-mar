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
        <div className='relative h-[90vh] w-[80vw] bg-white'>
          <div className='h-[90vh] w-[80vw] absolute inset-0 overflow-y-auto'>
            {openedFile[0].fileType === 'pdf' && (
              <PDFViewer openedFile={openedFile} />
            )}
            {openedFile[0].fileType.includes('xls') && (
              <SpreadsheetViewer openedFile={openedFile} />
            )}
          </div>

          <span className='absolute top-2 right-5 text-base text-black bg-white duration-150 z-50 w-1/2 text-end flex items-center justify-end space-x-1'>
            <span
              className='flex items-center space-x-1 w-fit cursor-pointer hover:text-red-500'
              onClick={closeFile}
            >
              <span>Close</span>
              <RxCross2 />
            </span>
          </span>
        </div>
      </motion.div>
    )
  )
}
