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
    <div className='h-screen py-20 flex flex-col space-y-5 items-center justify-start w-[70%] mx-auto'>
      <AdminBg />

      <div className='absolute left-6 top-6'>
        <BackButton url={'/admin/dashboard/'} />
      </div>

      {/* <h1 className='z-10 text-5xl flex justify-start text-white px-10 items-center tracking-wide w-full font-medium rounded-xl h-[15%]'>
        Documents
      </h1> */}

      {/* <div className=''>
        <div className='grid grid-cols-3 z-40'>
          {item.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className='rounded-lg p-5 h-fit'
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className='bg-white/30 backdrop-blur-lg rounded-lg w-64 h-44 text-primary flex flex-col justify-center p-5 cursor-pointer shadow-md hover:shadow-xl hover:scale-105 duration-150'
              >
                <span className='text-4xl font-semibold drop-shadow-lg'>
                  {item.title}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div> */}

      <div className='w-full'>
        <CurrentDirectory />
      </div>
    </div>
  )
}

export default Documents
