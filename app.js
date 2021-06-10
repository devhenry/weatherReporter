
// Selecting HTML elements
var iconElement = document.querySelector(".weather-icon");
var tempElement = document.querySelector(".temperature-value p");
var descElement = document.querySelector(".temperature-description p");
var locationElement = document.querySelector(".location p");
var notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP const and var
const KELVIN = 273;
// Api key
const key = "e59be241e56fcf0560b5e016b505241f";

// Checking for internet
function myInternet(){
    if(navigator.onLine == true){
       
        setPosition();

    }else if(navigator.onLine == false){

            var x = document.getElementById("noInternet");
            x.className = "show";
            setTimeout(() =>{ x.className = x.className.replace("show", ""); }, 3000);
              
    }
   
  }


// Checking if the browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// Setting the users current postion 
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// Error Reporting
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
    
}

// Getting the weather from an api
 function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api) // fetching the API
        .then((response) =>{
            let data = response.json();
            return data;
        })
        .then((data) =>{
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(() =>{
            displayWeather();   
            
        });
       
}

// Displahying the weather elements on page
  function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    
    backgroundImageChanger()
    colorIndicator();
    voiceReporter();
}

// converting from celcius to Fahrenheit
celsiusToFahrenheit = (temperature) => {
    return (temperature * 9/5) + 32;
}

// click to change celcius to fahrenheit and vice versa
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        var fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


//Function to check temperature unit and read to user
 function voiceReporter(){

    var fahr = tempElement.innerHTML; //pick the html element displayed
    var res = fahr.split("",3); // split it to get what you want
    var joiner = res.join(''); //join the array elements without a comma
    var storeJoin = [joiner]; //store into an array.



    if(weather.temperature.unit == "fahrenheit"){
        
       
        let msg = document.querySelector(".location").value = `There will be ${weather.description} in ${weather.city} and the current temperature is ${storeJoin}fahrenheit`;
                
            let speech = new SpeechSynthesisUtterance();
            speech.lang = "en-UK";
            
            speech.text = msg;
            speech.volume = 2;
            speech.rate = 1;
            speech.pitch = 1;
            
            window.speechSynthesis.speak(speech);
        
    }else if(weather.temperature.unit == "celsius"){
       
            let msg = document.querySelector(".location").value = `There will be ${weather.description} in ${weather.city} and the current temperature is ${storeJoin}celsius`;
                
            let speech = new SpeechSynthesisUtterance();
            speech.lang = "en-UK";
            
            speech.text = msg;
            speech.volume = 2;
            speech.rate = 1;
            speech.pitch = 1;
            
            window.speechSynthesis.speak(speech);
        
    }
  
    acAlert();
}

//function to determine is temperature is good for Airconditioner or not
function acAlert(){

    if(weather.temperature.value > 25){

        let msg = "Turn on the Airconditioner,the weather is warm enough.";
                
        let speech = new SpeechSynthesisUtterance();
        speech.lang = "en-UK";
        
        speech.text = msg;
        speech.volume = 2;
        speech.rate = 1;
        speech.pitch = 1;
        
        window.speechSynthesis.speak(speech);

    }else if(weather.temperature.value <= 25){

        let msg = "There is no need to turn on the Airconditioner,the weather is cold enough.";
                
        let speech = new SpeechSynthesisUtterance();
        speech.lang = "en-UK";
        
        speech.text = msg;
        speech.volume = 2;
        speech.rate = 1;
        speech.pitch = 1;
        
        window.speechSynthesis.speak(speech);
    
        }

        

}
        //function to change indicator to different colors depending on the temperature
function colorIndicator(){

    if(weather.temperature.value > 25){

        document.querySelector(".temp").style.backgroundColor = " #d82020";
     } else if(weather.temperature.value <= 25){

        document.querySelector(".temp").style.backgroundColor = " #0783f7";
     } 
}

//function to add gif of weather to app 
function backgroundImageChanger(){
      
    var ourCondition = weather.description;

    switch(ourCondition){
    case 'clear sky':
    
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/clearsky.gif')";
         ch.style.backgroundRepeat = "repeat-x";
         break;

    case 'rainy':
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/rainfall.gif')";
         ch.style.backgroundRepeat = "repeat-x";
         break;

    case 'few clouds':
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/fewclouds.gif')";
         ch.style.backgroundRepeat = "no-repeat";
         break;

    case 'scattered clouds':
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/scatteredclouds.gif')";
         ch.style.backgroundRepeat = "repeat-x";
         break;

     case 'scattered clouds':
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/scatteredclouds.gif')";
         ch.style.backgroundRepeat = "repeat-x";
         break;

    case 'broken clouds':
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/brokenclouds.gif')";
         ch.style.backgroundRepeat = "repeat-x";
         break;

     case 'shower rain':
         var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/showerrain.gif')";
         ch.style.backgroundRepeat = "repeat-x";
         break;

         case 'thunderstorm':
            var ch = document.querySelector(".container");
         ch.style.backgroundImage = "url('/icons/thunderstorm.gif')";
         ch.style.backgroundRepeat = "repeat-x";
            break;

        
    default:

        var ch = document.querySelector(".container");
        ch.style.backgroundImage = "url('/icons/clearsky.gif')";
        ch.style.backgroundRepeat = "repeat-x";
    }
    
}
     
// Auto refresh page every 1 hr
 AutoRefresh = ( t ) => {
        
        setTimeout("location.reload(true);", t);
        
        
    }
     
    
    



     
   