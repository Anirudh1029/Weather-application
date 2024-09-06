const inputbox = document.querySelector('.input-box');
const searchbutton = document.getElementById('searchbutton');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.Temperature');
const description = document.querySelector('.Description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');
searchbutton.addEventListener('click',()=>{
    checkWeather(inputbox.value);
})

async function checkWeather(cityname){
    const api_key ="37d2ffcb661feccd62f0d2eb40d7c8b3";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    console.log(weather_data);
    if(weather_data.cod === '404'){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Error");
        return;
    }
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML =`${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML =`${weather_data.weather[0].description}`;
    humidity.innerHTML =`${weather_data.main.humidity}%`;
    if(weather_data.sys.country === 'IN'){
        wind_speed.innerHTML = `${Math.round(weather_data.wind.speed*(18/5))}Kmph`;
    }
    else{
        wind_speed.innerHTML = `${weather_data.wind.speed}Kmph`;
    }
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="/pictures/cloud.png";
            break;
        case 'Clear':
            weather_img.src="/pictures/clear.png";
            break;
        case 'Rain':
            weather_img.src="/pictures/rain.png";
            break;
        case 'Mist':
            weather_img.src="/pictures/mist.png";
            break;
        case 'Snow':
            weather_img.src="/pictures/snow.png";
            break;
    }

}