import React, { useState, useContext, useEffect } from 'react'
import background from '../../assets/background5.jpg'
import imgPlaceholder from '../../glb/Blank Profile pic.png'
import { CoachContext } from '../../context/CoachProvider'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import axios from 'axios'
import { ToastContext } from '../../context/ToastProvider'
import { useNavigate } from 'react-router'
import BackButton from '../../components/BackButton'
import { LoadingContext } from '../../context/LoadingProvider'
import Modal from '../../layouts/Modal/Modal'
import { ModalContext } from '../../context/ModalProvider'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function CoachForm() {
  const coach = useContext(CoachContext)
  const coachData = coach.coach
  const navigate = useNavigate()
  const { setIsLoading } = useContext(LoadingContext)

  const [formData, setFormData] = useState({
    name: '',
    domain_name: '',
    emp_id: '',
    image: '',
    description: '',
    gender: '',
  })
  const [image, setImage] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const toast = useContext(ToastContext)
  const [authToken, setAuthToken] = useState('')
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [changePassErr, setChangePassErr] = useState('')
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const { isCoachAuthenticated } = useContext(CoachContext)
  const { openModal, closeModal } = useContext(ModalContext)

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'))
    if (coachData) {
      setFormData((prev) => ({ ...prev, ...coachData }))
      setImage(coachData.image || '')
    }
  }, [coachData, isCoachAuthenticated])

  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (name === 'emp_id' && value.length > 10) return // Prevent input longer than 10 digits

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? Number(value) : value, // Ensure numbers are stored correctly
    }))
  }

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const handleSubmitChangePass = async (e) => {
    setChangePassErr('')

    e.preventDefault()

    if (passwords.newPassword !== passwords.confirmPassword) {
      return setChangePassErr('Passwords do not match')
    }

    const changePassData = new FormData()
    changePassData.append('currentPassword', passwords.currentPassword)
    changePassData.append('newPassword', passwords.newPassword)
    changePassData.append('authToken', authToken)

    // for (var pair of changePassData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    setIsLoading(true)
    try {
      const response = await axios.patch(
        'http://localhost:5500/api/v1/coach/change-password',
        changePassData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      toast.showToast('Coach updated successfully')
      setChangePassErr('')
      closeModal()
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      e.target.reset()
    } catch (error) {
      // toast.showToast(error.response.data.message, 'error')
      setChangePassErr(error.response.data.message)
      // console.log('error:', error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(',')
    let mime = arr[0].match(/:(.*?);/)[1] // Extract MIME type
    let bstr = atob(arr[1]) // Decode Base64
    let n = bstr.length
    let u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    const file = new File([u8arr], fileName, { type: mime })

    setFormData((prevData) => ({
      ...prevData,
      image: file, // ✅ Store file in formData
    }))
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result) // For preview
        convertBase64ToFile(reader.result, file.name) // Converts and sets image
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const coachInfo = new FormData()
    coachInfo.append('name', formData.name)
    coachInfo.append('domain_name', formData.domain_name)
    coachInfo.append('email', formData.email)
    coachInfo.append('emp_id', formData.emp_id)
    coachInfo.append('description', formData.description)
    coachInfo.append('gender', formData.gender)
    coachInfo.append('authToken', authToken)

    coachInfo.append('image', formData.image || 'image')

    if (!coachInfo.image) {
      toast.showToast('Image is Required', 'error')
    }

    setIsLoading(true)
    try {
      const response = await axios.patch(
        'http://localhost:5500/api/v1/coach/update-coach',
        coachInfo
      )
      toast.showToast('Coach updated successfully')
    } catch (error) {
      toast.showToast('Unable to update Coach', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isCoachAuthenticated) return navigate('/admin/login')

  return (
    <div
      className='h-screen flex items-center justify-center bg-cover bg-center transition-all delay-200  tracking-wide text-[#1E4788]'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='absolute left-6 top-6'>
        <BackButton url={'/admin/dashboard'} />
      </div>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-xl p-6 flex flex-col'>
        {/* Header Section */}
        <div className='w-full flex px-4 justify-between text-white bg-[#1E4788] rounded-xl shadow-md p-3'>
          <h2 className='text-xl font-bold'>Coach Profile</h2>
        </div>

        <div className='flex h-full'>
          {/* Image Upload Section */}
          <div className='flex flex-col justify-center items-center h-[30rem] w-1/3'>
            <div className='h-2/3 flex flex-col justify-center items-center space-y-5'>
              <div className='flex justify-center bg-white items-center -mt-10 h-[35vh] w-[35vh] rounded-2xl drop-shadow-2xl relative'>
                <img
                  src={image || imgPlaceholder}
                  alt='Profile'
                  className={`${image ? 'h-11/12' : 'h-[60%]'}`}
                />
              </div>

              {isEditing && (
                <span className='text-center bg-[#1E4788] hover:bg-[#1e3388] text-white text-xs px-2 py-1 rounded cursor-pointer'>
                  <label
                    htmlFor='imageUpload'
                    className={`${
                      isEditing ? 'cursor-pointer ' : 'cursor-default'
                    } flex justify-center `}
                  >
                    Upload an Image
                  </label>

                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                    id='imageUpload'
                    disabled={!isEditing}
                  />
                </span>
              )}
            </div>
          </div>

          {/* Form Fields Section */}
          <div className='w-2/3 p-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {[
                {
                  label: 'Name',
                  name: 'name',
                  type: 'text',
                  maxLength: 20,
                  disabled: true,
                },
                {
                  label: 'Domain Name',
                  name: 'domain_name',
                  type: 'text',
                  maxLength: 20,
                  disabled: true,
                },
                {
                  label: 'Email',
                  name: 'email',
                  type: 'email',
                  disabled: true,
                },
                {
                  label: 'Employee ID',
                  name: 'emp_id',
                  type: 'number',
                  max: 99999999,
                  disabled: true,
                },
              ].map((field) => (
                <div key={field.name} className='flex items-center w-full'>
                  <label
                    htmlFor={field.name}
                    className='font-medium w-1/3 text-[#1E4788]'
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required
                    maxLength={field.maxLength}
                    max={field.max}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`ml-5 w-full p-2 rounded-xl transition-all duration-200 border shadow-md ${
                      isEditing
                        ? 'focus:outline-[#1E4788]'
                        : 'bg-gray-100 cursor-default outline-none border-transparent'
                    }`}
                    readOnly={!isEditing}
                  />
                </div>
              ))}

              {/* Description Field */}
              <div className='flex items-center w-full'>
                <label
                  htmlFor='description'
                  className='font-medium w-1/3 text-[#1E4788]'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  placeholder='Enter description'
                  className={`ml-5 w-full max-h-32 min-h-32 p-2 rounded-xl shadow-md ${
                    isEditing
                      ? 'focus:outline-[#1E4788] border'
                      : 'bg-gray-100 cursor-default outline-none'
                  }`}
                  value={formData.description}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></textarea>
              </div>

              {/* Gender Selection */}
              <div className='flex items-center w-full'>
                <label
                  htmlFor='gender'
                  className='font-medium w-1/3 text-[#1E4788]'
                >
                  Gender
                </label>
                <select
                  id='gender'
                  name='gender'
                  required
                  className='ml-5 w-full p-2 rounded-xl border shadow-md focus:outline-[#1E4788] disabled:border-transparent disabled:bg-gray-100'
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className='w-full  p-2 flex justify-center space-x-5 rounded-b-2xl'>
                {/* Edit Button */}
                {/* <button
                  type="button"
                  className="w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="flex items-center justify-center gap-4">
                    <FaRegEdit />
                    <span>Edit</span>
                  </div>
                </button> */}

                {/* Save/Update Button */}
                <button
                  type='submit'
                  className='flex items-center gap-4 w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md bg-[#68AA45] hover:bg-green-700 hover:cursor-pointer'
                  onClick={() => setIsEditing(false)}
                >
                  <FaRegSave />
                  Save
                </button>

                <button
                  type='button'
                  className={`w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md hover:cursor-pointer ${
                    isEditing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-sky-700 hover:bg-sky-800 hover:cursor-pointer'
                  } disabled:cursor-default`}
                  disabled={isEditing}
                  onClick={() => setIsEditing(true)}
                >
                  <div className='flex items-center justify-center gap-4'>
                    <FaRegEdit />
                    <span>Edit</span>
                  </div>
                </button>

                <button
                  type='button'
                  className={`w-fit h-[40px] px-4 py-2 text-white rounded-xl shadow-md hover:cursor-pointer ${
                    isEditing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-sky-700 hover:bg-sky-800 hover:cursor-pointer'
                  } disabled:cursor-default`}
                  disabled={isEditing}
                  onClick={openModal}
                >
                  <div className='flex items-center justify-center gap-4'>
                    <FaRegEdit />
                    <span>Change Password</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        className={'min-w-[40vw] min-h-[50vh] flex justify-center items-center'}
      >
        <div className='flex flex-col h-fit space-y-10 w-full'>
          <h1 className='text-center text-2xl font-bold'>Change Password</h1>

          <form
            className='flex flex-col items-center justify-center space-y-5 w-2/3 mx-auto'
            onSubmit={handleSubmitChangePass}
          >
            <div className='flex items-center justify-between space-x-5 w-full'>
              <label
                htmlFor='currentPassword'
                className='font-medium w-1/3 text-[#1E4788]'
              >
                Current Password
              </label>

              <div className='relative'>
                <input
                  type='password'
                  name='currentPassword'
                  placeholder={`Current Password`}
                  required
                  minLength={8}
                  maxLength={20}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 rounded-xl transition-all duration-200 border shadow-md focus:outline-[#1E4788]`}
                />

                <span className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                  {showConfirmPass ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between space-x-5 w-full'>
              <label
                htmlFor='newPassword'
                className='font-medium w-1/3 text-[#1E4788]'
              >
                New Password
              </label>

              <div className='relative'>
                <input
                  type='password'
                  name='newPassword'
                  placeholder={`New Password`}
                  required
                  minLength={8}
                  maxLength={20}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 rounded-xl transition-all duration-200 border shadow-md focus:outline-[#1E4788]`}
                />
              </div>
            </div>

            <div className='flex items-center justify-between space-x-5 w-full'>
              <label
                htmlFor='confirmPassword'
                className='font-medium w-1/3 text-[#1E4788]'
              >
                Confirm Password
              </label>

              <div className='relative'>
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder={`Confirm Password`}
                  required
                  minLength={8}
                  maxLength={20}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 rounded-xl transition-all duration-200 border shadow-md focus:outline-[#1E4788]`}
                />

                <span className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                  {showConfirmPass ? (
                    <AiFillEyeInvisible
                      size={20}
                      onClick={() => showConfirmPass(true)}
                    />
                  ) : (
                    <AiFillEye
                      size={20}
                      onClick={() => showConfirmPass(false)}
                    />
                  )}
                </span>
              </div>
            </div>

            <span className='w-full text-red-500'>
              {changePassErr && changePassErr}
            </span>

            <button
              type='submit'
              className={`w-fit h-[40px] mt-5 px-4 py-2 text-white rounded-xl shadow-md hover:cursor-pointer ${
                isEditing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-sky-700 hover:bg-sky-800 hover:cursor-pointer'
              } disabled:cursor-default`}
            >
              <div className='flex items-center justify-center gap-4'>
                <FaRegEdit />
                <span>Change Password</span>
              </div>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
