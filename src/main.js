const time = document.getElementById('time'),
    date = document.getElementById('date'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

let imgIndex = (new Date()).getHours();


function showTime() {
    time.innerHTML = new Date().toLocaleString('en-GB', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    setTimeout(showTime, 1000);
}

function showDate() {
    date.innerHTML = new Date().toLocaleString('en-GB', {
        year: 'numeric',
        hour12: false,
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    setTimeout(showTime, 1000);
}


function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();
    if (hour >= 6 && hour < 12) {
        greeting.textContent = 'Good Morning, ';
    } else if (hour >= 12 && hour < 18) {
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour >= 18 && hour < 24) {
        greeting.textContent = 'Good Evening, ';
    } else {
        greeting.textContent = 'Good Night, ';
    }
}


function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name').trim() === "") {
        name.innerText = '[Enter Name]';
        localStorage.setItem('name', name.innerText);
    } else {
        name.innerText = localStorage.getItem('name');
    }
}

function onKeyPress(e) {
    if (e.type === 'keypress' && (e.which == 13 || e.keyCode == 13)) {
        e.target.blur();
    }
}

function setNameBlur(e) {
    if (e.target.innerText.trim() === "") {
        e.target.textContent = localStorage.getItem('name');
    } else {
        e.target.innerText = e.target.innerText.trim();
        localStorage.setItem('name', e.target.innerText);
    }
}


function getFocus() {
    if ((localStorage.getItem('focus') === null || localStorage.getItem('focus').trim() === "")) {
        focus.innerText = '[Enter Focus]';
        localStorage.setItem('focus', name.innerText);
    } else {
        focus.innerText = localStorage.getItem('focus');
    }
}


function setFocusBlur(e) {
    if (e.target.innerText.trim() === "") {
        e.target.textContent = localStorage.getItem('focus');
    } else {
        e.target.innerText = e.target.innerText.trim();
        localStorage.setItem('focus', e.target.innerText);
    }
}



const imgUrlArray = getImgArrayUrl(),
    base = `./img/`;

const changeBackgrounButton = document.querySelector('.btn'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    btn__quote = document.querySelector('.btn__quote');

document.addEventListener('DOMContentLoaded', getQuote);
btn__quote.addEventListener('click', getQuote);
name.addEventListener('keypress', onKeyPress);
name.addEventListener('blur', setNameBlur);
name.addEventListener('focus', clearAtFocus);
focus.addEventListener('keypress', onKeyPress);
focus.addEventListener('blur', setFocusBlur);
focus.addEventListener('focus', clearAtFocus);

changeBackgrounButton.addEventListener('click', updateBackgroundImage);



const weatherIcon = document.querySelector('.weather__icon'),
    temperature = document.querySelector('.temperature'),
    windSpeed = document.querySelector('.windSpeed'),
    wetness = document.querySelector('.wetness'),
    inputLocation = document.querySelector('.location'),
    weatherDescription = document.querySelector('.weather__discription');

inputLocation.addEventListener('keypress', onKeyPress);
inputLocation.addEventListener('blur', setLocationBlur);
inputLocation.addEventListener('focus', clearAtFocus);


showTime();
showDate();
setBgGreet();
getName();
getFocus();
updateBackgroundEveryHour();
getLocation();
getWeather();



function updateBackgroundEveryHour() {
    updateBackgroundImage();
    setBgGreet();
    let currentDate = new Date();
    let tmpDate = new Date();
    tmpDate.setHours(tmpDate.getHours() + 1);
    tmpDate.setMinutes(0);
    tmpDate.setSeconds(0);
    let tmp = tmpDate.getTime() - currentDate.getTime()
    setTimeout(updateBackgroundEveryHour, tmp);
}


function getRandomInt(limit, count) {
    let tempArray = [];
    while (tempArray.length < count) {
        let int = Math.round(Math.random() * limit)
        if (tempArray.indexOf(int) == -1) {
            tempArray.push(int);
        }
    }
    return tempArray;
}


function getImgArrayUrl() {
    return getRandomInt(20, 6).map(item => {
        return `night/${item < 10 ? "0" + item: item}.jpg`
    }).concat(getRandomInt(20, 6).map(item => {
        return `morning/${item < 10 ? "0" + item: item}.jpg`
    })).concat(getRandomInt(20, 6).map(item => {
        return `day/${item < 10 ? "0" + item: item}.jpg`
    })).concat(getRandomInt(20, 6).map(item => {
        return `evening/${item < 10 ? "0" + item: item}.jpg`
    }))
}

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function updateBackgroundImage() {
    const index = imgIndex % imgUrlArray.length;
    const imageSrc = base + imgUrlArray[index];
    viewBgImage(imageSrc);
    imgIndex++;
    changeBackgrounButton.disabled = true;
    setTimeout(function () {
        changeBackgrounButton.disabled = false
    }, 1000);
}

async function getQuote() {
    btn__quote.disabled = true;
    let res = null;
    try {
        const url = `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random`;
        res = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
                'x-rapidapi-key': 'c951b0e956msh70f65bfa2182201p10538cjsn4ff99214d9f2',
                'accept': 'application/json',
                'useQueryString': true
            }
        });
        const data = await res.json();
        blockquote.textContent = data.value;

    } catch (err) {
        if (res.status != 200 || res.status != 201) { // появился обработчик исключений
            blockquote.textContent = `Service is temporary unawiable (${res.statusText}), please try later.`;
            console.log(res);
        } else {
            blockquote.textContent = `Somethig went terriblly wrong`;
            console.log(err);
        }
    } finally {
        btn__quote.disabled = false
    }
}



//city
function getLocation() {
    if (localStorage.getItem('location') === null || localStorage.getItem('location').trim() === "") {
        inputLocation.innerText = '[Enter Location]';
        localStorage.setItem('location', inputLocation.innerText);
    } else {
        inputLocation.innerText = localStorage.getItem('location');
    }
}

function setLocationBlur(e) {
    if (e.target.innerText.trim() === "") {
        e.target.textContent = localStorage.getItem('location');
    } else {
        e.target.innerText = e.target.innerText.trim();
        localStorage.setItem('location', e.target.innerText);
        getWeather();
    }
}

function clearAtFocus(e) {
    e.target.innerText = "";
}


async function getWeather() {
    if (inputLocation.innerText === "[Enter Location]") {
        setWeatherData("none");
        return
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation.textContent}&lang=eng&appid=fc19170fda919efe2797bbc9b09df0d2&units=metric`;
    let data = null;
    try {
        const res = await fetch(url);
        data = await res.json();
        if (res.status == 200 || res.status == 201) {
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
            inputLocation.textContent = data.name;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed}m/s`
            wetness.textContent = `Wetness: ${data.main.humidity}%`
            weatherDescription.textContent = data.weather[0].description;
        } else {
            setWeatherData("not found");
        }
    } catch (e) {
        setWeatherData("Service is temporary unawiable");
        console.log(e);
    }
}

function setWeatherData(message) {
    temperature.textContent = `Temperature: ${message}`;
    windSpeed.textContent = `Wind Speed: ${message}`
    wetness.textContent = `Wetness: ${message}`
    weatherDescription.textContent = `Description: ${message}`;
}