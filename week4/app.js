//API KEY
const apiKey = '03a1ffe6faa9f6ce7fc8286878499f6f';

//Variables to store references to elements
const cityInput = document.getElementById('cityInput');
const btn = document.getElementById('btn');
const weatherContainer = document.getElementById('weather-info');

//Event listener to the button to detect when it is clicked
btn.addEventListener('click', function () {
    //Value of the input field (city name)
    const city = cityInput.value.trim();

    if (city === '') {// If the city input is nothing
        alert('Please enter a city name.');// Alert messsage
        return;
    }

    //HTTP request to the OpenWeatherMap API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {// If its not a valid city
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            //Updates the weather info div with weather details
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            // A new weather card and insert it above the existing content
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weather-card';

            const weatherHTML = `
                <h2>Weather in ${city}:</h2>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;

            weatherCard.innerHTML = weatherHTML;
            weatherContainer.insertBefore(weatherCard, weatherContainer.firstChild); // Inserts above the existing content

            // Clears the input field
            cityInput.value = '';
        })
        .catch(error => {
            //Error handling
            if (error.message === 'City not found') {
                alert('City not found. Please enter a valid city name.');
            } else {
                console.error('An error occurred:', error);
            }
        });
});