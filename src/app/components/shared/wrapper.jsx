import React from 'react'

const Wrapper = (props) => {
  const { children } = props

  return(
        <div>
          <h1>Vad blir det för väder?</h1>
          {children}
        </div>
  )
}

export default Wrapper
