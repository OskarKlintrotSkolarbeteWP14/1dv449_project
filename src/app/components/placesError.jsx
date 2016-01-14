import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

import ProgressBar from './shared/progressBar'

const PlacesError = (props) => {
  const { error } = props

  if (error) {
   return (
     <div>
       <p><em>Orten kunde inte hittas, kontrollera att du har stavat rätt och är online!</em></p>
     </div>
   )
  }

  return <div>{ /* Ugly hack in order to use stateless components */ }</div>
}

PlacesError.propTypes = {
  error: PropTypes.bool.isRequired,
}

export default PlacesError
