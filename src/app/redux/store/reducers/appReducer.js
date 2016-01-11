import InitialState from '../initialState'
import { ActionTypesApp } from '../../actions/actionTypes'

const {
  RESET,
  SET_CITY,
  SET_CITIES,
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
      }
      break
    default:
      return state || InitialState().app
  }
}

export default AppReducer
