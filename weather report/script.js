import { GET } from "./api.js";
import {
  qS,
  qSA,
  cE,
  selectedLocation,
  report,
  createCard,
  createNewReport,
} from "./utils.js";

const mainCard = qS(".mainCard");
const weather = qS(".weather");
const weatherCards = qS(".weatherCards");
const searched = qS("#searched");
const runSearch = qS("#runSearch");
const searchs = qS(".searchs");
const searchedLocations = qS(".searchedLocations");
const refresh = qS(".material-symbols-outlined");
const hamburger = qS(".hamburgerMenu");
const more = qS(".more");

Promise.all([
  GET(
    "https://api.openweathermap.org/data/2.5/weather?q=rome",
    "fd17e1e8912ce78ad2e26109db1a79dc"
  ),
  GET(
    "https://api.openweathermap.org/data/2.5/weather?q=london",
    "fd17e1e8912ce78ad2e26109db1a79dc"
  ),
  GET(
    "https://api.openweathermap.org/data/2.5/weather?q=madrid",
    "fd17e1e8912ce78ad2e26109db1a79dc"
  ),
  GET(
    "https://api.openweathermap.org/data/2.5/weather?q=new york",
    "fd17e1e8912ce78ad2e26109db1a79dc"
  ),
]).then((data) => {
  data.map((location) => {
    weatherCards.append(createCard(location));
  });
  createNewReport(data[0]);
});

runSearch.addEventListener("click", () => {
  const newH1 = cE("h1");
  GET(
    `https://api.openweathermap.org/data/2.5/weather?q=${searched.value}`,
    "fd17e1e8912ce78ad2e26109db1a79dc"
  ).then((data) => {
    if (searched.value === "") {
      return;
    }
    if (data.cod >= 400 && data.cod < 500) {
      selectedLocation.textContent = "??";
      report.innerHTML = "";
      report.textContent = "Error";
      mainCard.innerHTML = "";
      newH1.style.color = "red";
      newH1.textContent = `The following location: "${searched.value}" has not be found. Be sure you write it correctly and retry.`;
      mainCard.append(newH1);
      return;
    }
    {
      mainCard.innerHTML = "";
      newH1.textContent = "Searched location:";
      createNewReport(data);
      mainCard.append(newH1, createCard(data));
      searchs.style.display = "flex";
      searchedLocations.append(createCard(data));
      weather.style.display = "none";
    }
  });
});

refresh.addEventListener("click", () => {
  location.reload();
});

hamburger.addEventListener("click", () => {
  more.classList.toggle("showMore");
});
