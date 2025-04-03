import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import background from '../../assets/background5.jpg'
import Input from '../../components/form/Input'
import imgPlaceholder from '../../glb/Blank Profile pic.png'
import { ToastContext } from '../../context/ToastProvider'
import { LoadingContext } from '../../context/LoadingProvider'
import { useNavigate } from 'react-router'
import BackButton from '../../components/BackButton'

const EditCommon = () => {
  const [formData, setFormData] = useState({
    short_name: '',
    long_name: '',
    description: '',
    tag_line: '',
    logo: null,
    display_picture: null,
  })
  const { isLoading, setIsLoading } = useContext(LoadingContext)

  const [preview, setPreview] = useState({
    logo: '',
    display_picture: '',
  })
  const navigate = useNavigate() // Call the hook inside the component
  const toast = useContext(ToastContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file })) // Store file
      const reader = new FileReader()
      reader.onloadend = () =>
        setPreview((prev) => ({ ...prev, [field]: reader.result })) // Show preview
      reader.readAsDataURL(file)
    }
  }

  const fetchTeam = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5500/api/v1/team/getTeam'
      )
      if (response.status === 200) {
        setFormData(response.data?.data)
        setPreview({
          logo: response.data?.data.logo,
          display_picture: response.data?.data.display_picture,
        })
      }
    } catch (error) {
      toast.showToast("Couldn't fetch team Info", 'error')
    }
  }
  useEffect(() => {
    fetchTeam()
  }, [])

  console.log(formData)
  console.log(preview)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value)
      })

      const response = await axios.patch(
        'http://localhost:5500/api/v1/team/updateTeam',
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      if (response.status === 200) toast.showToast('Team updated successfully')
    } catch (error) {
      toast.showToast("Couldn't update team", 'error')
    } finally {
      setIsLoading(false)
      fetchTeam()
    }
  }

  return (
    <div
      className='h-screen flex items-center justify-center bg-cover bg-center  tracking-wide'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='absolute left-6 top-6'>
        <BackButton onClick={() => navigate('/admin/dashboard')} />
      </div>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col'>
        <div className='w-full flex px-4 justify-between text-white bg-[#1E4788] rounded-xl shadow-md p-3'>
          <h2 className='text-xl font-bold'>Team Registration</h2>
        </div>
        <div className='flex h-full justify-center items-center gap-x-10 text-[#1E4788]'>
          {/* Image Uploads */}
          <div className='flex flex-col items-center w-2/5 h-[75%]  space-y-5 mt-5 justify-center'>
            {['logo', 'display_picture'].map((field) => (
              <div
                key={field}
                className='flex-col  bg-white w-[65%] rounded-2xl drop-shadow-xl flex items-center justify-center  py-5'
              >
                <label
                  htmlFor={field}
                  className='cursor-pointer flex items-center justify-center'
                >
                  <img
                    src={preview[field] || imgPlaceholder}
                    alt={field}
                    className={`h-auto object-contain ${
                      field === 'display_picture' ? 'w-[95%]' : 'w-[80%]'
                    }`}
                  />
                 
                </label>
                <input
                  type='file'
                  accept='image/*'
                  id={field}
                  onChange={(e) => handleImageUpload(e, field)}
                  className='hidden'
                />
                <span className='cursor-pointer flex items-center justify-center'>
                  {field.charAt(0).toUpperCase() +
                    field.substring(1, field.length).replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>

          {/* Form Inputs */}
          <div className='w-2/3 p-6'>
            <form onSubmit={handleSubmit} className='space-y-4 w-10/12 '>
              {['short_name', 'long_name', 'tag_line'].map((id) => (
                <Input
                  key={id}
                  label={id
                    .replace('_', ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  isEditing
                  width='w-2/3  text-start'
                />
              ))}
              <div className='flex items-center w-full'>
                <label
                  htmlFor='description'
                  className='font-medium w-1/3 text-[#1E4788]'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  placeholder='Enter your description'
                  className='w-2/3 mx-3 text-start px-2 py-1 rounded-xl border focus:outline-blue-500 max-h-52 min-h-32 p-2 shadow-md'
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full flex justify-center space-x-3'>
                {/* <button
                  type="button"
                  className="w-1/3 p-2 mt-10 bg-[#1E4788] hover:bg-blue-700 hover:cursor-pointer text-white rounded-lg shadow-md  "
                >
                  Reset
                </button> */}
                <button
                  type='submit'
                  className='w-1/3 p-2 mt-10 bg-[#68AA45] hover:bg-green-700 hover:cursor-pointer text-white rounded-lg shadow-md  '
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCommon
