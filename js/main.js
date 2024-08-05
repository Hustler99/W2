async function getDataFromApi(city) {
    let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=59a90f04df35401db86141520240605&q=${city}&days=5&aqi=no&alerts=no`);
    let response = await data.json();
    console.log(response);
    let location = (response.location)
    let current = (response.current)
    let forecast = (response.forecast)
    displaySidrbar1(response)
}
getDataFromApi("Giza")
function displaySidrbar1(x) {
    const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Firday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date()
    document.getElementById("currentWeather").innerHTML = `${x.current.temp_c}°c`
    document.getElementById("WeatherStatus").innerHTML = `${x.current.condition.text}`
    document.getElementById("imgWeather").setAttribute(`src`, `${x.current.condition.icon}`)
    document.getElementById("day").innerHTML = `<i class="fa-regular fa-calendar me-2"></i> ${arr[date.getDay(x.location.localtime)]}`
    document.getElementById("location").innerHTML = `<i class="fa-solid fa-location-dot me-2"></i> ${x.location.name}`
    document.getElementById("w1").innerHTML = `<i class="fa-solid fa-location-dot me-2"></i> ${x.current.wind_dir}`
    document.getElementById("w2").innerHTML = ` ${x.current.wind_kph} Kph`
    document.getElementById("w3").innerHTML = ` ${x.current.wind_mph} Mph`
    document.getElementById("pressure").innerHTML = ` ${x.current.pressure_mb}hPa`
    document.getElementById("humidity").innerHTML = ` ${x.current.humidity.toFixed()}%`
    document.getElementById("feels").innerHTML = ` ${x.current.feelslike_c}°c`
    document.getElementById("sunrise").innerHTML = ` <i class="fa-solid fa-sun fa-2xl me-3"></i> ${x.forecast.forecastday[0].astro.sunrise}`
    document.getElementById("sunset").innerHTML = `<i class="fa-solid fa-moon fa-2xl me-3"></i> ${x.forecast.forecastday[0].astro.sunset}`

    for (let i = 1; i <= 4; i++) {
        const avgTemp = x.forecast.forecastday[i].day.avgtemp_c;
        const formattedTemp = `${avgTemp}°C`;
        const elementId = `f${i}`;

        document.getElementById(elementId).innerHTML = `<i class="fa-solid fa-temperature-three-quarters me-1"></i> ${formattedTemp}`;
    }

    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (var i = 1; i <= 4; i++) {
        var dateString = x.forecast.forecastday[i].date;
        var dateObject = new Date(dateString);
        var dayOfWeek = weekdays[dateObject.getDay()];
        document.getElementById("dd" + i).innerHTML = dayOfWeek;
    }
    for (let i = 1; i <= 9; i++) {
        const hourIndex = 2 * i - 2;
        const temperature = x.forecast.forecastday[0].hour[hourIndex].temp_c;
        const elementId = `ww${i}`;

        document.getElementById(elementId).innerHTML = ` ${temperature}°C`;
    }


}
function getCoords() {
    const successCallback = (position) => {
        let lat  = (position.coords.latitude);
        let long  = (position.coords.longitude)
        getCity(lat, long)
      };
      
      const errorCallback = (error) => {
        console.log(error);
      };
      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
}



async function getCity(x, y) {
    let data = await fetch(`https://geocode.maps.co/reverse?lat=${x}&lon=${y}&api_key=663a1ef0817ec848939490twoce681f`)
    let resp = await data.json();
    getDataFromApi(resp.address.state)
}

    let btnLocation = document.getElementById("locationBtn");
    btnLocation.addEventListener("click", function (e) {
        getCoords()
    })
    
let searchInput = document.getElementById("searchWth");
searchInput.addEventListener("change", function (e) {
    console.log(searchInput.value)
    getDataFromApi(searchInput.value)
})


