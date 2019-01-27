'use strict';
const url = require('url')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')
const axios = require('axios')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports.weather = async (event, context, callback) => {
  let url_parts = url.parse(`http://blah.com?${event.body}`, true)
  let geoUrl = geocode.getUrl(url_parts.query.Body)
  let geoResponse = await axios.get(geoUrl)
  let geoInfo = geocode.getData(geoResponse.data)
  let weatherUrl = weather.getUrl(geoInfo.latitude, geoInfo.longitude)
  let weatherResponse = await axios.get(weatherUrl)
  let weatherData = weather.getData(weatherResponse.data)
  const twiml = new MessagingResponse();
  twiml.message(`${geoInfo.address}\n${weatherData.summary}, ${Math.round(weatherData.temperature)}`);
  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/xml'},
    body: twiml.toString()
  }
};
