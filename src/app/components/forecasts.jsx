import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

class Forecasts extends React.Component {
  render() {
    const { forecasts, xhrForecasts, credit, reset } = this.props

    if (xhrForecasts) {
      return (
        <div>
          <h3>Orter</h3>
          <ProgressBar description='Hämtar väder...' />
        </div>
      )
    }

    if (forecasts == null) return null

    return (
      <div>
        <h3>Väder</h3>
        <p>
          <em><a href={ credit.url }>{ credit.text }</a></em>
        </p>
      </div>
    )
  }
}

Forecasts.propTypes = {
  forecasts: PropTypes.array,
  xhrForecasts: PropTypes.bool.isRequired,
  credit: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    forecasts: state.app.forecasts,
    xhrForecasts: state.app.xhrForecasts,
    credit: state.app.credit,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => { dispatch(Actions.resetApp()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecasts)
