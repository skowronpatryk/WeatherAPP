/* *************************
        SCREEN LOADING
*************************** */

const showApp = () => {
    document.querySelector('.lds-dual-ring').classList.add('display-none');
    document.querySelector('main').removeAttribute('hidden');
}

const loadApp = () => {
    document.querySelector('.lds-dual-ring').classList.remove('display-none');
    document.querySelector('main').setAttribute('hidden', 'true');
}

window.addEventListener('load', showApp);

/* *************************
            MENU
*************************** */

const menu = document.querySelector('.menu-container')

const showMenu = () => menu.style.right = 0;
const hideMenu = () => menu.style.right = '-60%';

document.querySelector('.close-menu-btn').addEventListener('click', hideMenu);
document.querySelector('.open-menu-btn').addEventListener('click', showMenu);


/* *************************
    TOGGLE HOURLY WEATHER
*************************** */

const toggleWeather = () => {
    let hourlyWeather = document.querySelector('.hourly-weather-wrapper');
    let arrow = document.querySelector('.toggle-weather').children[0];
    let visible = hourlyWeather.getAttribute('visible');
    let dailyWeather = document.querySelector('.daily-weather-wrapper');

    if( visible == 'false') {
        hourlyWeather.setAttribute('visible', 'true');
        hourlyWeather.style.bottom = 0;
        dailyWeather.style.bottom = '-100%';
        arrow.style.transform = 'rotate(180deg)';
        dailyWeather.style.opacity = 0;
    } else if ( visible == 'true') {
        hourlyWeather.setAttribute('visible', 'false');
        hourlyWeather.style.bottom = '-100%';
        dailyWeather.style.bottom = 0;
        arrow.style.transform = 'rotate(0deg)';
        dailyWeather.style.opacity = 1;
    } else {
        console.error('Bład ze stanem godzinowej pogody i atrybutem VISIBLE')
    }
}

document.querySelector('.toggle-weather').addEventListener('click', toggleWeather)

const drawWeatherData = (data, location) => {
    let currentData = data.currently;
    let dailyData = data.daily.data;
    let hourlyData = data.hourly.data;
    const weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    console.log(currentData.summary)

    const dailyWeatherWrapper = document.querySelector('.daily-weather-wrapper');
    let dailyWeatherModel;
    let day;
    let maxMinTemp;
    let dailyIcon;

    const hourlyWeatherWrapper = document.querySelector('.hourly-weather-wrapper');
    let hourlyWeatherModel;
    let hourlyIcon;

    // Lokalizacja
    document.querySelector('.location-label').innerHTML = location;
    document.querySelector('.current_weather_container--location').innerHTML = location;
    // Koniec lokalizacji

    // Background
    document.querySelector('main').style.backgroundImage = `url(./images/bg-images/${currentData.icon}.jpg)`;
    // Koniec Background

    // Icona pogody
    document.querySelector('.currentlyIcon').setAttribute('src', `./images/temperature-icons/${currentData.icon}-white.png`)
    // Koniec Icona pogody

    // Opis pogody
    if (currentData.summary == 'Mostly Cloudy') {
        document.querySelector('.current_weather_container_temperature--summary').innerHTML = 'Duże zachmurzenie';
    } else if (currentData.summary == 'Clear') {
        document.querySelector('.current_weather_container_temperature--summary').innerHTML = 'Czyste niebo';
    } else if (currentData.summary == 'Overcast') {
        document.querySelector('.current_weather_container_temperature--summary').innerHTML = 'Pochmurno';
    } else if (currentData.summary == 'Partly Cloudy') {
        document.querySelector('.current_weather_container_temperature--summary').innerHTML = 'Częściowe zachmurzenie';
    } else if (currentData.summary == 'Drizzle') {
        document.querySelector('.current_weather_container_temperature--summary').innerHTML = 'Mżawka';
    }
    // Koniec Opis pogody

    // Temperatura
    document.querySelector('.current_weather_container_temperature--degrees').innerHTML = Math.round((currentData.temperature - 32) * 5 / 9) + '&#176;';
    // Koniec Temperatura

    // Wilgotność
    document.querySelector('.current_weather_container_wind--desc').innerHTML = Math.round(currentData.humidity * 100) + '%';
    // Koniec Wilgotność

    // Prędkość wiatru
    document.querySelector('.current_weather_container_wind--wind').innerHTML = (currentData.windSpeed * 1.6093).toFixed(1) + ' km/h'; 
    // Koniec Prędkość wiatru

     // DZIENNA POGODA
    // Ustawianie dziennej pogody
    while (dailyWeatherWrapper.children[1]){ 
        dailyWeatherWrapper.removeChild(dailyWeatherWrapper.children[1])
    }
    
    for (let i = 0; i <= 6; i ++) {
        // Klonujemy wartość dailyWeather i usuwamy klasę display-none
        dailyWeatherModel = dailyWeatherWrapper.children[0].cloneNode(true);
        dailyWeatherModel.classList.remove('display-none');
        // Ustawiamy dzień
        day = weekDays[new Date(dailyData[i].time * 1000).getDay()];
        dailyWeatherModel.children[0].children[0].innerHTML = day;
        // Ustawiamy temeperatury minimalne i maksymalne
        maxMinTemp = Math.round((dailyData[i].temperatureMax - 32) * 5 / 9) + '&#176;' + '/' + Math.round((dailyData[i].temperatureMin - 32) * 5 / 9) + '&#176;';
        dailyWeatherModel.children[1].children[0].innerHTML = maxMinTemp;
        // Ikony na każdy dzień
        dailyIcon = dailyData[i].icon;
        dailyWeatherModel.children[1].children[1].children[0].setAttribute('src', `./images/temperature-icons/${dailyIcon}-white.png`);
        // Dodawanie wartości do strony
        dailyWeatherWrapper.appendChild(dailyWeatherModel);
    }

    dailyWeatherWrapper.children[1].classList.add('current-day-of-the-weekday-of-the-week');

    // GODZINOWA POGODA
    while (hourlyWeatherWrapper.children[1]) {
        hourlyWeatherWrapper.removeChild(hourlyWeatherWrapper.children[1])
    }

    for (let i = 0; i <= 24; i++) {
        // Klonujemy wartość hourlyWeather
        hourlyWeatherModel = hourlyWeatherWrapper.children[0].cloneNode(true);
        hourlyWeatherModel.classList.remove('display-none')
        // Ustawiamy godziny
        hourlyWeatherModel.children[0].children[0].innerHTML = new Date(hourlyData[i].time * 1000).getHours() + ":00";
        // Ustawiamy temperature
        hourlyWeatherModel.children[1].children[0].innerHTML = Math.round((hourlyData[i].temperature - 32) * 5 / 9) + '&#176;';
        // Ustawianie ikon
        hourlyIcon = hourlyData[i].icon;
        hourlyWeatherModel.children[1].children[1].children[0].setAttribute('src', `./images/temperature-icons/${hourlyIcon}-grey.png`);
        // Dodawanie wartości do strony
        hourlyWeatherWrapper.appendChild(hourlyWeatherModel);
    }
    
    showApp();
}


