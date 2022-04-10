//Adding var to search
var cityInputEl = document.querySelector("#city-input");
var searchButton = document.querySelector("#search-button");
var currentForecastEl = document.querySelector("#current-forcast");
var futureForecastEl = document.querySelector("#futureforecast");
var searchResultsEl = document.querySelector("#results");
var searchHistory = document.querySelector("#search-history");
var imgContainer = document.querySelector("#img-container");
var currentTemperature = $("#temperature");
var currentHumidity = $("humidity");
var currenWindSpeed = $("wind-speed");
var currentUvIndex = $("#uv-index");
var city = [];
var userInput = [];

var APIKey = "ff06d6c0b03f8ea58a8409a49f112901";

//Add current date
var currentDate = moments().format("dddd, MMM Do");
$("current-date").text(currentDate);

// Add future dates
var forecastDate1 = moment().add(1, "days").format("MMM D");
var forecastDate2 = moment().add(2, "days").format("MMM D");
var forecastDate3 = moment().add(3, "days").format("MMM D");
var forecastDate4 = moment().add(4, "days").format("MMM D");
var forecastDate5 = moment().add(5, "days").format("MMM D");

function roundNum(num){
    return Math.floor(num);
}

searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    //search for your city
    var searchQuery = document.querySelector("#searh-bar").value;
    //if nothing is entered into search bar alert will pop up
    if (!searchQuery) {
        $("#error-msg").addClass("show");
        $("#error-msg").text("No City Entered!");
    } else {
        updateStorage(searchQuery);
        getCityData(searchQuery);
        loadHistoryBtns(searchQuery);
    }
});


//save to storage
function updateStorage(searchQuery) {
    userInput.push(searchQuery);
    localStorage.setItem("queries", JSON.stringify(userInput));
}

//pull and save the city that was search
function getCityData(searchQuery) {
    var cityData = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchQuery + "&limit=1&appid=096c6b1c200b27403244ac76a0e8bd2d";

    fetch(cityData).then(function (response) {
        if (response.ok) {
          response.JSON().then(function (data) {
            if (data === "[]") {
              $("#error").textContent = "That didn't work. Try again.";
            } else {
              // if data received, set lat/lon to localstorage
              localStorage.setItem("lat", data[0].lat);
              localStorage.setItem("lon", data[0].lon);
              console.log("City data for: " + data[0].name, data[0].state);
              $("#search-bar").textContent = data[0].name;


              // fetch weather data for city
              getWeatherData(data[0].name, data[0].state);
            }
          });
        }
      });
    }


//save weather to local stoage

    function getWeatherData(city, state) {
            var lat = localStorage.getItem("lat");
            var lon = localStorage.getItem("lon");

            var dataURL =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +
                "&units=imperial&exclude=minutely,hourly&appid=096c6b1c200b27403244ac76a0e8bd2d";

            fetch(dataURL)
                .then(function (response) {
                    if (response.ok) {
                        response.JSON().then(function (data) {
                            displayCurrent(data.current, city, state);
                            displayForecast(data.daily);
                        })
                    } else {
                        console.log("error");
                    }
                })
                .catch(function (error) {
                    console.log("cannot find in openweather")
                });
        }
    
function displayCurrent(weather, city, state) {
    var cityStateEl = document.createElement("h3");
    cityStateEl.textContent = "Your Current Weather For:" + city + "" + state;
    var timeStamp = document.createElement("p");
    timeStamp.textContent = "The Local Time Is:";
    
    currentForecastEl.textCont = "";
    searchResultsEl.textContent = "";
    imgContainer.textcontent = "";
    $("#search-bar").val("");
    $("#currentforecast").removeClass("invisible");

    searchResultsEl.appendChild(cityStateEl);

    //images

    var currentImg = document.createElement("img");
    currentImg.setAttribute ("src","https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
    );
    imgContainer.appendChild(currentImg);
    currentForecastEl.appendChild(imgContainer);

}