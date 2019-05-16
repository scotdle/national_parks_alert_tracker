var stateName = "";
var alertEndpoint = "";
var parkEndpoint = "";
const states = document.querySelectorAll('.pick_a_state_function');
const states_mobile = document.querySelectorAll('.pick_a_state_function_mobile');


// add event listeners
states.forEach(function (el) {
    el.addEventListener("click",getStateName);
    console.log(states);
});

states_mobile.forEach(function (el) {
    el.addEventListener("change",getStateName);
    console.log(states);
});


function getStateName(nodeList) {
    stateName = nodeList.path[0].id|| nodeList.path[1].id;
    console.log(states);
    console.log(stateName);
    alertEndpoint = "https://developer.nps.gov/api/v1/alerts?stateCode=" + stateName + "&api_key=" + apikey;
    parkEndpoint = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateName + "&limit=100&api_key=" + apikey;
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

      console.log(alertEndpoint);
      console.log(parkEndpoint);

      var [getAlertData, getParkData] = await Promise.all([fetch(alertEndpoint), fetch(parkEndpoint)]);


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

    const eachNatPark = document.querySelector('.grid-item');
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

      return `
       <div class="natpark card">
        <div class="card-title">${singlePark.fullName}<br></div>
        <div class="card-text">${singlePark.alertData.map(function(singleAlert) {
            return "<b>" + singleAlert.title + "</b><br>" + 
          singleAlert.description + "<br><br>";
            if(singlePark.alertData === []){
return noAlerts;
          }

      }).join("")
      
      }</div>
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




