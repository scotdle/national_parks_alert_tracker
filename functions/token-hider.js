
const fetch = require("node-fetch");
const color = require("colors");


var parksWithAlerts = "";
// Get env var values defined in our Netlify site UI
const {api_key, alert_api_url, park_api_url} = process.env;
const alertEndpoint = stateName => {
console.log("im the alert promise!".red);

  return fetch(`${alert_api_url}${stateName}${api_key}`).then(res => res.json().then(res => res.data));



};

const parkEndpoint = stateName => {
  console.log("im the park promise!".red);



    return fetch(`${park_api_url}${stateName}${api_key}`).then(res => res.json().then(res => res.data));

};




exports.handler = async function(event, context) {
    const stateName = event.queryStringParameters.stateName;
    console.log("waiting for promises".red);
    return Promise.all([alertEndpoint(stateName), parkEndpoint(stateName)])
        .then(values => {

            const [alertData, parkData] = values;
            console.log("promises have been returned!".red);
            console.log("here's the alert data".red);
            console.log(alertData);
            console.log("here's the park data".red);
            console.log(parkData);

            const parksWithAlerts = parkData.map(park => {
                park.alertData = alertData.filter(alert => alert.parkCode === park.parkCode);
                return park;
            });
            console.log("here is both of them together!".red);
            console.log(parksWithAlerts);
            return {
                statusCode: 200,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(parksWithAlerts)
            };
        })
        .catch(error => {
            return error;
        });

};