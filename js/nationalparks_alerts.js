fetch('https://api.nps.gov/api/v1/alerts?api_key=' + apikey)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    });