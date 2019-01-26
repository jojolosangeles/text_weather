# Text Weather
Serverless application that uses:
- twilio
- google maps api
- darksky weather api

You need API key for both google maps and dark sky.

Enter these keys in **serverless.yml**

sls deploy

copy/paste the serverless URL in your twilio webhook.

Text any full or partial address (city name alone works).  Google maps reverse geocodes to latitude/longitude,
dark sky provides temperature at that location.  

Text response is the reverse geocoded address, a link to the location on google maps, and the weather summary and temperature from darksky.
