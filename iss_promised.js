/*

Recap on Promises & Callback Hell
A promise is an object which represents a (usually asynchronous) task that will execute and the end result of said task (fulfilled or rejected). We can add callbacks to it in order to handle these end results.

What's cool about promises is that we can chain them, turning callback hell into manageable / readable control flow.

Promises allow us to turn code like this:

// clepto.js
gotoTheirHouse(billy, () => {
  pretendToBeFriends(billy, () => {
    stealWhenNotLooking(billy.mixtapes, (items) => {
      hideInBackpack(items, () => {
        console.log("I don't feel well. I gotta go home now Billy!");
      });
    });
  });
});
Into this:

// clepto_promises.js
gotoTheirHouse(billy)
  .then(pretendToBeFriends)
  .then(stealWhenNotLooking)
  .then(hideInBackpack)
  .then(() => {
    console.log("I don't feel well. I gotta go home now Billy!");
  });
As we can see, one is much more readable as the async tasks are less nested. We've transformed the "callback hell" that comes from doing async tasks one after another, into seemingly synchronous code.

There's More To Promises
There's more to promises than just avoiding nested callbacks, such as:

Error handling becomes much simpler with promises
Promises make asynchronous code easier to unit test
Promise.all (introduced by MPJ's video) can be used to run multiple async operations in parallel and have a single callback to see all the results together
And more ...

*/



const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  
  const ip  = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};


/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url);
}



/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation }

