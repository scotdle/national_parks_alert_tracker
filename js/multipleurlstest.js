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

    let parksJoinedWithAlerts = filteredParks.map(park => {
        park.alerts = filteredAlerts.filter(alert => alert.parkCode === park.parkCode);
        return park}).map(park =>{
        park.alerts = park.alerts.map(alert => alert.description).join(' <br>  ');
        return park});



displayAlerts(parksJoinedWithAlerts);

    console.log(parksJoinedWithAlerts);

}

function displayAlerts(parksJoinedWithAlerts) {
    parksJoinedWithAlerts

    const natParkDiv = document.querySelector('.nationalparks');
    const displayEverything = parksJoinedWithAlerts.map(parkAndAlerts => {
        const parkName = parkAndAlerts.fullName;
        const stateName = parkAndAlerts.states;
        const alertsFromParks = parkAndAlerts.alerts;
        if(alertsFromParks === ""){
            console.log("no alerts at this time");

        }
        return `
       <div class="grid-item">
        <span class="park">${parkName}, ${stateName}<br></span>
        <span class="alerts">${alertsFromParks}</span>
</div>
`
}).join('');


    natParkDiv.innerHTML = displayEverything;
}






