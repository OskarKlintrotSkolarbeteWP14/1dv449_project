import { StorageAvailable } from './helpers'

const caching = 60 // In seconds

const WeatherRepository = {
  getForecasts: (city) => {
    if (StorageAvailable('localStorage')) {
      if (localStorage.forecasts && JSON.parse(localStorage.forecasts)[city.id]) {
        const stale = new Date(JSON.parse(localStorage.forecasts)[city.id].timestamp).getTime() + caching * 1000 < new Date().getTime()
        return stale ? null : JSON.parse(localStorage.forecasts)[city.id]
      }
      return null
    } else {
      return null
    }
  },
  setForecasts: (city, forecasts) => {
    if (StorageAvailable('localStorage')) {
      if (localStorage.forecasts == null){
        localStorage.forecasts = JSON.stringify({})
      }
      const temp = JSON.parse(localStorage.forecasts) || {}
      temp[city.id] = {
          city: city,
          forecasts: forecasts,
          timestamp: new Date(),
        }
      localStorage.forecasts = JSON.stringify(temp)
    } else {
      return null
    }
  },
}

export default WeatherRepository
