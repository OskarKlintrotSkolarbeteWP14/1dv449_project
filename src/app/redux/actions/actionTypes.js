export const ActionTypesApp = {
  RESET: 'RESET',
  SET_CITY: 'SET_CITY',
  SET_CITIES: 'SET_CITIES',
}

export const ActionTypesSettings = {
  RESET: 'RESET',
}

const ActionTypes = Object.assign({}, ActionTypesApp, ActionTypesSettings)

export default ActionTypes
