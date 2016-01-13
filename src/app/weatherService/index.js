import Ajax from './ajax'

const WeatherService = {
  getGeonameId: (city) => {
    const promise = new Promise((resolve, reject) => {
      Ajax.$http("http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + city.lat + "&lng=" + city.lng + "&username=oklib08")
      .get()
      .then((data) => {
        resolve(
          JSON.parse(data).geonames
            .filter((item) => item.fcl.toLowerCase() === 'p')
            .filter((item) => item.name.toLowerCase() === city.name.toLowerCase())
            .map((item) => item.geonameId)[0],
          )
      })
      .catch((data) => {
        reject((data) => { console.error(data) })
      }) // TODO: Implement modal
    })
    return promise
  },
  getForecasts: (city) => {
    const promise = new Promise((resolve, reject) => {
      Ajax.$http("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + city.lat + "/lon/" + city.lng + "/data.json")
      .get()
      .then((data) => {
        resolve({
          referenceTime: JSON.parse(data).referenceTime,
          forecasts: JSON.parse(data).timeseries
            .filter((item) => new Date(item.validTime).getHours() === 13)
            .map((item) => {
              return ({
                validTime: item.validTime,
                temperature: item.t,
              })
            }),
        })
      })
      .catch((data) => {
        reject((data) => { console.error(data) })
      }) // TODO: Implement modal
    })
    return promise
  },
}

export default WeatherService
