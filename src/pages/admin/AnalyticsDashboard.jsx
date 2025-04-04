import React, { useContext } from 'react'
import { CoachContext } from '../../context/CoachProvider'
import { useNavigate } from 'react-router'
import background from '../../assets/background5.jpg'
import BackButton from '../../components/BackButton'

const AnalyticsDashboard = () => {
  const { isCoachAuthenticated } = useContext(CoachContext)

  const navigate = useNavigate()

  if (!isCoachAuthenticated) return navigate('/admin/login')

  return (
    <div
      className='h-screen flex items-center justify-center bg-cover bg-center transition-all delay-200 tracking-wide'
      // style={{ backgroundImage: `url(${background})` }}
    >
      <div className='absolute left-6 top-6'>
        <BackButton onClick={() => navigate('/admin/dashboard')} />
      </div>

      <iframe
        src='https://app.powerbi.com/view?r=eyJrIjoiMDRlMjdhMzgtOGUwYS00YTRhLWFjYTEtODY2MTg1Y2EzOTAyIiwidCI6ImZlMWQ5NWE5LTRjZTEtNDFhNS04ZWFiLTZkZDQzYWEyNmQ5ZiJ9'
        className='h-screen w-screen'
        // border=''
      ></iframe>
    </div>
  )
}

export default AnalyticsDashboard
