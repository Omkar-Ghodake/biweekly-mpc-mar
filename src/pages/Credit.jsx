import React from 'react'
import { FaCode, FaPenNib } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { PiDatabaseFill, PiDressFill } from 'react-icons/pi'
import StadiumBack from './StadiumBack'
import { Link } from 'react-router'
import Button from '../components/Button'
import { FaAngleRight } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Credit = () => {
  const number = 11
  // const hexagons = Array.from({ length: number }, (_, index) => index)
  const temp = [
    [
      {
        role: 'DATA Analyst',
        name: ['Anushree Shukla'],
        icon: (
          <svg
            width='50'
            height='50'
            viewBox='0 0 144 140'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M141 137H3'
              stroke='#1E4788'
              strokeWidth='5'
              strokeLinecap='round'
            />
            <path
              d='M14.5 70H37.5V137H14.5V70ZM60.5 3H83.5V137H60.5V3ZM106.5 36.5H129.5V137H106.5V36.5Z'
              stroke='#1E4788'
              strokeWidth='5'
              strokeLinejoin='round'
            />
          </svg>
        ),
      },
      {
        role: 'DATA SCIENTIST',
        icon: <PiDatabaseFill size={55} color='#1E4788' />,
        name: ['Sanjeev Prajapati', 'Sakshi Rai'],
      },

      {
        role: 'Quality Assurance',
        name: ['TEAM MPC'],
        icon: (
          <svg
            width='40'
            height='40'
            viewBox='0 0 137 139'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M137 55.7278C137 86.5044 112.408 111.456 82.074 111.456C68.2254 111.456 55.5704 106.254 45.9108 97.6723L39.2171 104.464L39.2318 114.959L15.5331 139L0 123.24L23.8891 99.0023L33.8014 99.4481L40.7331 92.419C31.9577 82.2717 27.128 69.2274 27.1481 55.7278C27.1481 24.9512 51.7403 0 82.074 0C112.408 0 137 24.9512 137 55.7278ZM129.677 55.7278C129.677 82.4028 108.365 104.025 82.074 104.025C55.7828 104.025 34.4715 82.4028 34.4715 55.7278C34.4715 29.0528 55.7828 7.43037 82.074 7.43037C108.365 7.43037 129.677 29.0528 129.677 55.7278ZM10.3554 123.24L15.5331 128.493L31.901 111.887L31.8973 106.804L26.7819 106.57L10.3554 123.24Z'
              fill='#1E4788'
            />
          </svg>
        ),
      },
    ],
    [
      {
        role: 'Data Retrival',
        name: ['Nikita Suhane'],
        icon: <IoMdSettings size={55} color='#1E4788' />,
      },
      {
        role: 'Product Manager',
        name: ['Manoj Inbarajan', 'Mridul Upadhya'],
        icon: (
          <svg
            width='50'
            height='50'
            viewBox='0 0 141 141'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M105.75 92.5312V101.344H113.452C108.566 108.172 102.118 113.734 94.647 117.567C87.1757 121.399 78.8968 123.39 70.5 123.375C41.3438 123.375 17.625 99.6562 17.625 70.5H8.8125C8.8125 104.516 36.4838 132.188 70.5 132.188C89.6892 132.188 107.398 123.371 118.969 108.636V114.562H127.781V92.5312H105.75Z'
              fill='#1E4788'
            />
            <path
              d='M99.1627 51.2756L72.7736 35.8537C72.1 35.4598 71.3338 35.2518 70.5535 35.251C69.7731 35.2502 69.0065 35.4567 68.3321 35.8493L41.8462 51.2712C41.1801 51.6588 40.6273 52.2144 40.2431 52.8824C39.8588 53.5504 39.6565 54.3076 39.6562 55.0782V85.922C39.6565 86.6926 39.8588 87.4497 40.2431 88.1177C40.6273 88.7858 41.1801 89.3413 41.8462 89.729L68.3321 105.151C68.9874 105.543 69.7365 105.75 70.5 105.75C71.2667 105.75 72.0863 105.552 72.7736 105.146L99.1627 89.7246C99.8264 89.3362 100.377 88.7808 100.76 88.1137C101.142 87.4466 101.344 86.691 101.344 85.922V55.0782C101.344 54.3092 101.142 53.5535 100.76 52.8864C100.377 52.2193 99.8264 51.664 99.1627 51.2756ZM70.5485 44.7544L88.2043 55.0782L70.5485 65.3976L52.8221 55.0782L70.5485 44.7544ZM48.4688 62.7451L66.0938 73.0116V93.6549L48.4688 83.3884V62.7451ZM74.9062 93.699V73.0645L92.5312 62.7627V83.3972L74.9062 93.699Z'
              fill='#1E4788'
            />
            <path
              d='M70.5 8.81256C61.1629 8.79907 51.9454 10.9129 43.5472 14.9937C35.149 19.0744 27.7908 25.0148 22.0312 32.364V26.4376H13.2188V48.4688H35.25V39.6563H27.5479C32.4343 32.8278 38.8817 27.2657 46.353 23.4335C53.8243 19.6012 62.1032 17.6098 70.5 17.6251C99.6562 17.6251 123.375 41.3439 123.375 70.5001H132.188C132.188 36.4838 104.516 8.81256 70.5 8.81256Z'
              fill='#1E4788'
            />
          </svg>
        ),
      },
      {
        role: 'PROJECT manager',
        name: ['Nikita Sonawane'],
        icon: (
          <svg
            width='50'
            height='50'
            viewBox='0 0 138 142'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M55.2 105.661V62.7542L9.2 39.9085V102.734L48.3 122.224L46.0719 131.291L0 108.445V29.628L59.8 0L119.6 29.628V48.904C116.246 49.4275 113.179 50.4984 110.4 52.1166V39.9085L64.4 62.7542V96.5229L55.2 105.661ZM44.9937 17.4912L86.9688 41.3364L104.722 32.4837L59.8 10.1378L44.9937 17.4912ZM59.8 54.8296L77.05 46.2624L35.075 22.4173L14.8781 32.4837L59.8 54.8296ZM123.625 59.8984C125.637 59.8984 127.506 60.2554 129.231 60.9693C130.956 61.6833 132.49 62.659 133.831 63.8964C135.173 65.1339 136.179 66.6332 136.85 68.3942C137.521 70.1552 137.904 72.0352 138 74.0342C138 75.8904 137.641 77.699 136.922 79.46C136.203 81.2211 135.173 82.7679 133.831 84.1006L82.2969 135.289L55.2 142L61.9562 115.085L113.491 63.9678C114.88 62.5876 116.438 61.5643 118.162 60.8979C119.887 60.2316 121.708 59.8984 123.625 59.8984ZM127.291 77.6752C128.297 76.6757 128.8 75.462 128.8 74.0342C128.8 72.5587 128.321 71.3689 127.362 70.4646C126.404 69.5602 125.158 69.0843 123.625 69.0367C122.954 69.0367 122.307 69.1319 121.684 69.3223C121.061 69.5127 120.51 69.8696 120.031 70.3932L70.2937 119.797L67.85 129.435L77.5531 127.008L127.291 77.6752Z'
              fill='#1E4788'
            />
          </svg>
        ),
      },
      {
        role: 'DESIGN UI/GRAPHIC/3D',
        name: ['Anagha Shinde', 'Rishabh Kanaujiya'],
        icon: <FaPenNib size={50} color='#1E4788' />,
      },
    ],
    [
      {
        role: 'Front-end',
        name: ['Bhavya Momaya', 'Dhiraj Kunder', 'Devraj Singh', 'Jaypal Koli'],
        icon: <FaCode size={50} color='#1E4788' />,
      },
      {
        role: 'Full-Stack',
        name: [
          'Rishabh Kanaujiya',
          'Omkar Ghodake',
          'Shubham Joshi',
          'Umakant Patil',
        ],
        icon: <FaCode size={50} color='#1E4788' />,
      },
      {
        role: 'Back-end',
        name: ['Vishnu Menon', 'Avinash Gupta'],
        icon: <FaCode size={50} color='#1E4788' />,
      },
    ],
  ]

  return (
    <>
      {/* <StadiumBack /> */}
      <div className="h-dvh overflow-hidden bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col items-center justify-center ">
        <Link to={'/exit'}>
          <Button
            className={
              'absolute top-6 right-6 z-40 flex items-center space-x-2'
            }
            size='sm'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>Exit</span>
            <FaAngleRight />
          </Button>
        </Link>

        <div className='absolute inset-0 bg-gray-50/90'></div>
        <div className='relative  w-screen  flex flex-col items-center gap-3  overflow-y-scroll [&::-webkit-scrollbar]:hidden uppercase text-bold  text-center'>
          {/* First row: 3 cards in a row */}
          <div className='flex gap-4 font-bold'>
            {temp[0].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className='w-53 h-58 bg-white opacity-90 rounded-lg flex flex-col items-center relative p-4'
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                {/* Role fixed at the top */}
                <span className='absolute top-10 mt-1 text-center w-full font-bold'>
                  {item.role}
                </span>

                <div className='  flex flex-col mt-17  justify-center items-center '>
                  {item.icon}
                </div>

                <span className='text-[12.5px] mt-5 text-center whitespace-pre-line'>
                  {item.name.join('\n')}
                </span>
              </motion.div>
            ))}
          </div>

          <div className='flex gap-3 font-bold -my-13'>
            {temp[1].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                key={index}
                className='w-53 h-58 bg-white opacity-90 rounded-lg flex flex-col items-center relative p-4'
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <span className='absolute top-10 mt-2.5  text-center w-full font-bold'>
                  {item.role}
                </span>

                <div className='  flex flex-col mt-17  justify-center items-center '>
                  {item.icon}
                </div>

                <span className='text-[12.5px] font-bold mt-5 text-center whitespace-pre-line'>
                  {item.name.join('\n')}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Third row: 3 cards in a column */}
          <div className='flex gap-3 font-bold '>
            {temp[2].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                key={index}
                className='w-53 h-58 bg-white opacity-90 rounded-lg flex flex-col items-center relative p-4'
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <span className='absolute top-10 text-center w-full font-bold'>
                  {item.role}
                </span>

                <div className='  flex flex-col mt-14  justify-center items-center '>
                  {item.icon}
                </div>

                <span className='text-[12.5px] mt-2 text-center whitespace-pre-line'>
                  {item.name.join('\n')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Credit
