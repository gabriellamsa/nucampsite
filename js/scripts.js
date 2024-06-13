console.log('javascript connected!');
  
// carousel
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 3000,
    pause: false
})

// play/pause button
const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function() {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

// fetchWeather
async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = 'New York'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log({data})
        displayWeather(data); // função para exibir os dados do tempo
    } catch (error) {
        console.error('There was an error', error);
    }
}

// função para temperatura 
function displayWeather(weatherData) {
    const weatherDiv = document.querySelector('#weather');
    const icon = document.getElementById('weather-icon');
    const iconCode = weatherData.weather[0].icon;
    const temp = document.getElementById('weather-temp');
    const description = document.getElementById('weather-description');
    
    // cria uma imagem para add no icone
    const iconImage = document.createElement('img');

    iconImage.src = `https://openweathermap.org/img/w/${iconCode}.png`; // ícone do tempo
    iconImage.alt = weatherData.weather[0].description; // add descrição alternativa do ícone
    icon.appendChild(iconImage)

    temp.textContent = `${Math.round(weatherData.main.temp)}\u00B0F`;
    description.textContent = weatherData.weather[0].description;

    // weatherDiv visivel 
    weatherDiv.classList.remove('d-none'); 
}

fetchWeather();