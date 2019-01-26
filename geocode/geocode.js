
var getUrl = (address) => {
  var encodedAddress = encodeURIComponent(address)
  return `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.MAPS_API_KEY}&address=${encodedAddress}`
}

var getData = (body) => {
  var location = body.results[0].geometry.location
  return {
    address: body.results[0].formatted_address,
    latitude: location.lat,
    longitude: location.lng
  }
}

module.exports = { getUrl, getData }
