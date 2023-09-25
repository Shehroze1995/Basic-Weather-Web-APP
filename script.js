const userInput = document.getElementById("userInput");
const searchBtn = document.getElementById("searchBtn");
const showTemp = document.getElementById("showTemp");
const cityName = document.getElementById("cityName");
const showHumidity = document.getElementById("showHumidity");
const windSpeed = document.getElementById("windSpeed");
const error = document.getElementById("error");
const main = document.querySelector("main");
const details = document.querySelector(".details");
const cloudStatus = document.getElementById("cloudStatus");
const loadingGif = document.getElementById('loading');
let apiKey = "37453659867a1ce2780893994079ff27";
let url = `https://api.openweathermap.org/data/2.5/weather?q=`;

searchBtn.addEventListener("click", showWeather);

async function showWeather() {
  let enteredCity = userInput.value;
  if (!enteredCity) return;
  loadingGif.classList.remove('hidden');
  try {
    let response = await fetch(url + enteredCity + "&appid=" + apiKey + "&units=metric");
    if (!response.ok) {
      error.classList.remove("hidden");
      main.classList.add("hidden");
      details.classList.add("hidden");
      loadingGif.classList.add('hidden')
      throw new Error(response.status);
    }
    error.classList.add("hidden");
    let data = await response.json();
    showTemp.textContent = Math.round(data.main.temp);
    cityName.textContent = data.name + " " + data.sys.country;
    showHumidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    main.classList.remove("hidden");
    details.classList.remove("hidden");
    loadingGif.classList.add('hidden');
    if (data.weather[0].main == "Clouds") cloudStatus.src = `assets/clouds.png`;
    if (data.weather[0].main == "Clear") cloudStatus.src = `assets/clear.png`;
    if (data.weather[0].main == "Drizzle") cloudStatus.src = `assets/drizzle.png`;
    if (data.weather[0].main == "Mist") cloudStatus.src = `assets/mist.png`;
    if (data.weather[0].main == "Rain") cloudStatus.src = `assets/rain.png`;
    if (data.weather[0].main == "Snow") cloudStatus.src = `assets/snow.png`;
  } catch (error) {
    console.log(error);
  }
}
