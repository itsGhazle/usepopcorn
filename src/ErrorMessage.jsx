import React from 'react'

function ErrorMessage({message}) {
  return (
    <div><p className='error'>{message}</p></div>
  )
}

export default ErrorMessage