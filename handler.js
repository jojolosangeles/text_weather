'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports.hello = async (event, context, callback) => {
  console.log("got an event")
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');
  console.log(JSON.stringify(event))
  const response = {
    statusCode: 200,
    headers: {'Content-Type': 'text/xml'},
    body: twiml.toString()
  }
  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
