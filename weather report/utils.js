const createCard = (data) => {
  const cardEl = cE("div");
  const imgCont = cE("div");
  const cardImg = cE("img");
  const cardInfo = cE("div");
  const cardTitle = cE("h4");
  const cardDescription = cE("p");
  const star = cE("div");

  cardEl.className = "card";
  imgCont.className = "imgCont";
  cardInfo.className = "cardInfo";
  star.className = "star";

  cardImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  cardTitle.textContent = data.name;
  cardDescription.textContent = data.weather[0].description;

  star.addEventListener("click", () => {
    const newObj = {
      id: data.id,
      name: data.name,
      weather: [
        {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
      ],
      main: {
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
      },
      wind: {
        speed: data.wind.speed,
      },
    };

    let locRep = locations;

    if (locRep == null) {
      localStorage.setItem("locations", "[]");

      locations.push(newObj);

      localStorage.setItem("locations", JSON.stringify(locations));
      locations = JSON.parse(localStorage.getItem("locations"));

      favorites.style.display = "flex";
      favoriteLocations.append(createFavorite(newObj));
    } else {
      const repliants = locRep.filter((loc) => {
        if (newObj.id == loc.id) {
          deleteTitle.textContent = `The location: "${newObj.name}" is already on favorites.`;
          deleteFavorite.style.display = "flex";
          return newObj;
        }
      });

      if (repliants.length == 0) {
        locations.push(newObj);
        localStorage.setItem("locations", JSON.stringify(locations));
        locations = JSON.parse(localStorage.getItem("locations"));

        favorites.style.display = "flex";

        favoriteLocations.append(createFavorite(newObj));
      }
    }
  });

  imgCont.addEventListener("click", () => createNewReport(data));

  imgCont.appendChild(cardImg);
  cardInfo.append(cardTitle, cardDescription);
  cardEl.append(imgCont, cardInfo, star);

  return cardEl;
};

const createNewReport = (data) => {
  report.innerHTML = "";

  const first = cE("div");
  const status = cE("h2");
  const reportImgCont = cE("div");
  const reportImg = cE("img");
  const second = cE("div");
  const reportInfo = cE("div");
  const reportDescription = cE("p");
  const reportTemp = cE("div");
  const temp = cE("h2");
  const temps = cE("div");
  const maxTemp = cE("p");
  const minTemp = cE("p");
  const third = cE("div");
  const humidity = cE("p");
  const wind = cE("p");

  first.className = "first";
  reportImgCont.className = "reportImgCont";
  second.className = "second";
  reportInfo.className = "reportInfo";
  reportTemp.className = "temp";
  temps.className = "temps";
  third.className = "third";

  if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
    heroImage.setAttribute("src", "https://picsum.photos/id/53/1440/1440");
  } else if (
    data.weather[0].icon === "02d" ||
    data.weather[0].icon === "02n" ||
    data.weather[0].icon === "03d" ||
    data.weather[0].icon === "03n" ||
    data.weather[0].icon === "04d" ||
    data.weather[0].icon === "04n"
  ) {
    heroImage.setAttribute("src", "https://picsum.photos/id/542/1440/1440");
  } else if (
    data.weather[0].icon === "09d" ||
    data.weather[0].icon === "09n" ||
    data.weather[0].icon === "10d" ||
    data.weather[0].icon === "10n"
  ) {
    heroImage.setAttribute("src", "https://picsum.photos/id/41/1440/1440");
  } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
    heroImage.setAttribute("src", "https://picsum.photos/id/115/1440/1440");
  } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
    heroImage.setAttribute("src", "https://picsum.photos/id/559/1440/1440");
  } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
    heroImage.setAttribute("src", "https://picsum.photos/id/472/1440/1440");
  }

  selectedLocation.textContent = data.name;

  status.textContent = data.weather[0].main;
  reportImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );

  reportDescription.textContent = data.weather[0].description;

  temp.textContent = data.main.temp + "°C";
  if (parseInt(data.main.temp) >= 15) {
    temp.style.color = "orange";
  }
  if (parseInt(data.main.temp) >= 25) {
    temp.style.color = "red";
  }
  if (parseInt(data.main.temp) <= 14) {
    temp.style.color = "aqua";
  }

  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  maxTemp.textContent = "Max. temp: " + data.main.temp_max + "°C";
  maxTemp.style.color = "red";
  minTemp.textContent = "Min. temp: " + data.main.temp_min + "°C";
  minTemp.style.color = "aqua";
  wind.textContent = "Wind speed: " + data.wind.speed + "Km/h";

  reportImgCont.appendChild(reportImg);
  first.append(status, reportImgCont);

  reportInfo.append(reportDescription);
  reportTemp.append(temp);
  second.append(reportInfo, reportTemp);

  temps.append(maxTemp, minTemp);
  third.append(temps, humidity, wind);

  report.append(first, second, third);
};

const createFavorite = (card) => {
  const cardEl = cE("div");
  const imgCont = cE("div");
  const cardImg = cE("img");
  const cardInfo = cE("div");
  const cardTitle = cE("h4");
  const cardDescription = cE("p");
  const star = cE("div");

  cardEl.className = "card";
  imgCont.className = "imgCont";
  cardInfo.className = "cardInfo";
  star.className = "star";

  cardTitle.textContent = card.name;

  cardImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`
  );
  cardDescription.textContent = card.weather[0].description;

  star.addEventListener("click", () => {
    confirm.addEventListener("click", removeFavorite(card, cardEl));
  });

  imgCont.addEventListener("click", () => createNewReport(card));

  imgCont.appendChild(cardImg);
  cardInfo.append(cardTitle, cardDescription);
  cardEl.append(imgCont, cardInfo, star);

  return cardEl;
};

const removeFavorite = (fav, cardEl) => {
  deleteTitle.textContent = `The location: "${fav.name}" has been removed from favorites.`;
  deleteFavorite.style.display = "flex";
  const cardElOld = cardEl;
  cardElOld.remove();
  locations.splice(fav, 1);
  console.log(locations);
  console.log(locations.indexOf(fav));
  localStorage.setItem("locations", JSON.stringify(locations));

  if (favoriteLocations.textContent === "") {
    favorites.style.display = "none";
  }

  confirm.removeEventListener("click", () => removeFavorite);
};

const qS = (type) => document.querySelector(type);
const qSA = (type) => document.querySelectorAll(type);
const cE = (element) => document.createElement(element);
const heroImage = qS("#heroImage");
const selectedLocation = qS("#selectedLocation");
const report = qS(".report");
const favorites = qS(".favorites");
const favoriteLocations = qS(".favoriteLocations");
const deleteFavorite = qS(".deleteFavorite");
const confirm = qS("#confirm");
const deleteTitle = qS("#deleteTitle");
const ok = qS("#ok");

let locations = JSON.parse(localStorage.getItem("locations"));

if (localStorage.getItem("locations") === null) {
  let locations = "nothing here";
} else if (locations.length > 0) {
  favorites.style.display = "flex";
  locations.map((location) => {
    favoriteLocations.append(createFavorite(location));
  });
}

ok.addEventListener("click", () => {
  deleteFavorite.style.display = "none";
});

export { qS, qSA, cE, selectedLocation, report, createCard, createNewReport };
