const InitialState = () => {
	return {
		app: {
			city: {
				geonameId: 0,
			},
			xhrCities: false,
			cities: null,
			xhrForecasts: false,
			xhrCitiesError: false,
			xhrForecastsError: false,
			xhrPlacesError: false,
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
