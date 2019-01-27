
var apikey = process.env.DARK_SKY_API_KEY

var getUrl = (latitude, longitude) => {
  return `https://api.forecast.io/forecast/${apikey}/${latitude},${longitude}`
}

var getData = (body) => {
  return body.currently
}

module.exports = { getData, getUrl }
