function getWeatherData() {
  const cityInput = document.getElementById("cityName").value.trim().toLowerCase();
  const result = document.getElementById("weatherResult");
  result.innerHTML = "";

  if (!cityInput) {
    result.innerHTML = '<p class="error-message">Please enter a city name.</p>';
    return;
  }

  result.innerHTML = '<p class="loading">Loading...</p>';

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        const matchedCity = Object.keys(data).find(
          city => city.toLowerCase() === cityInput
        );

        if (matchedCity) {
          const weather = data[matchedCity];
          result.innerHTML = `
            <div class="weather-card">
              <h3>${matchedCity}</h3>
              <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
              <p><strong>Humidity:</strong> ${weather.humidity}%</p>
              <p><strong>Conditions:</strong> ${weather.conditions}</p>
            </div>
          `;
        } else {
          result.innerHTML = '<p class="error-message">City not found.</p>';
        }
      } catch {
        result.innerHTML = '<p class="error-message">Error processing data.</p>';
      }
    } else {
      result.innerHTML = '<p class="error-message">Failed to fetch data.</p>';
    }
  };

  xhr.send();
}
