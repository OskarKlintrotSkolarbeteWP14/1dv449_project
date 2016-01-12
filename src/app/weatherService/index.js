import Ajax from './ajax'

const WeatherService = {
  getCities: (city) => {
    const promise = new Promise((resolve, reject) => {
      Ajax.$http("http://api.geonames.org/searchJSON?name=" + city + "&maxRows=50&username=oklib08")
      .get()
      .then((data) => {
        resolve(
          JSON.parse(data).geonames
          .filter((item) => item.fcl.toLowerCase() === 'p')
          .filter((item) => item.countryName.toLowerCase() === 'sweden' || item.countryName.toLowerCase() === 'norway' || item.countryName.toLowerCase() === 'denmark' || item.countryName.toLowerCase() === 'finland')
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
      Ajax.$http("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + city.lat + "/lon/" + city.lng + "/data.json")
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
