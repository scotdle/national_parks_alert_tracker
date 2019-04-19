const alertEndpoint = ('https://developer.nps.gov/api/v1/alerts?parkCode=&limit=400&api_key=' + apikey +' ' );
const parkEndpoint = ('https://developer.nps.gov/api/v1/parks?parkCode=&limit=400&api_key=' + apikey +' ' );

console.log(alertEndpoint);
console.log(parkEndpoint);



getParkData();

async function getParkData() {


    const [parkAlerts, parkInfo] = await Promise.all([fetch(alertEndpoint), fetch(parkEndpoint)]);

const alertResults = await parkAlerts.json();
 const parkResults=  await parkInfo.json();

 const alertsData = alertResults.data;
 const parkData = parkResults.data;

//console.log(alertsData);
    console.log(parkResults);
alertsFilter(alertsData, parkData);

}

function alertsFilter(alertsData, parkData) {
console.log(alertsData);
    const filteredAlerts = alertsData.filter(function (onlyAlerts) {
        return onlyAlerts.category.toLowerCase() === "park closure" || onlyAlerts.category.toLowerCase() === "caution" || onlyAlerts.category.toLowerCase() === "information"  ;


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
console.log(parksJoinedWithAlerts);


displayAlerts(parksJoinedWithAlerts);

    console.log(parksJoinedWithAlerts);

}

function displayAlerts(parksJoinedWithAlerts) {

console.log(parksJoinedWithAlerts);
    const natParkDiv = document.querySelector('.card-columns');
    const eachNatPark = document.querySelector('.grid-item');
    const noAlerts = "(no alerts at this time)";
    const displayEverything = parksJoinedWithAlerts.map(parkAndAlerts => {

        const parkName = parkAndAlerts.fullName;
        const stateName = parkAndAlerts.states;
        let alertsFromParks = parkAndAlerts.alerts;
      //  const parkImage = parkAndAlerts.images[0].url; plans to incorporate images into each of the parks coming soon.

        if(alertsFromParks === ""){
            alertsFromParks = noAlerts;
        }
        return `
       <div class="natpark card">
        <div class=" card-title">${parkName}, ${stateName}<br></div>
        <div class=" card-text">${alertsFromParks}</div>
</div>
`
}).join('');


    natParkDiv.innerHTML = displayEverything;
}






