const API_KEY = "1fa7b88aa5110c092a98daaa77239f59";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("search-btn");
const weatherDisplay = document.getElementById("weatherDisplay");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a City Name");
    return;
  }

  hideAllSections();
  fetchWeatherData(city);
}

async function fetchWeatherData(city) {
  try {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else if (response.status === 401) {
        throw new Error("Invalid API Key");
      } else {
        throw new Error("Failed to fetch weather data.");
      }
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    showError(error.message);
  }
}

function displayWeatherData(data) {
  const cityNameText = `${data.name}, ${data.sys.country}`;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const feelsLikeTemp = Math.round(data.main.feels_like);
  const humidityValue = data.main.humidity;
  const windSpeedValue = Math.round(data.wind.speed);

  cityName.textContent = cityNameText;
  temperature.textContent = temp;
  weatherDescription.textContent = description;
  feelsLike.textContent = feelsLikeTemp;
  humidity.textContent = humidityValue;
  windSpeed.textContent = windSpeedValue;

  showWeatherDisplay();
}

function showError(message) {
  errorMessage.textContent = message;
  error.classList.remove("hidden");
}

function hideError() {
  error.classList.add("hidden");
}

function showWeatherDisplay() {
  weatherDisplay.classList.remove("hidden");
}

function hideWeatherDisplay() {
  weatherDisplay.classList.add("hidden");
}

function hideAllSections() {
  hideError();
  hideWeatherDisplay();
}
