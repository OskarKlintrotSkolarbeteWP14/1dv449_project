import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

import Cities from './cities'
import Forecasts from './forecasts'

class Main extends React.Component {
  constructor(props) {
    super(props)
    const { geoId, name, region, country, lat, lng } = props.params
    const { getForecasts } = props
    if (geoId) {
      getForecasts({
        id: geoId,
        name: name,
        region: region,
        country: country,
        lat: lat,
        lng: lng,
      })
    }
  }

  render() {
    const { reset, getCities } = this.props
    const placeholder = "Ange ort här..."

    return (
      <div>
        <h2>Fråga inte mig, fråga YR!</h2>
        <form>
          <div className="form-group">
            <label htmlFor="cityInput">Ort</label>
            <input type="text" className="form-control" id="cityInput" placeholder={ placeholder } ref="inputCity" autofocus autoComplete="off"></input>
          </div>
          <button type="submit" className="btn btn-default" onClick={ () => {
              getCities(this.refs.inputCity.value)
              this.refs.inputCity.value = ""
            }
          } >Sök</button>
        </form>
        <Cities />
        <Forecasts />
      </div>
    )
  }
}

Main.propTypes = {
  reset: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getForecasts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => { dispatch(Actions.resetApp()) },
    getCities: (city) => { dispatch(Actions.getCities(city)) },
    getForecasts: (city) => { dispatch(Actions.getForecasts(city)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
