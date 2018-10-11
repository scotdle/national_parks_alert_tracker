const endpoint = 'https://api.nps.gov/api/v1/alerts?limit=500&api_key=' + apikey;
const nationalParkAlerts = [];

fetch(endpoint + apikey)
    .then(function (response) {
        response.json().then(function (alertsResponse) {
            nationalParkAlerts.push(...alertsResponse.data);

        });
        filterAlerts();
    });
console.log(nationalParkAlerts);
function filterAlerts() {
}


