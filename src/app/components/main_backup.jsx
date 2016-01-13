import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

import GeoSuggest from './react-google-places-suggest/'

import Cities from './cities'
import Forecasts from './forecasts'

class Main extends React.Component {
  constructor(props) {
    super(props)
    const { geoId, name, region, country, lat, lng } = props.params
    const { getForecasts, getCities, reset } = props
    if (geoId) {
      getForecasts({
        id: geoId,
        name: name,
        region: region,
        country: country,
        lat: lat,
        lng: lng,
      })
      getCities(name)
    }
  }

  state = {
    search: '',
    selectedCoordinate: null,
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  };

  handleSelectSuggest = (suggestName, coordinate) => {
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
    this.props.getForecasts({
      name: suggestName,
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    })
  };

  render() {
    const { reset, getCities } = this.props
    const { search } = this.state
    const placeholder = "Ange ort här..."

    return (
      <div>
        <h2>Fråga inte mig, fråga <s>YR</s> SMHI som tillåter CORS!</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
            getCities(this.refs.inputCity.value)
            this.refs.inputCity.value = ""
          }}>
          <div className="form-group">
            <label htmlFor="geosuggestInput">Ort</label>
            <GeoSuggest onSelectSuggest={ this.handleSelectSuggest } search={ search }>
              <input
                className="form-control"
                id="geosuggestInput"
                type="text"
                value={ search }
                placeholder="Ange ort här..."
                onChange={ this.handleSearchChange }
              />
            </GeoSuggest>
            <label htmlFor="cityInput">Ort</label>
            <input type="text" className="form-control" id="cityInput" placeholder={ placeholder } ref="inputCity" autofocus autoComplete="off"></input>
          </div>
          <button className="btn btn-default">Sök</button>
          <Link to={'/'} type="button" className="btn btn-default" onClick={() => reset()}>Återställ</Link>
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
