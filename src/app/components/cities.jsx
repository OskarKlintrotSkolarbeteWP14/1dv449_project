import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Actions from '../redux/actions/'

class Cities extends React.Component {
  render() {
    const { cities, setCity } = this.props

    if (cities == null) return null

    return (
      <div>
        <h3>Orter</h3>
        <ul>
          { cities.map((city) => <li>
            <Link to={
              '/' + city.id + '/' + city.name + '/' + city.region + '/' + city.country
            }
            onClick={() => setCity(city.id, city.name, city.region, city.country)}>{ city.name }, { city.region }, { city.country }</Link>
          </li>) }
        </ul>
      </div>
    )
  }
}

Cities.propTypes = {
  cities: PropTypes.array,
  setCity: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { cities: state.app.cities }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCity: (id, name, region, country) => { dispatch(Actions.setCity(id, name, region, country)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
