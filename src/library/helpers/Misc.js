/* eslint-disable func-names */
export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const expiredUnixTime = (expireTime) => {
  const time = Math.floor(new Date() / 1000)

  return time > expireTime
}

export const executeAllPromises = (promises) => {
  const resolvingPromises = promises.map(function (promise) {
    return new Promise(function (resolve) {
      const payload = new Array(2)
      promise
        .then(function (result) {
          payload[0] = result
        })
        .catch(function (error) {
          payload[1] = error
        })
        .then(function () {
          resolve(payload)
        })
    })
  })

  const errors = []
  const results = []

  // Execute all wrapped Promises
  return Promise.all(resolvingPromises).then(function (items) {
    items.forEach(function (payload) {
      if (payload[1]) {
        errors.push(payload[1])
      } else {
        results.push(payload[0])
      }
    })

    return {
      errors,
      results,
    }
  })
}
