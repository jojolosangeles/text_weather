'use strict';
const url = require('url')
const geocode = require('./geocode/geocode')
const axios = require('axios')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports.hello = async (event, context, callback) => {
  let url_parts = url.parse(`http://blah.com?${event.body}`, true)
  console.log(`get lat,lon for: ${url_parts.query.Body}` )
  let geoUrl = geocode.getUrl(url_parts.query.Body)
  let wrongWay = "";
  await axios.get(geoUrl)
    .then((response) => {
      var geoInfo = geocode.getData(response.data)
      console.log(geoInfo)
      const twiml = new MessagingResponse();

      twiml.message(url_parts.query.Body);
      const twilioResponse = {
        statusCode: 200,
        headers: {'Content-Type': 'text/xml'},
        body: twiml.toString()
      }
      wrongWay = twilioResponse
    })
    .catch((error) => {
      console.log("ruh-oh")
    })
//callback(null, wrongWay)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
   return wrongWay//{ message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
