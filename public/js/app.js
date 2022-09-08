var fetchWeather = "/weather";


//get value to be added in the box and display when clicked
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

//create reference for our weatherIcon,Temperature and weatherCondition
const weatherIcon = document.querySelector('.weatherIcon i');//get weather icon
const weatherCondition = document.querySelector('.weatherCondition'); //weather condition

const tempElement = document.querySelector('.temperature span'); // get temperature span tag

const locationElement = document.querySelector('.place'); //get place

const dateElement = document.querySelector('.date'); //get date

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames [new Date().getMonth()].substring(0,4);

//The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. For example, this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(search.value);//display typed value on console 

    
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);//convert from fahrenheit to celsius and toFixed to to show 2 decimal
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
    
})