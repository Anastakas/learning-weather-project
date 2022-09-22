function showTemperature(response) {
  console.log(response.data);
}

let apiKey = "d33243fa11c3284dcffcf337fc75caaa";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);

axios.get(apiUrl).then(showTemperature);
