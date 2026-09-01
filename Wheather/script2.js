document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-wheather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "f311e5e1485f89cf09496970ad27ea77";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);

      displayWeatherData(weatherData);
    } catch (error) {
      console.log(error);
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=$
    {city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log(data);

    return data;
  }

  function displayWeatherData(weatherData) {
    console.log(weatherData);

    cityNameDisplay.textContent = weatherData.name;

    temperatureDisplay.textContent = `${weatherData.main.temp}°C`;

    descriptionDisplay.textContent = weatherData.weather[0].description;

    weatherInfo.classList.remove("hidden");

    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");

    errorMessage.classList.remove("hidden");
  }
});
