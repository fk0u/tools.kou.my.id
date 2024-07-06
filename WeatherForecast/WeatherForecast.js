async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherOutput = document.getElementById('weatherOutput');

    if (city.trim() === '') {
        weatherOutput.innerHTML = 'Please enter a city name';
        return;
    }

    const apiKey = '6c60bdcc329441f0a8c95409240607'; // Replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            weatherOutput.innerHTML = `Error: ${data.error.message}`;
            return;
        }

        const weather = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c} °C</p>
            <p>Weather: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity} %</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
        `;

        weatherOutput.innerHTML = weather;
    } catch (error) {
        weatherOutput.innerHTML = `Error: ${error.message}`;
    }
}

function goBack() {
    window.history.back();
}
