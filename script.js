var containerWeather = document.getElementById('weather');
var forecastContainer = document.getElementById('five-day');
var historyContainer = document.getElementById('history');

var searchButton = document.getElementById('search-button');
var APIkey = '48a4a22d9d882152e476e1298f5378db';


function getApi() {
  var searchCity = document.getElementById('search-city').city;
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${APIkey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $('#search-city').val('')

      var temp = document.createElement('div');
      temp.textContent = "Temp: " + data.main.temp + " F";
      temp.classList = "current-list-group";

      var cityEl = document.createElement('h3');
      cityEl.textContent = data.name;

      var humidity = document.createElement('div');
      humidity.textContent = "Humidity: " + data.main.humidity + "% ";
      humidity.classList = "current-list-group";

      var windSpeed = document.createElement('div');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph ";
      windSpeed.classList = "current-list-group";

      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityEl.appendChild(weatherIcon);

      var currentDate = document.createElement("div")
      currentDate.textContent = " (" + moment(data.city).calendar("MMM D, YYYY") + ") ";
      cityEl.appendChild(currentDate);

      containerWeather.innerHTML = '';
      containerWeather.append(cityEl, temp, humidity, windSpeed);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      getUv(lat, lon);

      var searchNameEl = document.createElement('h3')
      searchNameEl.textContent = data.name;
      window.localStorage.setItem("h2", data.name);
      window.localStorage.getItem("h2");
      historyContainer.append(searchNameEl);

    });

}

function getFiveDay() {

  var searchCity = document.getElementById('search-city').city;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${APIkey}`;

  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {

      forecastContainer.innerHTML = '';
      for (let i = 0; i < data.list.length; i += 8) {
        var div = document.createElement("div");
        div.style.display = "inline-block";
        div.setAttribute('class', 'col-md-2  col-sm-4')


        var fivecurrentDate = document.createElement("div")
        fivecurrentDate.textContent = moment(data.list[i].dt_txt).calendar("MMM D, YYYY");


        var temp5 = document.createElement('div');
        temp5.textContent = "Temp: " + data.list[i].main.temp + " F";
        temp5.classList = "five-day-list-group";


        var fivehumidity = document.createElement('div');
        fivehumidity.textContent = "Humidity: " + data.list[i].main.humidity + "% ";
        fivehumidity.classList = "five-day-list-group";


        var pic = data.list[i].weather[0].icon
        var fiveweatherIcon = document.createElement("img")
        fiveweatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${pic}@2x.png`);
        fivehumidity.appendChild(fiveweatherIcon);


        temp5.appendChild(fivehumidity);
        fivecurrentDate.appendChild(temp5);
        div.appendChild(fivecurrentDate);
        forecastContainer.appendChild(div);

      }

    })


}

searchButton.addEventListener('click', getApi);
searchButton.addEventListener('click', getFiveDay);
window.addEventListener("load", function () {
  window.localStorage.getItem("history")
})
