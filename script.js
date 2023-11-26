// fetch the data from restcountries.com

fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((data) => displayCountries(data))
  .catch((error) => console.error("Error:", error));

// Function to display countries as cards
function displayCountries(countries) {
  const countryRow = document.getElementById("countryRow");

  countries.forEach((country) => {
    // Create card element
    const card = document.createElement("div");
    card.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4");
    card.innerHTML = `
            <div class="card h-100 text-center">
                <div class="card-header text-bg-info fs-5 fw-bold mb-1 text-center" >
                    ${country.name}
                </div>
                <div class="img-center">
                <img src="${country.flags.png}" class="card-img-top" alt="${
      country.name
    } - Flag">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-bg-light text-center">Details about ${
                      country.name
                    }</h5>
                    <div class="card-text text-center">
                        Capital: ${country.capital}<br>
                        Region: ${country.region}<br>
                        Native Name: ${country.nativeName}<br>
                        Population: ${country.population}<br>
                        Country Code: ${country.alpha3Code}<br>
                        Lat/Lng: ${
                          country.latlng ? country.latlng.join(", ") : "N/A"
                        }<br>
                    </div>
                    <button class="btn btn-primary m-3" onclick="getWeather('${
                      country.capital
                    }')">Click for Weather</button>
                </div>
            </div>
        `;
    countryRow.appendChild(card);
  });
}

// Function to fetch weather data from openweathermap.org
window.getWeather = function (city) {
  const apiKey = "30b3d8e52d5cae6cc64ae179046e0ad8";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => displayWeatherAlert(data))
    .catch((error) => console.error("Error:", error));
};

// Function to display weather details in an alert pop, after clicked "click for weather" button
function displayWeatherAlert(weatherData) {
  alert(`Current Weather Details:
        \nMain: ${weatherData.weather[0].main}
        \nDescription: ${weatherData.weather[0].description}
        \nTemperature: ${weatherData.main.temp} Kelvin
        \nHumidity: ${weatherData.main.humidity}%
        \nCloudiness: ${weatherData.clouds.all}%
        \nWind Speed: ${weatherData.wind.speed} m/s`);
}
