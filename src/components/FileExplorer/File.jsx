import React, { useContext } from 'react'
import {
  BsFiletypePdf,
  BsFiletypeXls,
  BsFiletypeXlsx,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeTxt,
} from 'react-icons/bs'
import { FileExplorerContext } from '../../context/FileExplorerProvider'

const File = ({ name, ext, uri }) => {
  const ICONS = {
    pdf: <BsFiletypePdf />,
    xls: <BsFiletypeXls />,
    xlsx: <BsFiletypeXlsx />,
    doc: <BsFiletypeDoc />,
    docx: <BsFiletypeDocx />,
    txt: <BsFiletypeTxt />,
  }

  const { openFile } = useContext(FileExplorerContext)

  return (
    <div
      className='flex items-center text-lg space-x-5 bg-[#1B1B1B] hover:bg-[#242424] p-4 rounded-lg cursor-pointer duration-150 w-full h-full'
      onClick={() => openFile(uri, ext)}
      title={name}
    >
      <span>{ICONS[ext] || ''}</span>
      {name ? (
        <span>
          {name?.substring(0, 14)} {name?.length > 14 && '...'}
        </span>
      ) : (
        <span>Unnamed</span>
      )}
    </div>
  )
}

export default File
