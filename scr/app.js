///DATE AND HOUR
    let currentTime = new Date();
function formatDate(date) {
    let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"];
    let currentDay = days[date.getDay()];
    let currentHour = currentTime.getHours();
        if (currentHour < 10) {
            currentHour = `0${currentHour}`;}
    let currentMinutes = currentTime.getMinutes();
        if (currentMinutes < 10) {
            currentMinutes = `0${currentMinutes}`;}
    let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
return formattedDate;
}
let elementDate = document.querySelector("#current-time");
elementDate.innerHTML = formatDate(currentTime);

/////  DISPLAY TEMPERATURES PER WEEK DAYS
function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
        let forecast=response.data.daily;
        let forecastElement = document.querySelector("#forecast");
        let forecastHTML = `<div class="row">`;
    
        forecast.forEach(function(forecastDay, index){
            if (index<6) {
                forecastHTML =forecastHTML +
                        `<div class="col-2">
                                <div class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></div>
                                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/> <br/>
                                <div class="weather-forecast-temperatures">
                                        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}º</span> 
                                        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}º</span>
                                </div>
                        </div>`;
            }
        }
);
        forecastHTML=forecastHTML + `</div>`;
        forecastElement.innerHTML =forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey="b0661e5e22b852583e44461d886f5f6a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

/////   DISPLAY CURRENT TEMPERATURES PER CITY

function showTemperature(response) {
            let temperatureC = Math.round(response.data.main.temp);
            let temperatureCElement = document.querySelector("#temperature");
            let cityElement=document.querySelector("#city-display");
            let descriptionElement = document.querySelector("#description");
            let humidityElement = document.querySelector("#humidity");
            let windElement = document.querySelector("#wind");
            let iconElement = document.querySelector("#icon");

            temperatureCElement.innerHTML = `${temperatureC}ºC`;
            cityElement.innerHTML=response.data.name;
            descriptionElement.innerHTML = response.data.weather[0].description;
            humidityElement.innerHTML = response.data.main.humidity;
            windElement.innerHTML = Math.round(response.data.wind.speed);
            iconElement.setAttribute("alt", response.data.weather[0].description);
            iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

///SUBMIT THE WEATHER OF THE CITY YOU'VE SEARCHED FOR + API

function search(city) {
        let apiKey = "b0661e5e22b852583e44461d886f5f6a";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(`${apiUrl}`).then(showTemperature);
}
  
function handleSubmit(event){
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input");
        search(cityInputElement.value);
}

let getCity = document.querySelector("#city-form");
getCity.addEventListener("submit", handleSubmit);

search("Lille");
