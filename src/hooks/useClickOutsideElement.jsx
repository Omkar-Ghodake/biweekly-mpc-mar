import React, { useEffect } from 'react'

const useClickOutsideElement = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const element = ref?.current

      if (!element || element.contains(event?.target || null)) {
        return
      }

      handler(event)
    }

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutsideElement
