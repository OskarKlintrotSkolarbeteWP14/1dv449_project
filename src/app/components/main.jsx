import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

import GeoSuggest from './react-google-places-suggest/'

import Cities from './cities'
import Forecasts from './forecasts'
import PlacesError from './placesError'

class Main extends React.Component {
  constructor(props) {
    super(props)

    const { geonameId, id, name, lat, lng } = props.params
    const { getForecasts, reset, offline } = props

    if (geonameId > 0 && id && name && lat && lng) {
      getForecasts({
        geonameId: geonameId,
        id: id,
        name: name,
        lat: lat,
        lng: lng,
      })
    } else if (id && name && lat && lng) {
      getForecasts({
        geonameId: null,
        id: id,
        name: name,
        lat: lat,
        lng: lng,
      })
    }

  }

  state = {
    search: '',
    selectedCoordinate: null,
    offline: false,
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  };

  handleSelectSuggest = (suggestId, suggestName, coordinate) => {
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
    this.props.getForecasts({
      id: suggestId,
      name: suggestName,
      lat: +coordinate.latitude.toFixed(6),
      lng: +coordinate.longitude.toFixed(6),
    })
  };

  // The following are ugly offline.js Chrome hack
  offlineCheck() {
    setTimeout(() => {
      this.setState({offline: Offline.state === 'down'})
      this.offlineCheck()
      console.log(this.state.offline)
    }, 1000)
  }

  componentDidMount() {
    this.offlineCheck()
  }

  render() {
    const { reset, xhrPlacesError } = this.props
    const { search } = this.state
    const placeholder = "Ange ort här..."

    return (
      <div>
        <h2>Fråga SMHI!</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
          }}>
          <div className="form-group">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
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
              {
                (() => {
                  if (this.state.offline) {
                    return <p><em>Observera att du verkar vara offline!</em></p>
                  }
                })()
              }
              <Link to={'/'} type="button" className="btn btn-default" onClick={() => {
                  reset()
                  this.state.search = ""
                }}>Återställ</Link>
              <hr></hr>
            </div>
          </div>
        </form>
        <div className="clearfix col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <PlacesError error={ xhrPlacesError } />
          <Cities />
          <Forecasts />
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  reset: PropTypes.func.isRequired,
  getForecasts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { xhrPlacesError: state.app.xhrPlacesError }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => { dispatch(Actions.resetApp()) },
    getForecasts: (city) => { dispatch(Actions.getForecasts(city)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
