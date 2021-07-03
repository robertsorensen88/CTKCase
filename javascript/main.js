let searchButton = document.querySelector('#btn')
let inputValue = document.querySelector('#inputValue')
let contentfield = document.querySelector('#main-content')

inputValue.addEventListener("keyup", function(event){
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById("btn").click();
  }
});
searchButton.addEventListener("click" , function(){

    fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&units=metric&lang=en&appid=30bf8fd456daf720ce8448f13678dae1"
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
        let temp = document.createElement("p");
        let desc = document.createElement("p");
        let imgicon = document.createElement("img");
        let weatherOutput = document.createElement("div");

        weatherHeader.id = "hId";
        weatherHeader.innerHTML = "Current weather in " + cityName;
        weatherOutput.id = "weatherOutput";
        weatherOutput.className =
          "d-flex mw-50 flex-column justify-content-center border border-primary rounded";
        temp.id = "tId";
        temp.innerHTML = currentTemperature + " °C";
        desc.id = "dId";
        desc.innerHTML = weatherDescription;
        imgicon.id = "iID";
        imgicon.src = iconUrl;

        contentfield.appendChild(weatherHeader)
        weatherOutput.appendChild(imgicon)
        weatherOutput.appendChild(temp);
        weatherOutput.appendChild(desc);
        contentfield.appendChild(weatherOutput);
    })
    .catch((error) => alert("There is no city like that!"))

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        inputValue.value +
        "&units=metric&lang=en&appid=30bf8fd456daf720ce8448f13678dae1"
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data["list"][0]["dt_txt"]);
      console.log(data["list"][8]["dt_txt"]);
      console.log(data["list"][16]["dt_txt"]);
      console.log(data["list"][24]["dt_txt"]);
      console.log(data["list"][32]["dt_txt"]);
      let weatherForecastFiveDaysDates = []; 

      for (let index = 0; index < data["list"].length; index++) {
       let splitDate = data["list"][index]["dt_txt"].split(" ")
        console.log(splitDate[1])
          if (splitDate[1] == "12:00:00") {
          weatherForecastFiveDaysDates.push(data["list"][index]["dt_txt"]);
          }
       
      }
      for (let index = 0; index < weatherForecastFiveDaysDates.length; index++) {
        console.log(weatherForecastFiveDaysDates[index])
        
      }
     
      const weatherForecastFiveDaysTemperature = [
        data["list"][0]["main"]["temp"],
        data["list"][8]["main"]["temp"],
        data["list"][16]["main"]["temp"],
        data["list"][24]["main"]["temp"],
        data["list"][32]["main"]["temp"],
      ];
      const weatherForecastForecastIcon = [
        data["list"][0]["weather"][0]["icon"],
        data["list"][8]["weather"][0]["icon"],
        data["list"][16]["weather"][0]["icon"],
        data["list"][24]["weather"][0]["icon"],
        data["list"][32]["weather"][0]["icon"],
      ];
      const weatherForecastDescription = [
        data["list"][0]["weather"][0]["description"],
        data["list"][8]["weather"][0]["description"],
        data["list"][16]["weather"][0]["description"],
        data["list"][24]["weather"][0]["icon"],
        data["list"][32]["weather"][0]["icon"],
      ];
      let forecastHeader = document.createElement("h3");
      forecastHeader.innerHTML= "Five days forecast";
      forecastHeader.id ="forecastHeader";
      forecastHeader.className="mt-5"

      contentfield.appendChild(forecastHeader);

      for (let index = 0; index < weatherForecastFiveDaysDates.length; index++) {
        const getWeatherForecastDate = weatherForecastFiveDaysDates[index];
        const getWeatherForecastTemperature = weatherForecastFiveDaysTemperature[index];
        let forecastOutput = document.createElement("div");
        let forecastTemperature = document.createElement("p");
        let forecastDate = document.createElement("h6");
        let forecastIcon = document.createElement("img");

        let getDate = getWeatherForecastDate.split(" ");

        forecastIcon.src = "http://openweathermap.org/img/w/" + weatherForecastForecastIcon[index] + ".png";
        forecastIcon.id ="iID";
        forecastOutput.id = "forecastWindows";
        forecastOutput.className =
          "m-4 d-flex mw-50 flex-column justify-content-center border border-primary rounded";
        forecastTemperature.innerHTML =
          parseInt(getWeatherForecastTemperature) + " °C";
        forecastDate.innerHTML = getDate[0];
        forecastDate.id = "forecastDate"

        contentfield.appendChild(forecastDate);
        forecastOutput.appendChild(forecastIcon);
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
  let removeForecastHeader = document.querySelectorAll("#forecastHeader");
  let removeForecastDate = document.querySelectorAll("#forecastDate");

  for (var x = 0; x < removeForecastDate.length; x++) {
    removeForecastDate[x].remove();
  }
  for (var x = 0; x < removeForecastHeader.length; x++) {
    removeForecastHeader[x].remove();
  }
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