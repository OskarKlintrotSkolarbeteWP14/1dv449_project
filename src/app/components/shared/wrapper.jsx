import React from 'react'

const Wrapper = (props) => {
  const { children } = props

  return(
        <div className="col-md-12">
          <h1>Vad blir det för väder?</h1>
          {children}
        </div>
  )
}

export default Wrapper
