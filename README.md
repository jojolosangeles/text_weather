# Text Weather

This is a serverless application based on a couple Udemy classes, one nodejs the other
serverless.  

## How to use the application

- send a text containing a location to twilio phone number
  -- the location can be as simple as a city name, or as complex as a complete 
  address.  
- expect a reply, containing a reformatted and normalized version
of your location, and the weather at that location.

## Behind the scenes

1. A text message is received by Twilio
2. Twilio POSTs that message to the configured URL
3. The serverless function receives that message, and does the following:
- sends the message body to the Google Maps API for reverse geocoding.
- from the Google Maps data, extracts the **standardized human-readable location**, and
 that location's **latitude** and **longitude**.
- sends the latitude and longitude to the DarkSky API.
- from the DarkSky data, extracts the **summary** and **current temperature**.
- responds to the POST with a TwiML XML message to send
a text message response containing the **standardized human-readable location**, the **summary**, and the **current temperature**
4. Twilio gets the TwiML response, and sends the text
message indicated by the TwiML.

## Running locally

#### step 1 of 4: prepare the environment

The serverless application requires two environment variables:

- MAPS_API_KEY -- a Google Maps API key
- DARK_SKY_API_KEY -- a DarkSky API key

To run locally, these must be set in your shell environment:

```bash
export MAPS_API_KEY=...google maps api key...
export DARK_SKY_API_KEY=...darksky api key...
```

Verify the two keys are set:
```bash
env | grep "MAPS_API_KEY\|DARK_SKY_API_KEY"
```
To run remotely, these values need to be manually put
in the Lambda Environment (one time set-up)
(insert screenshow of AWS lambda environment-setting screen)

#### step 2 of 4: starting the serverless application locally

With the environment variables set, the application can be started with:
```
  sls offline
  ```

This displays the **local function URL** of the serverless functions.
Default value is http://localhost:3000

#### step 3 of 4: starting ngrok

Start ngrok so that it forwards to the **local function URL**. 

```bash
./ngrok http 3000
```
When ngrok starts, it displays **public ngrok URLs** that it
routes to localhost:3000.  

#### step 4 of 4: configure twilio to use ngrok URL

Navigate to the phone number accepting the text message.
In the webhook section, change the **Twilio POST URL** to
one of the **public ngrok URLs**.

----
With the above steps complete, a text message to the twilio
phone number follows this path:

```
phone --> twilio (logs calls)
      --> ngrok (shows messages received)
      --> local function (shows functions called)
      --> twilio (logs responses)
      <-- twilio responds with text message
 ```
 
For example, texting "Boston" will have a
response like:
```yaml
Boston, MA, USA
Partyly Cloudy, 26
```

## Running Online

#### step 1 of 2: deploy function to AWS

```bash
sls deploy
```

This shows the **serverless URL** that provide the service.

#### step 2 of 2: update twilio POST handler webhook

Navigate to the phone number accepting the text message.
In the webhook section, change the **Twilio POST URL** to
the **serverless URL** with **/message** appended.

The **/message** is from the **serverless.yml** configuration:
```yaml
functions:
  hello:
    handler: handler.weather
    events:
      - http:
          path: message
          method: post
```

----
With serverless deployment, the message path is:
```
phone --> twilio (logs calls)
      --> serverless (logs function calls)
      --> twilio (logs responses)
      <-- twilio responds with text message
 ```
