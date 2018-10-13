const alertEndpoint = ('https://api.nps.gov/api/v1/alerts?limit=400&api_key=' + apikey);
const parkEndpoint = ('https://api.nps.gov/api/v1/parks?limit=400&api_key=' + apikey);

async function getParkData() {


    const [parkAlerts, parkInfo] = await Promise.all([fetch(alertEndpoint), fetch(parkEndpoint)]);

const alertResults = await parkAlerts.json().data;
 const parkResults=  await parkInfo.json().data;

 const resultsData = alertResults.data;
 const parkData = parkResults.data;

console.log(alertResults.data);
    console.log(parkResults.data);


}



getParkData();

function alertsFilter() {

}

function parksFilter() {

}