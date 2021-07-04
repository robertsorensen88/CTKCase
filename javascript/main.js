let searchButton = document.querySelector('#btn')
let inputValue = document.querySelector('#inputValue')
let contentfield = document.querySelector('#main-content')

//if user press enter trigger clickevent on button
inputValue.addEventListener("keyup", function(event){
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById("btn").click();
  }
});
//when buttonclick fetch api. 
searchButton.addEventListener("click" , function(){
    fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&units=metric&lang=en&appid=30bf8fd456daf720ce8448f13678dae1"
    )
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        //calling function remove element
        removeElement();

        //get all elements
        let cityName = data["name"];
        let country = data["sys"]["country"]
        let currentTemperature = parseInt(data["main"]["temp"]);
        let currentFeelsLike = parseInt(data["main"]["feels_like"]);
        let currentWindSpeed = parseFloat(data["wind"]["speed"]);
        let currentWindDirection = parseFloat(data["wind"]["deg"]);
        let currentHumidity = data["main"]["humidity"];
        let weatherDescription = data["weather"][0]["description"];
        let icon = data["weather"][0]["icon"];
        let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

        // creates all elements
        let weatherHeader = document.createElement("h1");
        let temperature = document.createElement("p");
        let feelsLike = document.createElement("p");
        let description = document.createElement("p");
        let humidityHeader = document.createElement("h5");
        let humidity = document.createElement("p");
        let windHeader = document.createElement("h5");
        let windInfo = document.createElement("p");
        let imgicon = document.createElement("img");
        let weatherOutput = document.createElement("div");
        let feelsLikeHeader = document.createElement("h5");

         // take degree in number and convert it to text
          if(currentWindDirection > 348.75 || currentWindDirection < 11.25) 
            currentWindDirection = "N";

          if(currentWindDirection < 33.75 && currentWindDirection > 11.25)
             currentWindDirection = "NNE";
            
          if (currentWindDirection < 56.25 && currentWindDirection > 33.75)
            currentWindDirection = "NE";
            
          if(currentWindDirection < 78.75 && currentWindDirection > 56.25)
             currentWindDirection = "ENE";
           
          if(currentWindDirection < 101.25 && currentWindDirection > 78.75)
             currentWindDirection = "E";
           
          if(currentWindDirection < 123.75 && currentWindDirection > 101.25)
             currentWindDirection = "ESE";
            
          if(currentWindDirection < 146.25 && currentWindDirection > 123.75)
             currentWindDirection = "SE";
            
          if(currentWindDirection < 168.75 && currentWindDirection > 146.25)
             currentWindDirection = "SSE";
            
          if(currentWindDirection < 191.25 && currentWindDirection > 168.75 )
             currentWindDirection = "S";
           
          if(currentWindDirection < 213.75 && currentWindDirection > 191.25)
             currentWindDirection = "SSW";
            
          if(currentWindDirection < 236.25 && currentWindDirection > 213.75 )
             currentWindDirection = "SW";
            
          if(currentWindDirection < 258.75 && currentWindDirection > 236.25)
             currentWindDirection = "WSW";
           
          if(currentWindDirection < 281.25 && currentWindDirection > 258.75)
             currentWindDirection = "W";
            
           if(currentWindDirection < 303.75 && currentWindDirection > 281.25)
             currentWindDirection = "WNW";
            
           if(currentWindDirection < 326.25 && currentWindDirection > 303.75)
             currentWindDirection = "NW";
            
           if(currentWindDirection < 348.75 && currentWindDirection > 326.25)
             currentWindDirection = "NNW";
        
        console.log(currentWindDirection)
        // give different elements values from openweather
        weatherHeader.id = "hId";
        weatherHeader.innerHTML = cityName + ", " + country;
        weatherOutput.id = "weatherOutput";
        weatherOutput.className =
          "d-flex mw-50 flex-column justify-content-center border border-primary border-2 rounded opacity-3";
        feelsLikeHeader.innerHTML= "Feels Like";
        feelsLikeHeader.classList= "border-top border-dark pt-3"        
        feelsLike.innerHTML = currentFeelsLike + " °C";
        feelsLike.classList = "h4";
        temperature.className ="h3";
        temperature.innerHTML = currentTemperature + " °C";
        description.innerHTML = weatherDescription;
        imgicon.id = "iID";
        imgicon.src = iconUrl;
        humidityHeader.innerHTML = "Humidity";
        humidityHeader.className = "border-top border-dark pt-3"
        humidity.innerHTML = currentHumidity + "%";
        windHeader.innerHTML = "Wind";
        windHeader.className="border-top border-dark pt-3"
        windInfo.innerHTML = "Direction: " + currentWindDirection + "<br> Speed: " + currentWindSpeed + " m/s"

        // add elements inside contentfield
        contentfield.appendChild(weatherHeader)
        weatherOutput.appendChild(imgicon)
        weatherOutput.appendChild(temperature);
        weatherOutput.appendChild(description);
        weatherOutput.appendChild(humidityHeader);
        weatherOutput.appendChild(humidity);
        weatherOutput.appendChild(windHeader);
        weatherOutput.appendChild(windInfo);
        weatherOutput.appendChild(feelsLikeHeader);
        weatherOutput.appendChild(feelsLike);
        contentfield.appendChild(weatherOutput);
    })
    //if no city exists
    .catch((error) => alert("There is no city like that!"))

    // fetching 5days forecast
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

      //make arrays so we can push in values when splidate value is equal to 12:00:00
      let weatherForecastFiveDaysDates = []; 
      let weatherForecastFiveDaysTemperature = [];
      let weatherForecastForecastIcon = [];
      let weatherForecastDescription = [];


      // Get values at 12:00:00
      for (let index = 0; index < data["list"].length; index++) {
       let splitDate = data["list"][index]["dt_txt"].split(" ")
        console.log(splitDate[1])
          if (splitDate[1] == "12:00:00") {
          weatherForecastFiveDaysDates.push(data["list"][index]["dt_txt"]);
          weatherForecastFiveDaysTemperature.push(
            data["list"][index]["main"]["temp"]
          );
          weatherForecastForecastIcon.push(data["list"][index]["weather"][0]["icon"]);
          weatherForecastDescription.push(data["list"][index]["weather"][0]["description"]);
          }      
      }

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
        let forecastDescription = document.createElement("p");
        let forecastDate = document.createElement("h6");
        let forecastIcon = document.createElement("img");

        let getDate = getWeatherForecastDate.split(" ");

        forecastDescription.innerHTML = weatherForecastDescription[index]
        forecastIcon.src = "http://openweathermap.org/img/w/" + weatherForecastForecastIcon[index] + ".png";
        forecastIcon.id ="iID";
        forecastOutput.id = "forecastWindows";
        forecastOutput.className =
          "mb-4 d-flex mw-50 flex-column justify-content-center border border-primary border-2 rounded opacity-3";
        forecastTemperature.classList="h3";
        forecastTemperature.innerHTML =
          parseInt(getWeatherForecastTemperature) + " °C";
        forecastDate.innerHTML = getDate[0];
        forecastDate.id = "forecastDate"

        contentfield.appendChild(forecastDate);
        forecastOutput.appendChild(forecastIcon);
        forecastOutput.appendChild(forecastTemperature);
        forecastOutput.appendChild(forecastDescription);
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