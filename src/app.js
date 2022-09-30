let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuethday",
  "Wednesday",
  "Thurthday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayElement = document.querySelector("#day");
let timeElement = document.querySelector("#time");
dayElement.innerHTML = day;
timeElement.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index <= 6)) {
      forecastCelsiusMax = Math.round(forecastDay.temp.max);
      forecastCelsiusMin = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-2">
                <div class="forecast-day">${formatDay(forecastDay.dt)}</div>

                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="30"
                />
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max" id="forecastTemperatureMax">${forecastCelsiusMax}°</span>
                  <span class="forecast-temperature-min" id="forecastTemperatureMin"> ${forecastCelsiusMin}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "017d56650cd168d68067850318775d43";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
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
function search(city) {
  let apiKey = "017d56650cd168d68067850318775d43";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleInput(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let forecastTemperatureMaxElement = document.querySelector(
    "#forecastTemperatureMax"
  );
  let forecastFahrenheitMax = (forecastCelsiusMax * 9) / 5 + 32;
  let forecastTemperatureMinElement = document.querySelector(
    "#forecastTemperatureMin"
  );
  let forecastFahrenheitMin = (forecastCelsiusMin * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  forecastTemperatureMaxElement.innerHTML = Math.round(forecastFahrenheitMax);
  forecastTemperatureMinElement.innerHTML = Math.round(forecastFahrenheitMin);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let forecastTemperatureMaxElement = document.querySelector(
    "#forecastTemperatureMax"
  );
  forecastTemperatureMaxElement.innerHTML = forecastCelsiusMax;
  let forecastTemperatureMinElement = document.querySelector(
    "#forecastTemperatureMin"
  );
  forecastTemperatureMinElement.innerHTML = forecastCelsiusMin;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleInput);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;
let forecastCelsiusMax = null;
let forecastCelsiusMin = null;
search("Kyiv");
