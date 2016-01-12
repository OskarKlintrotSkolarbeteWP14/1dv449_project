import Ajax from './ajax'

const WeatherService = {
  getCities: (city) => {
    const promise = new Promise((resolve, reject) => {
      Ajax.$http("https://api.geonames.org/searchJSON?name=" + city + "&maxRows=50&username=oklib08")
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
      Ajax.$http("https://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + city.lat + "/lon/" + city.lng + "/data.json")
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






        // // .filter((item) => item.timeseries.validTime),
        // const forecasts = JSON.parse(data)
        //   // .map((item) => {
        //   //   return ({
        //   //     ...item,
        //   //     timeseries: {
        //   //       validTime: item.validTime,
        //   //       temperature: item.t,
        //   //     },
        //   //   })
        //   // })
        // resolve({
        //   forecasts: forecasts,
        // })
      })
      .catch((data) => {
        reject((data) => { console.error(data) })
      }) // TODO: Implement modal
    })
    return promise
  },
}

export default WeatherService
