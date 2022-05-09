let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes},`;
  return formattedDate;
}

let elementDate = document.querySelector("#current-time");
elementDate.innerHTML = formatDate(currentTime);

//

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  

let days=["Thu", "Fri", "Sat", "Sun"];
let forecastHTML = `<div class="row">`;

days.forEach(function(day){

        forecastHTML = forecastHTML +
          `
                <div class="col-2">
                        <div class="weather-forecast-date">
                            ${day}
                        </div>
                        <img
                            src="images/sunny.png" alt="" width="42"/> <br/>
                            <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">18º</span> 
                            <span class="weather-forecast-temperature-min">13º</span>
                            </div>
                </div>
            `;

});
  
forecastHTML=forecastHTML + `</div>`;

  forecastElement.innerHTML =forecastHTML;

  console.log(forecastHTML);
}

displayForecast();


//

function showTemperature(response) {
  let temperatureC = Math.round(response.data.main.temp);
  let temperatureCElement = document.querySelector("#temperature");
  temperatureCElement.innerHTML = `${temperatureC}ºC`;

  let temperatureF = Math.round(temperatureC * 1.8 + 32);

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
//
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);

//

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
}




///

///

function submitCity(event) {
  event.preventDefault();
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


