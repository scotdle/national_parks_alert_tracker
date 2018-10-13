const alertEndpoint = 'https://api.nps.gov/api/v1/alerts?limit=400&api_key=' + apikey;
const parkEndpoint = 'https://api.nps.gov/api/v1/parks?limit=400&api_key=' + apikey;


const nationalParkAlerts = [];
const listOfParks = [];

fetch(alertEndpoint + apikey)
    .then(function (response) {
        response.json().then(function (alertsResponse) {
            nationalParkAlerts.push(...alertsResponse.data);
            filterAlerts();

        });
    });

//console.log(nationalParkAlerts);

function filterAlerts() {
    console.log("before filter");
    console.log(nationalParkAlerts);

    const filteredAlerts = nationalParkAlerts.filter(function (onlyAlerts) {
        return onlyAlerts.category.toLowerCase() === "park closure" || onlyAlerts.category.toLowerCase() === "caution";
    });
    nationalParkAlerts.length = 0; //resetting the nationalParkAlerts variable
    nationalParkAlerts.push(...filteredAlerts);
    console.log("after filter");
    sortByNationalParks();
}
function sortByNationalParks() {
    console.log("national park alert just ran!");
    console.log(nationalParkAlerts)
}


