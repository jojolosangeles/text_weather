
var apikey = process.env.DARK_SKY_API_KEY

var getUrl = (latitude, longitude) => {
  console.log("weather getUrl")
  console.log(`latitude ${latitude}`)
  console.log(`longitude ${longitude}`)
  let result = `https://api.forecast.io/forecast/${apikey}/${latitude},${longitude}`
  console.log(result)
  return result
}

var getData = (body) => {
  return body.currently
}

module.exports = { getData, getUrl }
