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

var userInput = [];


function roundNum(num) {
    return Math.floor(num);
}

searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    //search for your city
    var searchQuery = document.querySelector("#search-bar").value;
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
    var cityData = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchQuery + "&limit=1&appid=ff06d6c0b03f8ea58a8409a49f112901";
    console.log(userInput);

    fetch(cityData).then(function (response) {
        if (response.ok) {
            response.JSON().then(function (data) {
                if (data === "[]") {
                    $("#error").textContent = "Try again.";
                } else {
                    // if data received save lat & lon to local storage
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
        "&units=imperial&exclude=minutely,hourly&appid=ff06d6c0b03f8ea58a8409a49f112901";

    fetch(dataURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrent(data.current, city, state);
                    displayForecast(data.daily);
                });
            } else {
                console.log("error");
            }
        })
        .catch(function (error) {
            console.log("cannot find in openweather")
        });
}

function displayCurrent(weather, city, state) {
    currentForecastEl.textCont = "";
    searchResultsEl.textContent = "";
    imgContainer.textcontent = "";
    $("#search-bar").val("");
    $("#currentforecast").removeClass("invisible");

    var cityStateEl = document.createElement("h3");
    cityStateEl.textContent = "Your Current Weather For:" + city + "" + state;
    var timeStamp = document.createElement("p");
    timeStamp.textContent = "The Local Time Is:";

    searchResultsEl.appendChild(cityStateEl);

    //images

    var currentImg = document.createElement("img");
    currentImg.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
    );
    imgContainer.appendChild(currentImg);
    currentForecastEl.appendChild(imgContainer);

}

//Weather container infomation
var currentMainEl = document.createElement(h1)
currentMainEl.textContent = weather.weather[0].main;
currentForecastEl.appendChild(currentMainEl);

//Current Temperature

var currentTempEl = document.createElement("h4");
currentTempEl.textContent = "Temperature" + roundNum(weather.temp) + "";
currentForecastEl.appendChild(currentTempEl);

//Current Windspeed

var currentWindSpeedEl = document.createElement("h4");
currentWindSpeedEl.textContent = "Wind Speed:" +roundNum(weather.wind_speed) + "mph";
currentForecastEl.appendChild(currentWindSpeedEl);

//Current Humidity:

var currentHumidityEl = document.createElement("h4");
currentHumidityEl.textContent = "Humidity:" + weather.humidity + "%";
currentForecastEl.appendChild(currentHumidityEl);


//Current UV Rays. Different colors = different intensity of the UV Rays

var currentUvIndexEl = document.createElement("h4");
currentUvIndexEl.textContent = "UV Index:" + weather.uvi;

function displayForecast(forecasts) {
    futureForecastEl.textContent = "";
    $("#forecast-header").removeClass("invisible");

    //Creating eachs cards own elements

    for (var i = 1; i <= 5; i++) {
        var forecastObj.classList = "card card-small col-md-2";
        var foreDate = document.createElement("h4");
        foreDate.setAttribute("id","forecast-" + i);
        forecastObj.appendChild(foreDate);
        var foreImg = document.createElement("img")
        foreImg.setAttribute("src", "https://openweathermap.org/img/wn" + forecasts[i].weather[0].icon + ".png");
        forecastObj.appendChild(foreImg);
        var foreHeader = document.createElement ("h4");
        foreHeader.textContent = forecasts[i].weather[0].main;
        forecastObj.appendChild(foreHeader);

        //createing elements for humidity
        var foreHumidity = document.createElement("h5");
        foreHumidity.textContent = "Humidity:" + roundNum(forecasts[i].humidity) + "%";
        forecastObj.appendChild(foreHumidity);

        //createng elements for wind speed
        var foreWindSpeed = document.createElement("h5");
        foreWindSpeed.textContent = "Wind Speed:" + roundNum(forecasts[i].wind_speed);
        forecastObj.appendChild(foreWindSpeed);

        //createing elements for high temperatures
        var foreHighTemp = document.createElement("h5");
        foreHighTemp.textContent = "High Temp:" + roundNum(forcasts[i].temp.max);
        forecastObj.appendChild(foreHighTemp);

        //createing elements for low temperatures
        var foreLowTemp = document.createElement("h5");
        foreLowTemp.textContent = "Low Temp:" + roundNum(forecasts[i].temp.min);
        forecastObj.appendChild(foreLowTemp);

        futureForecastsEl.appendChild(forecastObj)
       
    }

$("#forecast-1").text("Tomorrow");
$("#forecast-2").text("forecastDate2");
$("#forecast-3").text("forecastDate3");
$("#forecast-4").text("forecastDate4");
$("#forecast-5").text("forecastDate5");

}