/* *************************
        GET LOCATION
*************************** */

let getLocation;
const locationInput = document.querySelector('.location-input');
const addCityBtn = document.querySelector('.location-button');

const addCity = () => {
    getLocation = locationInput.value;
    locationInput.value = '';
    addCityBtn.setAttribute('disabled', 'true');
    document.querySelector('.humidity-icon').classList.remove('display-none');
    document.querySelector('.wind-icon').classList.remove('display-none');
    document.querySelector('.currentlyIcon').classList.remove('display-none');
    document.querySelector('.humidity-event').classList.remove('display-none');
    document.querySelector('.wind-event').classList.remove('display-none');
    document.querySelector('.lower-panel').classList.remove('display-none');
    hideMenu();

    getWeather(getLocation);
}

locationInput.addEventListener('input', function() {
    let tempText = this.value.trim();
    
    if (tempText != '') {
        addCityBtn.removeAttribute('disabled');
    } else {
        addCityBtn.setAttribute('disabled', 'true');
    }
});

addCityBtn.addEventListener('click', addCity)

/* *************************
    GET LOCATION API
*************************** */
const DARKSKY_KEY = 'cdd5a61f32e0d8a1cedf4644b38c6be1';
const GEOCODER_KEY = '2af2753c147142e0a275cc802d9c48af';

const getGeocode = (location) => `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${GEOCODER_KEY}&language=pl`;
const getDarksky = (lat, long) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${long}`;
const getDarkskyData = (url, location) => {
    axios.get(url)
        .then((res) => {
            console.log(res)
            drawWeatherData(res.data, location)
        })
        .catch((err) => {
            console.log(err)
        })
}

const getWeather = (location) => {
    loadApp();

    let latitude;
    let longitude;
    
    let geocodeURL = getGeocode(location);

    axios.get(geocodeURL)
        .then((res) => {
            if(res.data.results.length == 0) {
                console.log("Niewłaściwa lokalizacja");
                showApp()
            }

            latitude = res.data.results[0].geometry.lat;
            longitude = res.data.results[0].geometry.lng;

            let darkskyURL = getDarksky(latitude, longitude);
            getDarkskyData(darkskyURL, location)
        })
        .catch((err) => {
            console.log(err)
        })
}
