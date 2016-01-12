export const TwoDigits = (number) => {
  return (
    ('0' + number.toString()).slice(-2).toString()
  )
}

export const JsonDateToDate = (date) => {
  return new Date(JSON.parse(parseInt(date.slice(6, 19)) /* + parseInt(date.slice(20, 22))*3600000*/))
}

export const FormatDate = (date) => {
  return date.getFullYear() + '-' + TwoDigits(parseInt(date.getMonth()) + 1) + '-' + TwoDigits(date.getDate()) + ' ' + TwoDigits(date.getHours()) + ':' + TwoDigits(date.getMinutes())
}

// Example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
export const StorageAvailable = (type) => {
	try {
		let storage = window[type],
			x = '__storage_test__'
		storage.setItem(x, x)
		storage.removeItem(x)
		return true
	}
	catch(e) {
		return false
	}
}
