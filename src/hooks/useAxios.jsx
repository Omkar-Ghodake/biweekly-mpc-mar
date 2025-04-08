import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

const useAxios = (url, method = 'GET', body = null, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios({
        url,
        method,
        data: body,
        ...options,
      })
      setData(response.data.data)
    } catch (err) {
      console.log('err:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

export default useAxios
