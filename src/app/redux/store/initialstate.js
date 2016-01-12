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
				text: null,
				url: null,
			},
		},
		settings: {

		},
	}
}

export default InitialState
