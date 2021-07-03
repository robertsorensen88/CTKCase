let searchButton = document.querySelector('#btn')
let inputValue = document.querySelector('#inputValue')
let contentfield = document.querySelector('#main-content')


searchButton.addEventListener("click" , function(){

    fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&units=metric&lang=sv&appid=30bf8fd456daf720ce8448f13678dae1"
    )
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        removeElement();

        let cityName = data["name"];
        let currentTemperature = parseInt(data["main"]["temp"]);
        let weatherDescription = data["weather"][0]["description"];
        let icon = data["weather"][0]["icon"];
        let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        let longitude = data["coord"]["lon"];
        let latitude = data["coord"]["lat"];

        let weatherHeader = document.createElement("h1");
        let cityNames = document.createElement("h2");
        let temp = document.createElement("p");
        let desc = document.createElement("p");
        let imgicon = document.createElement("img");
        let weatherOutput = document.createElement("div");

        weatherHeader.id = "hId";
        weatherHeader.innerHTML = "Weather";
        weatherOutput.id = "weatherOutput";
        weatherOutput.className =
          "d-flex mw-50 flex-column justify-content-center border border-primary rounded";
        cityName.id = "wId";
        cityNames.innerHTML = cityName;
        temp.id = "tId";
        temp.innerHTML = currentTemperature + " °C";
        desc.id = "dId";
        desc.innerHTML = weatherDescription;
        imgicon.id = "iID";
        imgicon.src = iconUrl;

        contentfield.appendChild(weatherHeader)
        weatherOutput.appendChild(imgicon)
        weatherOutput.appendChild(cityNames);
        weatherOutput.appendChild(temp);
        weatherOutput.appendChild(desc);
        contentfield.appendChild(weatherOutput);
    })
    .catch((error) => alert("There is no city like that!"))

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        inputValue.value +
        "&units=metric&lang=sv&appid=30bf8fd456daf720ce8448f13678dae1"
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data["list"][0]["dt_txt"]);
      console.log(data["list"][8]["dt_txt"]);
      console.log(data["list"][16]["dt_txt"]);
      console.log(data["list"][24]["dt_txt"]);
      console.log(data["list"][32]["dt_txt"]);
      const weatherForecastFiveDaysDates = [data["list"][0]["dt_txt"], data["list"][8]["dt_txt"], data["list"][16]["dt_txt"], data["list"][24]["dt_txt"], data["list"][32]["dt_txt"]]
      const weatherForecastFiveDaysTemperature = [
        data["list"][0]["main"]["temp"],
        data["list"][8]["main"]["temp"],
        data["list"][16]["main"]["temp"],
        data["list"][24]["main"]["temp"],
        data["list"][32]["main"]["temp"],
      ];
      let forecastHeader = document.createElement("h3");
      forecastHeader.innerHTML= "Five days forecast";

      contentfield.appendChild(forecastHeader);

      for (let index = 0; index < weatherForecastFiveDaysDates.length; index++) {
        const getWeatherForecastDate = weatherForecastFiveDaysDates[index];
        const getWeatherForecastTemperature = weatherForecastFiveDaysTemperature[index];
        let forecastOutput = document.createElement("div");
        let forecastTemperature = document.createElement("p");
        let forecastDate = document.createElement("p");

        let getDate = getWeatherForecastDate.split(" ");

        forecastOutput.id = "forecastWindows";
        forecastOutput.className =
          "m-4 d-flex mw-50 flex-column justify-content-center border border-primary rounded";
        forecastTemperature.innerHTML =
          parseInt(getWeatherForecastTemperature) + " °C";
        forecastDate.innerHTML = getDate[0];

        forecastOutput.appendChild(forecastDate);
        forecastOutput.appendChild(forecastTemperature);
        contentfield.appendChild(forecastOutput);
      }
     
    })
})

function removeElement() {
  // tar bort element när man kallar på funktionen
  let removeWeather = document.querySelectorAll("#weatherOutput");
  let removeHeader = document.querySelectorAll("#hId");
  let removeForecast = document.querySelectorAll("#forecastWindows");


for (var x = 0; x < removeForecast.length; x++) {
  removeForecast[x].remove();
}
  for (var x = 0; x < removeWeather.length; x++) {
    removeWeather[x].remove();
  }
  for (var y = 0; y < removeHeader.length; y++) {
    removeHeader[y].remove();
  }
}