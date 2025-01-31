@@ -0,0 +1,57 @@
const apiKey = "ddc15b69fcd3704567309af22c0c7960";
const weatherElement = document.getElementById("weather");
const cityElement = document.getElementById("city-input");
const formElement = document.querySelector("form");
getWeatherData = async (cityValue) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appId=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        
        const temperature = Math.round(data.main.temp);
        
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [`Feels like: ${Math.round(data.main.feels_like)}`, `Humidity: ${data.main.humidity}%`, `Wind speed: ${data.wind.speed} m/s`];
        weatherElement.querySelector('#icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherElement.querySelector("#temp").textContent = `${temperature}°C`;
        weatherElement.querySelector('#desc').textContent = description;
        weatherElement.querySelector(".details").innerHTML = details.map((details) => `<div>${details}</div>`).join("");
    } catch (error) {
        weatherElement.querySelector('#icon').innerHTML = "";
        weatherElement.querySelector("#temp").textContent = "";
        weatherElement.querySelector('#desc').textContent = "An error occurred, please try again.";
        weatherElement.querySelector(".details").innerHTML = "";
    }
}
formSubmit = (event) => {
    event.preventDefault();
    const cityValue = cityElement.value;
    getWeatherData(cityValue);
}
formElement.addEventListener("submit", formSubmit)
