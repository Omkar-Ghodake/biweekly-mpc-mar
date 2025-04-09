import React, { useState } from 'react'
import background from '../../assets/background5.jpg'
import { FaFile, FaFolder } from 'react-icons/fa'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import AdminBg from '../../components/AdminBg'
import BackButton from '../../components/BackButton'
import Folder from '../../components/FileExplorer/Folder'
import CurrentDirectory from '../../components/FileExplorer/CurrentDirectory'

const Documents = () => {
  const item = [
    {
      title: 'Individual Contribution',
      href: '/admin/dashboard/documents/individual-contribution',
    },
    {
      title: 'Personal Task',
      href: '/admin/dashboard/documents/personal-task',
    },
    {
      title: 'Product Docs',
      href: '/admin/dashboard/documents/product-docs',
    },
  ]

  return (
    <div className='h-screen py-20 flex flex-col space-y-5 items-center justify-start w-[70vw] mx-auto'>
      <AdminBg />

      <div className='absolute left-6 top-6'>
        <BackButton url={'/admin/dashboard/'} />
      </div>

      <div className='h-[85vh] w-full overflow-hidden text-white'>
        <CurrentDirectory />
      </div>
    </div>
  )
}

export default Documents
