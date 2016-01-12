import Ajax from './ajax'

const WeatherService = {
  getCities: (city) => {
    const promise = new Promise((resolve, reject) => {
      Ajax.$http("http://api.geonames.org/searchJSON?name=" + city + "&maxRows=50&username=oklib08")
      .get()
      .then((data) => {
        resolve(
          JSON.parse(data).geonames
          .filter((item) => item.fcl === 'P')
          .filter((item) => item.countryName === 'Sweden' || item.countryName === 'Norway' || item.countryName === 'Denmark' || item.countryName === 'Finland')
          .map((item) => {
            return {
              id: item.geonameId,
              name: item.name,
              region: item.adminName1,
              country: item.countryName,
              lat: item.lat,
              lng: item.lng,
            }
          })
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
      Ajax.$http("http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/" + city.lng + "/lat/" + city.lat + "/data.json")
      .get()
      .then((data) => {
        resolve(
          JSON.parse(data)
        )
      })
      .catch((data) => {
        reject((data) => { console.error(data) })
      }) // TODO: Implement modal
    })
    return promise
  },
}

export default WeatherService
