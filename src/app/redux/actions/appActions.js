import ActionTypes from "./actionTypes"
import WeatherService from "../../weatherService"

const {
	RESET,
	SET_CITY,
	GET_CITIES,
	SET_XHR_CITIES,
	SET_XHR_CITIES_ERROR,
	GET_FORECASTS,
	SET_XHR_FORECASTS,
	SET_XHR_FORECASTS_ERROR,
	SET_GEONAME_ID,
} = ActionTypes

const AppActions = {
	resetApp: () => {
		return (dispatch, getState) => {
			dispatch({
        type: RESET,
      })
		}
	},
	getCities: (city) => {
		return (dispatch, getState) => {
			dispatch({
				type: SET_XHR_CITIES,
			})
			WeatherService.getCities(city)
				.then((cities) => {
					dispatch({
						type: GET_CITIES,
						cities: cities,
					})
				})
				.catch((data) => {
					console.error(data)
					dispatch({
						type: SET_XHR_CITIES_ERROR,
					})
				})
		}
	},
	setCity: (id, name, region, country) => {
		return (dispatch, getState) => {
			dispatch({
				type: SET_CITY,
				city: {
					id: id,
					name: name,
					region: region,
					country: country,
				},
			})
		}
	},
	getForecasts: (city) => {
		return (dispatch, getState) => {
			const cityName = city.name.indexOf(',') > 0 ? city.name.slice(0, city.name.indexOf(',')) : city.name

			dispatch({
				type: SET_XHR_FORECASTS,
				city: city,
			})
			WeatherService.getForecasts(city)
				.then((data) => {
					// console.log(data)
					dispatch({
						type: GET_FORECASTS,
						forecasts: data,
						meta: {
							transition: (state, action) => ({
								path: `/0/${city.name}/${city.lat}/${city.lng}`,
							}),
						},
					})
				})
				.catch((data) => {
					console.error(data)
					dispatch({
						type: SET_XHR_FORECASTS_ERROR,
					})
				})

				WeatherService.getGeonameId({ name: cityName, lat: city.lat, lng: city.lng })
					.then((geonameId) => {
						console.log(geonameId, city)
						dispatch({
							type: SET_GEONAME_ID,
							id: geonameId,
							credit: {
								text: "Vädret hämtades från smhi.se",
								url: "http://www.smhi.se/#ort=" + geonameId + "," + cityName + ",,," + city.lat + "/" + city.lng,
							},
							meta: {
								transition: (state, action) => ({
									path: `/${geonameId}/${city.name}/${city.lat}/${city.lng}`,
								}),
							},
						})
				})
		}
	},
}

export default AppActions
