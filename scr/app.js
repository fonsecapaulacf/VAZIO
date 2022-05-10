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
  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes},`;
  return formattedDate;
}
let elementDate = document.querySelector("#current-time");
elementDate.innerHTML = formatDate(currentTime);

/////////

function formatDay(timestamp){
let date= new Date(timestamp *1000);
let day=date.getDay();
let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[day];
}




/////  DISPLAY TEMPERATURES PER WEEK DAYS

function displayForecast(response) {
    let forecast=response.data.daily;

    let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach(function(forecastDay, index){
    if (index<6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}
                        </div>
                        <img
                            src="http://openweathermap.org/img/wn/${
                              forecastDay.weather[0].icon
                            }@2x.png" alt="" width="42"/> <br/>
                            <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">${Math.round(
                              forecastDay.temp.max
                            )}º</span> 
                            <span class="weather-forecast-temperature-min">${Math.round(
                              forecastDay.temp.min
                            )}º</span>
                            </div>
                </div>`;
    }
});
forecastHTML=forecastHTML + `</div>`;
forecastElement.innerHTML =forecastHTML;
}

/////////

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
  temperatureCElement.innerHTML = `${temperatureC}ºC`;
  let temperatureF = Math.round(temperatureC * 1.8 + 32);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);



getForecast(response.data.coord);
}







////UNIT CONVERSION

  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureFElement = document.querySelector("#temperature");
    temperatureFElement.innerHTML = `${temperatureF}ºF`;
  }
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureCElement = document.querySelector("#temperature");
    temperatureCElement.innerHTML = `${temperatureC}ºC`;
  }
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);







///SUBMIT THE WEATHER OF THE CITY YOU'VE SEARCHED FOR + API

function submitCity(event) {
  let currentCityWeather = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city-display");
  currentCity.innerHTML = `${currentCityWeather.value}`;
  let apiKey = "b0661e5e22b852583e44461d886f5f6a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityWeather.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  return currentCity;
}
let getCity = document.querySelector("#city-form");
getCity.addEventListener("submit", submitCity);


