import ActionTypes from "./actionTypes"
import WeatherService from "../../weatherService"

const {
	RESET,
	SET_CITY,
	GET_CITIES,
	SET_XHR_CITIES,
	GET_FORECASTS,
	SET_XHR_FORECASTS,
} = ActionTypes

const AppActions = {
	resetApp: () => {
		return (dispatch, getState) => {
			setTimeout(function(){
				dispatch({
	        type: RESET,
	      })
			}, 1000)
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
				.catch((data) => { console.error(data) })
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
			dispatch({
				type: SET_XHR_FORECASTS,
				city: city,
			})
			WeatherService.getForecasts(city)
				.then((data) => {
					console.log(data)
					dispatch({
						type: GET_FORECASTS,
						forecasts: data.forecasts,
					})
				})
				.catch((data) => { console.error(data) })
		}
	},
}

export default AppActions
