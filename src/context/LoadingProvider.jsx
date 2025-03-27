import React, { createContext, useState } from 'react'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
  // setloading
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
export { LoadingContext }
