var stateName = "";
var alertEndpoint = "";
var parkEndpoint = "";
const states = document.querySelectorAll('path');
const states_mobile = document.getElementById('pick_a_state_function_mobile');


// add event listeners

states.forEach(function (el) {
    el.addEventListener("click",getStateNameDesktop);
});    states_mobile.addEventListener("change",getStateNameMobile);

    function getStateNameDesktop(nodeList) {
        console.log(this);
        stateName = nodeList.path[0].id;
        buildURL();
    }

function getStateNameMobile() {
    stateName = states_mobile[states_mobile.selectedIndex].id;
    buildURL();
}

function test(nodeList) {

    console.log(this);
}
function buildURL() {

    alertEndpoint = "https://developer.nps.gov/api/v1/alerts?stateCode=" + stateName + "&api_key=" + apikey;
    parkEndpoint = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateName + "&limit=100&api_key=" + apikey;
    console.log(alertEndpoint);
    scrolltoAlerts();
}

function scrolltoAlerts() {

    const alertsArea = document.querySelector(".alerts");
    const alertsSection= document.querySelector(".alerts_section");
    const alertHeader = document.querySelector(".alert_header");
    alertsSection.scrollIntoView({  behavior: 'smooth' });
alertHeader.innerText= "loading alerts for " + stateName;
alertsArea.innerHTML ="<img src='images/us_stroke_animation.gif' class='center-block img-fluid us_gif' alt='scooterslogo'/>";
    console.log(stateName);
    getData(alertsArea, alertHeader);
}


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

      displayAlerts(parksWithAlerts, alertsArea, alertHeader)
 }


function displayAlerts(parksWithAlerts, alertsArea, alertHeader) {

    const hideLoader = document.querySelector('.us_gif');
    const noAlerts = "(no alerts at this time)";
    var cardColumns = document.createElement("div");
    cardColumns.setAttribute('class', 'card-columns');
    hideLoader.style.display = "none";
    alertsArea.appendChild(cardColumns);
    console.log(parksWithAlerts);
alertHeader.innerText = stateName + " alerts";


    console.log(parksWithAlerts.length);

    let eachParkAndAlert = parksWithAlerts.map(function(singlePark) {


        let cardText = singlePark.alertData.map(function(singleAlert) {
            return "<b>" + singleAlert.title + "</b><br>" +
          singleAlert.description + "<br><br>";
        }).join("");

        if (cardText.length === 0 ) {

          cardText = singlePark.description + "<b> there are no alerts at this time.</b><br>" ;
        }
      return `
       <div class="natpark card">
        <div class="card-title"><a href="${singlePark.url}"> ${singlePark.fullName}</a><br></div>
        <div class="card-text">${cardText}</div>
</div>
`
    }).join("");
    console.log(eachParkAndAlert);
    cardColumns.innerHTML = (eachParkAndAlert);

}
/*
function alertsFilter(alertsData, parkData) {
console.log(alertsData);
    const filteredAlerts = alertsData.filter(function (onlyAlerts) {
        return onlyAlerts.category.toLowerCase() === "park closure" || onlyAlerts.category.toLowerCase() === "caution" || onlyAlerts.category.toLowerCase() === "information"  ;


    });
    //parksFilter(parkData, filteredAlerts);
    joinParksToAlerts(parkData, filteredAlerts);



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

*/




