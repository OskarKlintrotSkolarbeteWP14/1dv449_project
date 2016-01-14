import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

import ProgressBar from './shared/progressBar'

class Cities extends React.Component {
  render() {
    const { cities, getForecasts, xhrCities, xhrCitiesError } = this.props

    if (xhrCities) {
      return (
        <div>
          <h3>Orter</h3>
          <ProgressBar description='Söker efter orter...' />
        </div>
      )
    } else if (xhrCitiesError) {
      return (
        <div>
          <h3>Orter</h3>
          <p>Det verkar som att det uppstod ett fel, troligtvis är antingen geonames API nere eller så är du offline.</p>
        </div>
      )
    } else if (cities === null) {
      return null
    } else if (cities.length === 0) {
      return (
        <div>
          <h3>Orter</h3>
          <p>Inga orter hittades, försök igen.</p>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Orter</h3>
          <ul>
            { cities.map((city) => <li>
              <Link to={
                '/' + city.geonameId + '/' + city.name + '/' + city.region + '/' + city.country + '/' + city.lat + '/' + city.lng
              }
              onClick={() => getForecasts({
                geonameId: city.geonameId,
                name: city.name,
                region: city.region,
                country: city.country,
                lat: city.lat,
                lng: city.lng,
              })}>{ city.name }, { city.region }, { city.country }</Link>
            </li>) }
          </ul>
        </div>
      )
    }
  }
}

Cities.propTypes = {
  cities: PropTypes.array,
  xhrCities: PropTypes.bool.isRequired,
  xhrCitiesError: PropTypes.bool.isRequired,
  getForecasts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    cities: state.app.cities,
    xhrCities: state.app.xhrCities,
    xhrCitiesError: state.app.xhrCitiesError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForecasts: (city) => { dispatch(Actions.getForecasts(city)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
