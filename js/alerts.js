var stateName = "";
const states = document.querySelectorAll('path');
const states_mobile = document.getElementById('pick_a_state_function_mobile');
const alertsArea = document.querySelector(".alerts");
const alertsSection = document.querySelector(".alerts_section");
const alertHeader = document.querySelector(".alert_header");


// add event listeners

states.forEach(function (el) {
    el.addEventListener("click", getStateNameDesktop);
});
states_mobile.addEventListener("change", getStateNameMobile);

function getStateNameDesktop() {
    stateName = this.id;
    fetchNetlifyFunction();
    scrolltoAlerts();
}

function getStateNameMobile() {
    stateName = states_mobile[states_mobile.selectedIndex].id;
    fetchNetlifyFunction();
    scrolltoAlerts();
}

async function fetchNetlifyFunction() {

    let netFunction = 'https://npsalerttracker.scooterc.co/.netlify/functions/token-hider?stateName=' + stateName;
    const parksWithAlerts = await fetch(netFunction).then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    });

    displayAlerts(parksWithAlerts);
}


function scrolltoAlerts() {


    alertsSection.scrollIntoView({behavior: 'smooth'});
    alertHeader.innerText = "loading alerts for " + stateName;
    alertsArea.innerHTML = "<img src='images/us_stroke_animation.gif' class='center-block img-fluid us_gif' alt='scooterslogo'/>";

}


async function displayAlerts(parksWithAlerts) {
    const hideLoader = document.querySelector('.us_gif');
    const noAlerts = "(no alerts at this time)";
    var cardColumns = document.createElement("div");
    cardColumns.setAttribute('class', 'card-columns');
    hideLoader.style.display = "none";
    alertsArea.appendChild(cardColumns);
    alertHeader.innerText = stateName + " alerts";


    let eachParkAndAlert = parksWithAlerts.map(function (singlePark) {


        let cardText = singlePark.alertData.map(function (singleAlert) {
            return "<b>" + singleAlert.title + "</b><br>" +
                singleAlert.description + "<br><br>";
        }).join("");

        if (cardText.length === 0) {

            cardText = singlePark.description + "<b> there are no alerts at this time.</b><br>";
        }
        return `
       <div class="natpark card">
        <div class="card-title"><a href="${singlePark.url}" target="_blank"> ${singlePark.fullName}</a><br></div>
        <div class="card-text">${cardText}</div>
</div>
`
    }).join("");
    cardColumns.innerHTML = (eachParkAndAlert);

}
