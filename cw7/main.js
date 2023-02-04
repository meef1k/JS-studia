const weatherContainer = document.querySelector("#weather-container");
const cityInput = document.querySelector("#city-input");
const form = document.querySelector("form");
const API_KEY = 'a9ebd01cbb3c7bbee0307f3a5447a364';
const units = 'metric';

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  cityInput.value = "";
  if (weatherContainer.children.length < 10) {
    getWeather(city, createWeatherCard);
  } else {
    alert("You have reached the limit of 10 cities.");
  }
});

function getWeather(city, callback) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
}

function createWeatherCard(data) {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  const cityName = document.createElement("h2");
  cityName.textContent = data.name;
  weatherCard.appendChild(cityName);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherCard.appendChild(weatherIcon);

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherCard.appendChild(temperature);

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weatherCard.appendChild(humidity);

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", () => {
    weatherCard.remove();
    const cityNames = document.querySelectorAll(".weather-card h2");
    const cities = [];
    cityNames.forEach((city) => {
      cities.push(city.textContent);
    });
    localStorage.setItem("savedCities", JSON.stringify(cities));
  });
  weatherCard.appendChild(removeBtn);

  weatherContainer.appendChild(weatherCard);

  const cityNames = document.querySelectorAll(".weather-card h2");
  const cities = [];
  cityNames.forEach((city) => {
    cities.push(city.textContent);
  });
  localStorage.setItem("savedCities", JSON.stringify(cities));
}

const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
savedCities.forEach((city) => {
  getWeather(city, createWeatherCard);
});
