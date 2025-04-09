import React, { createContext, useState } from 'react'

const ErrorContext = createContext()

const ErrorProvider = ({ children }) => {
  const [networkError, setNetworkError] = useState(null)

  return (
    <ErrorContext.Provider value={{ networkError, setNetworkError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
export { ErrorContext }
