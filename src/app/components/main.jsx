import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

import Cities from './cities'
import Forecasts from './forecasts'

class Main extends React.Component {
  constructor(props) {
    super(props)
    const { geoname, name, region, country } = props.params
    const { setCity } = props
    if (geoname) {
      setCity(geoname, name, region, country)
    }
  }

  render() {
    const { reset, setCities } = this.props
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
              setCities(this.refs.inputCity.value)
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
  setCities: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => { dispatch(Actions.resetApp()) },
    setCities: (city) => { dispatch(Actions.setCities(city)) },
    setCity: (id, name, region, country) => { dispatch(Actions.setCity(id, name, region, country)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
