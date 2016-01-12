import InitialState from '../initialState'
import { ActionTypesApp } from '../../actions/actionTypes'

const {
  RESET,
  SET_CITY,
  SET_CITIES,
  SET_XHR_CITIES,
  SET_FORECASTS,
	SET_XHR_FORECASTS,
} = ActionTypesApp

const AppReducer = (state, action) => {
  switch (action.type) {
    case RESET:
      return InitialState().app
      break
    case SET_CITY:
      return {
        ...state,
        city: action.city,
      }
      break
    case SET_CITIES:
      return {
        ...state,
        cities: action.cities,
        xhrCities: false,
      }
      break
    case SET_XHR_CITIES:
      return {
        ...state,
        xhrCities: true,
      }
    case SET_FORECASTS:
      return {
        ...state,
        forecasts: action.forecasts,
        xhrForecasts: false,
      }
      break
    case SET_XHR_FORECASTS:
      return {
        ...state,
        xhrForecasts: true,
      }
      break
    default:
      return state || InitialState().app
  }
}

export default AppReducer
