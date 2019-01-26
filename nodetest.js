const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

// <?xml version="1.0" encoding="UTF-8"?>
// <Response>
//     <Message>{"A":"B","C":"D"}</Message>
// </Response>
// <?xml version="1.0" encoding="UTF-8"?>
// <Response>
//     <Message>The Robots are coming! Head for the hills!</Message>
// </Response>
