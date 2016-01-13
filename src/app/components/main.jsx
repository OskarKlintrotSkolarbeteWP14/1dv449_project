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
    const { geonameId, name, lat, lng } = props.params
    const { getForecasts, reset } = props

    if (geonameId > 0 && name && lat && lng) {
      getForecasts({
        id: geonameId,
        name: name,
        lat: lat,
        lng: lng,
      })
    } else if (name && lat && lng) {
      getForecasts({
        id: null,
        name: name,
        lat: lat,
        lng: lng,
      })
    }
  }

  state = {
    search: '',
    selectedCoordinate: null,
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  };

  handleSelectSuggest = (suggestName, coordinate, suggest) => {
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
    this.props.getForecasts({
      name: suggestName,
      lat: +coordinate.latitude.toFixed(6),
      lng: +coordinate.longitude.toFixed(6),
    })
  };

  render() {
    const { reset } = this.props
    const { search } = this.state
    const placeholder = "Ange ort här..."

    return (
      <div>
        <h2>Fråga inte mig, fråga <s>YR</s> SMHI som tillåter CORS!</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
          }}>
          <div className="form-group">
            <label htmlFor="geosuggestInput">Ort</label>
            <GeoSuggest onSelectSuggest={ this.handleSelectSuggest } search={ search }>
              <input
                className="form-control"
                id="geosuggestInput"
                ref="geo"
                type="text"
                value={ search }
                placeholder="Ange ort här..."
                onChange={ this.handleSearchChange }
              />
            </GeoSuggest>
          </div>
          <Link to={'/'} type="button" className="btn btn-default" onClick={() => {
              reset()
              this.state.search = ""
            }}>Återställ</Link>
        </form>
        <Cities />
        <Forecasts />
      </div>
    )
  }
}

Main.propTypes = {
  reset: PropTypes.func.isRequired,
  getForecasts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => { dispatch(Actions.resetApp()) },
    getForecasts: (city) => { dispatch(Actions.getForecasts(city)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
