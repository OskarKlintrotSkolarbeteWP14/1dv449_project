import InitialState from '../initialState'
import { ActionTypesApp } from '../../actions/actionTypes'

const {
  RESET,
  SET_CITY,
  GET_CITIES,
  SET_XHR_CITIES,
  GET_FORECASTS,
	SET_XHR_FORECASTS,
  SET_XHR_FORECASTS_ERROR,
  SET_XHR_CITIES_ERROR,
  SET_GEONAME_ID,
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
    case GET_CITIES:
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
        xhrCitiesError: false,
      }
      break
    case SET_XHR_CITIES_ERROR:
      return {
        ...state,
        xhrCities: false,
        xhrCitiesError: true,
      }
      break
    case GET_FORECASTS:
      return {
        ...state,
        forecasts: action.forecasts,
        xhrForecasts: false,
      }
      break
    case SET_XHR_FORECASTS:
      return {
        ...state,
        city: action.city,
        xhrForecasts: true,
        xhrForecastsError: false,
      }
      break
    case SET_XHR_FORECASTS_ERROR:
      return {
        ...state,
        xhrForecasts: false,
        xhrForecastsError: true,
      }
      break
    case SET_GEONAME_ID:
      return {
        ...state,
        credit: action.credit,
        city: {
          ...state.city,
          geonameId: action.geonameId,
        },
      }
    default:
      return state || InitialState().app
  }
}

export default AppReducer
