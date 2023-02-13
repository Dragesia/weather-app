const body = document.querySelector("body");

const city = document.querySelector(".city");
const time = document.querySelector(".time");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");

const input = document.querySelector("input");

const feelslike = document.querySelector(".feelslike > .data");
const wind = document.querySelector(".wind > .data");
const humidity = document.querySelector(".humidity > .data");
const pressure = document.querySelector(".pressure > .data");

const bgImages = ["media/bg/clear.png", "media/bg/rainy.png", "media/bg/snowy.png", "media/bg/sunny.png"];

input.onkeydown = (e) => {
    if(e.key == "Enter") renderPage(getWeather(input.value));
}

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16cee363107451176fe52b1753cbc50c&units=metric`);
    const data = await response.json();
    console.log(data);
    
    if (data.cod == "404") {
        return 0;
    }
    return data;
}

async function renderPage(dataPrm) {
    const data = await dataPrm;
    
    if (!data) return;

    city.innerHTML = data.name;
    time.innerHTML =  new Date().toLocaleString();
    temp.innerHTML = data.main.temp + "&#8451;";
    weather.innerHTML = data.weather[0].main;
    feelslike.innerHTML = data.main.feels_like + "&#8451;";
    wind.innerHTML = data.wind.speed + "km/h";
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + "hPa";

    if (data.weather[0].main == "Thunderstorm" || data.weather[0].main == "Drizzle" || data.weather[0].main == "Rain" || data.weather[0].main == "Clouds") {
        body.style.backgroundImage = `url(${bgImages[1]})`;
    } else if (data.weather[0].main == "Clear") {
        body.style.backgroundImage = `url(${bgImages[0]})`;
    } else if (data.weather[0].main == "Snow" || data.weather[0].main == "Atmosphere") {
        body.style.backgroundImage = `url(${bgImages[2]})`;
    }
}

renderPage(getWeather("Manchester"));
