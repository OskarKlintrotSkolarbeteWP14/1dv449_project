export const ActionTypesApp = {
  RESET: 'RESET',
  SET_CITY: 'SET_CITY',
  GET_CITIES: 'GET_CITIES',
  SET_XHR_CITIES: 'SET_XHR_CITIES',
  GET_FORECASTS: 'GET_FORECASTS',
  SET_XHR_FORECASTS: 'SET_XHR_FORECASTS',
}

export const ActionTypesSettings = {
  RESET: 'RESET',
}

const ActionTypes = Object.assign({}, ActionTypesApp, ActionTypesSettings)

export default ActionTypes
