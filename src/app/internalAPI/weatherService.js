import Ajax from './ajax'

const WeatherService = {
  getCities: (city) => {
    const promise = new Promise((resolve, reject) => {
      Ajax.$http("http://api.geonames.org/searchJSON?name=" + city + "&maxRows=50&username=oklib08")
      .get()
      .then((data) => {
        resolve(
          JSON.parse(data).geonames.map((item) => {
            return {
              id: item.geonameId,
              name: item.name,
              region: item.adminName1,
              country: item.countryName,
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
    Ajax.$http("http://www.yr.no/place/"+ city.country +"/"+ city.region +"/"+ city.name +"/forecast.xml")
    .get()
    .then((data) => {
      return data
    })
    .catch((data) => { console.error(data) }) // TODO: Implement modal
  },
}

export default WeatherService
