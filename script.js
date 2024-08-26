const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherforecast = document.getElementById('weather-forecast');
const currentTemp1 = document.getElementById('current-temp')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// const API_KEY ='10fe84fd7408aeefb9b8cb429ea67f13';
const API_KEY = '04914b1b93c14ec6bb092047242408';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12hrformat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const min = minutes < 10 ? '0' + minutes : minutes
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeE1.innerHTML = hoursIn12hrformat + ':' + min + '' + `<span id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        // console.log(success);

        let { latitude, longitude } = success.coords;

        // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res => res.json()).then(data => {
        // console.log(data);

        // })

        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&exclude=hourly,minutely`).then(res => res.json()).then(data => {
            console.log(data);
            // showWeatherData(data);

            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&dt=${date}&days=7`).then(res => res.json()).then(data1 => {
                console.log(data1);
                showCurrentWeatherData(data, data1)
                showForecastData(data1);

            })
                .catch(error => console.error('Error fetching data:', error));
        })
            .catch(error => console.error('Error fetching data:', error));
    })
}

// function showWeatherData(data,data1){
//     let {humidity, wind_kph: wind_speed, pressure_mb: pressure,temp_c, condition} = data.current
//     let {sunrise, sunset} = data1.forecast.forecastday[0].astro;
//     let{name: city, country} = data.location;
//     // let iconUrl = `https:${data1.forecast.forecastday[0].day.condition.icon}`
//     // console.log(iconUrl);


//     const currentWeatherItems = document.getElementById('current-weather-items')
//     currentWeatherItems.innerHTML=
//     `<div class="weather-items">
//             <div>City</div>
//             <div>${city}, ${country}</div>
//     </div>
//     <div class="weather-items">
//             <div>Temperature</div>
//             <div>${temp_c}&#176; C</div>
//     </div>
//     <div class="weather-items">
//             <div>Condition</div>
//             <div>${condition.text}</div>
//     </div>
//     <div class="others" id="current-weather-items">
//         <div class="weather-items">
//         <div>Humidity</div>
//         <div>${humidity}</div>
//     </div>
//     <div class="weather-items">
//         <div>Windspeed</div>
//         <div>${wind_speed}</div>
//     </div>
//     <div class="weather-items">
//         <div>Pressure</div>
//         <div>${pressure}</div>
//     </div>
//     <div class="weather-items">
//         <div>Sunrise</div>
//         <div>${sunrise}</div>
//      </div>
//     <div class="weather-items">
//         <div>Sunset</div>
//         <div>${sunset}</div>
//     </div>`;

//         let otherDayForecast= ""
//     data1.forecast.forecastday.forEach((day, idx) => {
//         let iconUrl = `https:${day.day.condition.icon}`;
//         console.log(iconUrl);

//         if(idx == 0){
//             currentTemp1.innerHTML = `
//             <img src="${iconUrl}" alt="weather-icon" id="w-icon">
//             <div class="others">
//             <div class="day">${days[new Date(day.date).getDay()]}</div>
//             <div class="temp">Night-${day.day.mintemp_c}&#176; C</div>
//             <div class="temp">Day-${day.day.maxtemp_c}&#176; C</div>
//             </div>
//             `
//         }else{
//             otherDayForecast += `
//                 <div class="weather-forecast-item">
//                 <div class="day">${days[new Date(day.date).getDay()]}</div>
//                 <img src="${iconUrl}" alt="Weather Icon">
//                 <div class="temp">Night-${day.day.mintemp_c}&#176; C</div>
//                 <div class="temp">Day-${day.day.maxtemp_c}&#176; C</div>
//             </div>`

//         }
//     });

//     weatherforecast.innerHTML = otherDayForecast;
// }

function showCurrentWeatherData(data, data1) {
    if (!data || !data.current || !data.location) {
        console.error('Invalid current weather data structure:', data);
        return;

    }
    let { humidity, wind_kph: wind_speed, pressure_mb: pressure, temp_c, condition } = data.current;
    let { name: city, country,tz_id: time_zone } = data.location;
    let { sunrise, sunset } = data1.forecast.forecastday[0].astro;

    timezone.innerHTML= `
    <div class="time-zone" id="time-zone">${time_zone}</div>
    <div id="country" class="country">${country}</div>
    `

    currentWeatherItems.innerHTML = `
    <div class="weather-items">
            <div>City</div>
            <div>${city}, ${country}</div>
        </div>
        <div class="weather-items">
            <div>Temperature</div>
            <div>${temp_c}&#176; C</div>
        </div>
        <div class="weather-items">
            <div>Condition</div>
            <div>${condition.text}</div>
        </div>
        <div class="weather-items">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-items">
            <div>Wind Speed</div>
            <div>${wind_speed} kph</div>
        </div>
        <div class="weather-items">
            <div>Pressure</div>
            <div>${pressure} mb</div>
        </div>
        <div class="weather-items">
            <div>Sunrise</div>
            <div>${sunrise}</div>
        </div>
        <div class="weather-items">
            <div>Sunset</div>
            <div>${sunset}</div>
        </div>`;

}

function showForecastData(data1) {
    if (!data1 || !data1.forecast.forecastday) {
        console.error('Invalid forecast data structure:', data1);
        return;

    }

    let otherDayForecast = "";
    data1.forecast.forecastday.forEach((day, idx) => {
        let iconUrl = `https:${day.day.condition.icon}`;

        if (idx == 0) {
            currentTemp1.innerHTML = `
            <img src ="${iconUrl}" alt= "weather-icon" id="w-icon">
            <div class="others">
                <div class="day">${days[new Date(day.date).getDay()]}</div>
                <div class="temp">Night - ${day.day.mintemp_c}&#176; C</div>
                <div class="temp">Day - ${day.day.maxtemp_c}&#176; C</div>
            </div>;
            `
        } else {
            otherDayForecast += `
             <div class="weather-forecast-item">
                    <div class="day">${days[new Date(day.date).getDay()]}</div>
                    <img src="${iconUrl}" alt="Weather Icon">
                    <div class="temp">Night - ${day.day.mintemp_c}&#176; C</div>
                    <div class="temp">Day - ${day.day.maxtemp_c}&#176; C</div>
                </div>`;
        }
    });
    weatherforecast.innerHTML = otherDayForecast;
}

document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('search-input').value;
    if (city) {
        fetchWeatherDataByCity(city);
    }
});

function fetchWeatherDataByCity(city) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
        .then(res => res.json())
        .then(data => {
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`)
                .then(res => res.json())
                .then(data1 => {
                    showCurrentWeatherData(data, data1);
                    showForecastData(data1);
                    console.log(data);
                    
                })

                // showWeatherData(data);
                .catch(error => console.error('Error fetching forecast data:', error));
        })
        .catch(error => console.error('Error fetchong data', error));
}
