const InitialState = () => {
	return {
		app: {
			city: null,
			xhrCities: false,
			cities: null,
			xhrForecasts: false,
			xhrCitiesError: false,
			xhrForecastsError: false,
			forecasts: null,
			credit: {
				text: "Vädret hämtades från smhi.se",
				url: "http://www.smhi.se",
			},
		},
		settings: {

		},
	}
}

export default InitialState
