const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP: ' , ip);



  const { fetchCoordsByIP } = require('./iss');

  // For now, call the function and pass in our (IPv4) IP address string as the first argument to the function
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    console.log("It worked! Returned coodinates: " , coordinates);
  });

});



