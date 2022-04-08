var cityInputEl = document.querySelector("#city-input");
var submitButton = document.querySelector("#get-weather");
var currentTemperature = $("#temperature");
var currentHumidity= $("humidity");
var currenWindSpeed= $("wind-speed");
var currentUvIndex=$("#uv-index");
var city = [];

var APIKey="ff06d6c0b03f8ea58a8409a49f112901";



//AJAX call
function currentWeather(city){
    var queryURL="http://apiopenweathermap.org/data/2.5/weather?q" + city + "&APPID=" +APIKey;
    $.ajax({
        url:queryURL,
        method:"get",
    }).then(function(response){
    var weathericon=response.weather[0].icon;
    var iconur1="https://openwethermap.org/img/wn/"+weathericon +"@2x.png";
    //parse the response
    $(currentCity).html(response.name+"("+date+")" + "<img src="+iconur1+">");
    })
}



//Storage of past cities and weather
function storeCities() {
    localStorage.setItem ("cities", JSON.stringify(cities));
    console.log(localStorage);
}

//Creating init for initialsation 
 function init(){
     //Store cities from localStorage
     var storedCities = JSON.parse(localStorage.getItem("cities"));

    //Retrieving cities that were saved to localStoreage

    if(storedCities !==null) {
        cities= storedCities;
    } 
    // // //Save cities 
    // renderCities();

    // console.log(cities);

 }


