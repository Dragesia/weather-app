const body = document.querySelector("body");

const city = document.querySelector(".city");
const clock = document.querySelector(".hour");
const time = document.querySelector(".time");
const temp = document.querySelector(".temp");
const img = document.querySelector(".main > img");
const weather = document.querySelector(".weather");

const input = document.querySelector("input");

const feelslike = document.querySelector(".feelslike > .data");
const wind = document.querySelector(".wind > .data");
const humidity = document.querySelector(".humidity > .data");
const pressure = document.querySelector(".pressure > .data");

const bgImages = ["media/bg/clear.png", "media/bg/rainy.png", "media/bg/snowy.png", "media/bg/sunny.png"];

input.onkeydown = (e) => {
    if(e.key == "Enter") {
        renderPage(getWeather(input.value));
        input.value = "";
    }
}

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16cee363107451176fe52b1753cbc50c&units=metric`);
    const data = await response.json();
    
    if (data.cod == "404") {
        return 0;
    }
    localStorage.setItem("lastCity", city);
    return data;
}

async function renderPage(dataPrm) {
    const data = await dataPrm;
    
    if (!data) return;

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    let fullHour = hour + ":" + minutes;
    let fullDate = day + "." + month + "." + year;

    city.innerHTML = data.name;
    clock.innerHTML = fullHour;
    time.innerHTML =  fullDate;
    temp.innerHTML = Math.round(data.main.temp) + "&#8451;";
    // weather.innerHTML = data.weather[0].main;
    feelslike.innerHTML = Math.round(data.main.feels_like) + "&#8451;";
    wind.innerHTML = data.wind.speed + "km/h";
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + "hPa";

    if (data.weather[0].main == "Clear") {
        // img.src = "media/ico/mainclear.png";
        body.style.backgroundImage = `url(${bgImages[0]})`;
    } else if (data.weather[0].main == "Clouds") {
        // img.src = "media/ico/maincloud.png";
        body.style.backgroundImage = `url(${bgImages[1]})`;
    } else if (data.weather[0].main == "Atmosphere") {
        // img.src = "media/ico/mainatmosphere.png";
        body.style.backgroundImage = `url(${bgImages[2]})`;
    } else if (data.weather[0].main == "Rain") {
        // img.src = "media/ico/mainrain.png";
        body.style.backgroundImage = `url(${bgImages[1]})`;
    } else if (data.weather[0].main == "Drizzle") {
        // img.src = "media/ico/maindrizzle.png";
        body.style.backgroundImage = `url(${bgImages[1]})`;
    } else if (data.weather[0].main == "Thunderstorm") {
        // img.src = "media/ico/mainthunderstorm.png";
        body.style.backgroundImage = `url(${bgImages[1]})`;
    } else if (data.weather[0].main == "Snow") {
        // img.src = "media/ico/mainsnow.png";
        body.style.backgroundImage = `url(${bgImages[2]})`;
    }
}

renderPage(getWeather("Manchester"));
renderPage(getWeather(localStorage.getItem("lastCity")));
