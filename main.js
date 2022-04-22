let apiKey = document.querySelector("#api-key");
let addressInput = document.querySelector("#address");
let satelliteInput = document.querySelector("#norad");
let search = document.querySelector("#search");
let output = document.querySelector("#output");

let key = "pk.eyJ1Ijoia3luZ211cnJheSIsImEiOiJjbDJhbmRneHIwNmcxM2pvMndqcjNpdHhhIn0.nScB0xgB3rTnh0r2f6wRdw";



search.addEventListener("click", function () {
    apiKey.value = key;
    console.log("apiKey");
    let address = addressInput.value;
    let satellite = satelliteInput.value;
    let lat = "";
    let long = "";


    fetch(encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey.value}`))
        .then(function (httpResponse) {
            return httpResponse.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.features[0].center[0]);
            console.log(data.features[0].center[1]);

            lat = Number(data.features[0].center[1]);
            long = Number(data.features[0].center[0]);
            console.log(`${lat} and ${long}`);

    fetch(`https://satellites.fly.dev/passes/${satellite}?lat=${lat}&lon=${long}&limit=1`)
    .then(function (httpResponse) {
        return httpResponse.json();
    })
    .then(function (data) {
        console.log(data);
        const rise = document.createElement("div");
        const culminate = document.createElement("div");
        const set = document.createElement("div");

        output.appendChild(rise);
        output.appendChild(culminate);
        output.appendChild(set);

        let riseUTC = new Date(data[0].rise.utc_datetime);
        let culminateUTC = new Date(data[0].culmination.utc_datetime);
        let setUTC = new Date(data[0].set.utc_datetime);

        rise.innerText = `Rise Time: ${riseUTC}`;
        culminate.innerText = `Culmination Time: ${culminateUTC}`;
        set.innerText = `Set Time: ${setUTC}`;

    })

        })


}
)