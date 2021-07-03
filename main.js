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
        weatherOutput.className = "d-flex justify-content-center border border-primary rounded"
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
    

})

function removeElement() {
  // tar bort element när man kallar på funktionen
  let removeWeather = document.querySelectorAll("#weatherOutput");
  let removeHeader = document.querySelectorAll("#hId");
  let topattr = document.querySelectorAll("#attractions");
  let removeAttrDiv = document.querySelectorAll(".attr");
  let removeNoOptions = document.querySelectorAll("#noId");

  for (var i = 0; i < topattr.length; i++) {
    topattr[i].remove();
  }
  for (var x = 0; x < removeWeather.length; x++) {
    removeWeather[x].remove();
  }
  for (var y = 0; y < removeHeader.length; y++) {
    removeHeader[y].remove();
  }
  for (var y = 0; y < removeAttrDiv.length; y++) {
    removeAttrDiv[y].remove();
  }
  for (var y = 0; y < removeNoOptions.length; y++) {
    removeNoOptions[y].remove();
  }
}