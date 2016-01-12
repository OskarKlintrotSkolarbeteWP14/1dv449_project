import { Geoname } from './messages'

// Example from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Example_using_new_XMLHttpRequest()

const CachingTime = 1 // In minutes
const Development = true // Set to true to avoid polling SR API
const Delay = 3000 // Simulated response time

const Ajax = {
  // $http function is implemented in order to follow the standard Adapter pattern
  $http(url){
    // A small example of object
    let core = {

      // Method that performs the ajax request
      ajax(method, url, args) {

        // Creating a promise
        let promise = new Promise( (resolve, reject) => {
          if (Development) {
            // Cached response for development
            setTimeout(() => {
              resolve(JSON.stringify(Geoname))
            }, Delay)
          } else {
            // Instantiates the XMLHttpRequest
            let client = new XMLHttpRequest()
            let uri = url

            if (args && (method === 'POST' || method === 'PUT')) {
              uri += '?'
              let argcount = 0
              for (let key in args) {
                if (args.hasOwnProperty(key)) {
                  if (argcount++) {
                    uri += '&'
                  }
                  uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key])
                }
              }
            }
            client.open(method, uri)
            client.send()

            client.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                // Performs the function "resolve" when this.status is equal to 2xx
                // if (StorageAvailable('localStorage')) {
                //   localStorage.timestamp = new Date()
                //   localStorage.messages = this.response
                // }
                resolve(this.response)
              } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText)
              }
            }
            client.onerror = function () {
              reject(this.statusText)
            }
          }
        })

        // Return the promise
        return promise
      },
    }

    // Adapter pattern
    return {
      get(args) {
        return core.ajax('GET', url, args)
      },
      post(args) {
        return core.ajax('POST', url, args)
      },
      put(args) {
        return core.ajax('PUT', url, args)
      },
      delete(args) {
        return core.ajax('DELETE', url, args)
      },
    }
  },
}

export default Ajax
