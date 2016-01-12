import ActionTypes from "./actionTypes"
import WeatherService from "../../weatherService"

const {
	RESET,
	SET_CITY,
	SET_CITIES,
	SET_XHR_CITIES,
	SET_FORECASTS,
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
	setCities: (city) => {
		return (dispatch, getState) => {
			dispatch({
				type: SET_XHR_CITIES,
			})
			WeatherService.getCities(city)
				.then((cities) => {
						dispatch({
							type: SET_CITIES,
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
}

export default AppActions
