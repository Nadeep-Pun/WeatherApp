const apiKey = '5a1505ed4d3a6679be580ce5213c13dc'
const weathers = {
    "Clear": '☀️',
    "Snow": '❄️',
    "Rain": '🌧️',
    "Thunderstorm": '🌩️',
    "Drizzle": '🌧️',
    "Clouds": '☁️'
}
const htmlTags =
    `
    <section id="weatherDisp">
        <p style="font-size: 30px" id="city"></p>
        <p class="temp" id="weatherText"></p>
        <p style="color: gray" id="weatherDesc"></p>
        <p style="font-size: 40px" id="weatherEmoji"></p>
        <p class="temp" id="temp"></p>
    </section>
    <section id="tempMinMax">
        <div>
            <p>Min</p>
            <p id="tempMin"></p>
        </div>
        <div id="divider"></div>
        <div>
            <p>Max</p>
            <p id="tempMax"></p>
        </div>
    </section>
    `
let checkVisibility = false

const inputText = document.getElementById('inputText')
const searchBtn = document.getElementById('searchBtn')
const container = document.getElementById('container')
const display = document.getElementById('display')

fetchWeather('kathmandu') //default weather details

searchBtn.addEventListener('click', () => {
    searchTask()
})

inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchTask()
    }
})

function searchTask() {
    if (!inputText.value) return
    if (checkVisibility) {
        display.innerHTML = htmlTags
        checkVisibility = !checkVisibility
    }
    container.style.visibility = 'hidden'
    fetchWeather(inputText.value)
    inputText.value = ''
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const data = await response.json()
        displayWeather(data)
    } catch {
        display.innerHTML = `<h2>"${city}" doesnot exist</h2>`
        container.style.visibility = 'visible'
        checkVisibility = !checkVisibility
    }
}

function displayWeather(data) {
    display.innerHTML = htmlTags
    container.style.visibility = 'visible'
    const { main, name, weather } = data
    document.getElementById('city').innerText = name
    document.getElementById('weatherText').innerText = weather[0].main
    document.getElementById('weatherDesc').innerText = capitalize(weather[0].description)
    document.getElementById('weatherEmoji').innerText = weathers[weather[0].main]
    document.getElementById('temp').innerText = `${main.temp}°C`
    document.getElementById('tempMin').innerText = `${main.temp_min}°C`
    document.getElementById('tempMax').innerText = `${main.temp_max}°C`
}

function capitalize(str) {
    const words = str.split(' ')
    const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1))
    return capitalizedWords.join(' ')
}
