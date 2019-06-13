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
        console.log(stateName);
        fetchNetlifyFunction();
    }

function getStateNameMobile() {
    stateName = states_mobile[states_mobile.selectedIndex].id;
}

async function fetchNetlifyFunction() {

     let netFunction ='https://nps-alert-tracker.netlify.com/.netlify/functions/token-hider?stateName=' +stateName;
     fetch(netFunction).then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    });




}

function test(nodeList) {

    console.log(this);
}
/*function buildURL() {

    alertEndpoint = "https://developer.nps.gov/api/v1/alerts?stateCode=" + stateName + "&api_key=" + apikey;
    parkEndpoint = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateName + "&limit=100&api_key=" + apikey;
    scrolltoAlerts();
}*/

function scrolltoAlerts() {

    const alertsArea = document.querySelector(".alerts");
    const alertsSection= document.querySelector(".alerts_section");
    const alertHeader = document.querySelector(".alert_header");
    alertsSection.scrollIntoView({  behavior: 'smooth' });
alertHeader.innerText= "loading alerts for " + stateName;
alertsArea.innerHTML ="<img src='images/us_stroke_animation.gif' class='center-block img-fluid us_gif' alt='scooterslogo'/>";
    getData(alertsArea, alertHeader);
}


 /* async function getData(alertsArea, alertHeader) {


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
 }*/


function displayAlerts(parksWithAlerts, alertsArea, alertHeader) {

    const hideLoader = document.querySelector('.us_gif');
    const noAlerts = "(no alerts at this time)";
    var cardColumns = document.createElement("div");
    cardColumns.setAttribute('class', 'card-columns');
    hideLoader.style.display = "none";
    alertsArea.appendChild(cardColumns);
alertHeader.innerText = stateName + " alerts";



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
    cardColumns.innerHTML = (eachParkAndAlert);

}
