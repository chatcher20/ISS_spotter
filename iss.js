const request = require('request');    // Install and use the request library to make the HTTP request (We know this library is deprecated but it is still ok to use for our purposes.)

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 


const endpoint = "https://api.ipify.org?format=json";      // URL of the API

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request(endpoint, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status,  assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data

    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};


module.exports = { fetchMyIP };
