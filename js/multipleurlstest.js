const alertEndpoint = ('https://api.nps.gov/api/v1/alerts?limit=400&api_key=' + apikey);
const parkEndpoint = ('https://api.nps.gov/api/v1/parks?limit=500&api_key=' + apikey);

getParkData();

async function getParkData() {


    const [parkAlerts, parkInfo] = await Promise.all([fetch(alertEndpoint), fetch(parkEndpoint)]);

const alertResults = await parkAlerts.json();
 const parkResults=  await parkInfo.json();

 const alertsData = alertResults.data;
 const parkData = parkResults.data;

//console.log(alertsData);
    //console.log(parkResults.data);
alertsFilter(alertsData, parkData);

}

function alertsFilter(alertsData, parkData) {

    const filteredAlerts = alertsData.filter(function (onlyAlerts) {
        return onlyAlerts.category.toLowerCase() === "park closure" || onlyAlerts.category.toLowerCase() === "caution";


    });
    parksFilter(parkData, filteredAlerts);



}

function parksFilter(parkData, filteredAlerts) {
    const filteredParks = parkData.filter(function (onlyNatParks) {
        return onlyNatParks.designation.toLowerCase().includes( "national park");

    });
    joinParksToAlerts(filteredParks, filteredAlerts);

}

function joinParksToAlerts(filteredParks, filteredAlerts) {


    console.log(filteredAlerts);
    natParkName = filteredParks.map(function (natPark) {
        return ' <div class="col-lg-12 natparks" >' + natPark.fullName + '</div>';

    });
    const natParkDiv = document.querySelector('.nationalparks');
    console.log(filteredParks);

    natParkDiv.innerHTML = natParkName.join('');

    let parksWithAlerts = filteredParks.map(function(park) {
        park.alerts = filteredAlerts.filter(alert => alert.parkCode === park.parkCode);
        return park
    });

    console.log(parksWithAlerts);
}

