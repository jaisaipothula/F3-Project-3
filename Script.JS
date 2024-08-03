// script.js
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('fetchDataBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, { timeout: 10000 });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    updateMap(latitude, longitude);
    fetchWeatherData(latitude, longitude);
}

function error(err) {
    alert(`Error: ${err.message}`);
}

function updateMap(latitude, longitude) {
    const iframeSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    document.getElementById('map').src = iframeSrc;
}

function fetchWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.current) {
                displayWeatherData(data);
            } else {
                document.getElementById('weather').innerHTML = '<p>No weather data available.</p>';
            }
        })
        .catch(err => {
            console.error('Error fetching weather data:', err);
            document.getElementById('weather').innerHTML = '<p>Error fetching weather data.</p>';
        });
}

function displayWeatherData(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>Weather Information</h2>
        <p><strong>Temperature:</strong> ${data.current.temp} °C</p>
        <p><strong>Weather:</strong> ${data.current.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_speed} m/s</p>
    `;
}
