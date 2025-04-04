import React from 'react'
import background from '../../assets/background5.jpg'

const Documents = () => {
  return (
    <div className='h-screen w-screen'>
      <img
        src={background}
        alt=''
        className='h-screen w-screen brightness-75 -z-10 fixed inset-0 flex justify-center items-center'
      />

      <div className='text-white h-[90vh] w-[70vw] bg-red-500'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
        perferendis accusantium, quos sapiente ipsa corrupti numquam commodi
        earum est velit totam tempore. Dolor fugiat optio molestiae rerum eum
        reiciendis? Odit.
      </div>
    </div>
  )
}

export default Documents
