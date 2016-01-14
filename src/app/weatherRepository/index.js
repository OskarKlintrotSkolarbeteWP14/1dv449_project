import { StorageAvailable } from './helpers'

const caching = 60 // In seconds

const WeatherRepository = {
  getForecasts: (city) => {
    if (StorageAvailable('localStorage')) {
      if (localStorage.forecasts && JSON.parse(localStorage.forecasts)[city.id]) {
        // Remove forecasts where the last date has past
        let removedStaleWeather = {}
        for (const item in JSON.parse(localStorage.forecasts)) {
          const length = JSON.parse(localStorage.forecasts)[item].forecasts.forecasts.length - 1
          const lastForecast = new Date(JSON.parse(localStorage.forecasts)[item].forecasts.forecasts[length].validTime)
          if (lastForecast > new Date()) {
            removedStaleWeather[item] = JSON.parse(localStorage.forecasts)[item]
          }
        }
        localStorage.forecasts = JSON.stringify(removedStaleWeather)

        // Return forecast if not stale or offline
        const stale = new Date(JSON.parse(localStorage.forecasts)[city.id].timestamp).getTime() + caching * 1000 < new Date().getTime()

        if (Offline.state === 'down') {
          return JSON.parse(localStorage.forecasts)[city.id]
        } else {
          return stale ? null : JSON.parse(localStorage.forecasts)[city.id]
        }
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
