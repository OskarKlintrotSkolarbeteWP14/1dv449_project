import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'
import ProgressBar from './shared/progressBar'

class Forecasts extends React.Component {
  render() {
    const { city, forecasts, xhrForecasts, xhrForecastsError, credit, reset } = this.props

    if (xhrForecasts) {
      return (
        <div>
          <h3>Väder</h3>
          <ProgressBar description='Hämtar väder...' />
        </div>
      )
    } else if (xhrForecastsError) {
      return (
        <div>
          <h3>Väder</h3>
          <p>Det verkar som att det uppstod ett fel, troligtvis är antingen SMHI:s API nere eller så är du offline.</p>
        </div>
      )
    } else if (forecasts == null) {
       return null
    } else {
      return (
        <div>
          <h3>Väder</h3>
          <h4>{ city.name }</h4>
          { forecasts.forecasts.map((item) => { return (
            <div>
              <h4>{ new Date(item.validTime).toLocaleDateString() }</h4>
              <p>Temperatur: { item.temperature }&deg;C </p>
            </div>
          ) }) }
          <p>
            <em><a href={ credit.url }>{ credit.text }</a></em>
          </p>
        </div>
      )
    }
  }
}

Forecasts.propTypes = {
  // forecasts: PropTypes.array,
  xhrForecasts: PropTypes.bool.isRequired,
  xhrForecastsError: PropTypes.bool.isRequired,
  credit: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    forecasts: state.app.forecasts,
    xhrForecasts: state.app.xhrForecasts,
    xhrForecastsError: state.app.xhrForecastsError,
    credit: state.app.credit,
    city: state.app.city,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => { dispatch(Actions.resetApp()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecasts)
