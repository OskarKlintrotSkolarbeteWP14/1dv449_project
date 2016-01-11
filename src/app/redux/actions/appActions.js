import ActionTypes from "./actionTypes"
import WeatherService from "../../internalAPI/weatherService"

const {
	RESET,
	SET_CITY,
	SET_CITIES,
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
