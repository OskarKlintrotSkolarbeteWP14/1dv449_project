import React, { PropTypes } from 'react'

const ProgressBar = (props) => {
  const { description } = props

  return (
    <div>
      <p>{ description }</p>
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" ariaValuenow="45" ariaValuemin="0" ariaValuemax="100" style={{width: "100%"}}>
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  description: PropTypes.string.isRequired,
}

export default ProgressBar
