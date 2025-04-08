import { MdArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router'
const BackButton = ({ url }) => {
  return (
    <Link to={url}>
      <button className='px-4 py-2  bg-gradient-to-b from-[#3b7adf] to-[#1E4788]  text-white rounded-lg h-12 z-0 text-nowrap cursor-pointer'>
        <MdArrowBackIosNew />
      </button>
    </Link>
  )
}

export default BackButton
