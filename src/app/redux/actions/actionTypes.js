export const ActionTypesApp = {
  RESET: 'RESET',
  SET_CITY: 'SET_CITY',
  SET_CITIES: 'SET_CITIES',
  SET_XHR_CITIES: 'SET_XHR_CITIES',
  SET_FORECASTS: 'SET_FORECASTS',
  SET_XHR_FORECASTS: 'SET_XHR_FORECASTS',
}

export const ActionTypesSettings = {
  RESET: 'RESET',
}

const ActionTypes = Object.assign({}, ActionTypesApp, ActionTypesSettings)

export default ActionTypes
