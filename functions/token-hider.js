const axios = require("axios/index");
const qs = require("qs");
const fetch = require("node-fetch");

var alertEndpoint = "";
var parkEndpoint = "";


exports.handler = function getURLS(event, context, callback) {
  // apply our function to the queryStringParameters and assign it to a variable
  // Get env var values defined in our Netlify site UI
  const {api_key, alert_api_url, park_api_url} = process.env;
  // In this example, the API Key needs to be passed in the params with a key of key.
  // We're assuming that the ApiParams var will contain the initial ?
   alertEndpoint = `${alert_api_url}${api_key}`;
   parkEndpoint = `${park_api_url}${api_key}`;


  // Let's log some stuff we already have.
  console.log("Injecting token to", alert_api_url, park_api_url);
  console.log("logging event.....", event);
  console.log("Constructed URLs are ...", alertEndpoint, parkEndpoint);
getData();
};

async function getData(alertsArea, alertHeader) {


  const [getAlertData, getParkData] = await Promise.all([fetch(alertEndpoint), fetch(parkEndpoint)]);


  var alertResults = await getAlertData.json();
  var parkResults=  await getParkData.json();
  var alertData = alertResults.data;
  var parkData = parkResults.data;

  let parksWithAlerts = parkData.map(park => {
    park.alertData = alertData.filter(alert => alert.parkCode === park.parkCode);
    return park

  });

  console.log(parksWithAlerts);

//  displayAlerts(parksWithAlerts, alertsArea, alertHeader)
}