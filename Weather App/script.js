window.addEventListener('load', ()=> {  //After the page loades the function runs and we get the location of the user
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) { //I.e. if this location exists in the browser
        navigator.geolocation.getCurrentPosition(position => {
          longitude = position.coords.longitude; //We set the information recieved to our longitude and latitude variables
          latitude = position.coords.latitude;

          const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=WUZ958RG6FZ4HQNT9L4GQ2LF2`

          fetch(api) //Submits a get request from the api
          .then(respone =>{
            return respone.json(); //Info is taken and converted into json so the info can be easily usable in js
          })
          .then(data =>{
            console.log(data);
            const { temp, conditions, icon } = data.currentConditions;
            
            temperatureDegree.innerHTML = temp; //Here im accessing the data provided by the api and setting it to my information
            temperatureDescription.innerHTML = conditions;
            locationTimezone.innerHTML = data.timezone;

            let celsius = (temp - 32) * (5 / 9); //Are tempertaure provided by the api is intially in the units F so this is an equation of conversion to C
            
            setIcons(icon, document.querySelector('.icon')) //Here we run the function

            temperatureSection.addEventListener('click', () =>{ //Upon clicking the temp section, the temperature units interchange between C and F
              if(temperatureSpan.innerHTML === "F"){
                  temperatureSpan.innerHTML = "C";
                  temperatureDegree.innerHTML = Math.round(celsius * 10) / 10;
              } else {
                temperatureSpan.innerHTML = "F";
                temperatureDegree.innerHTML = temp;
              }
            })
          });
        });
    } else {
      h1.innerHTML = "Sorry, you're browser currenlty does not support this. Please enable geolocation."
    }

    function setIcons(icon, iconID) { //https://darkskyapp.github.io/skycons/ was used for icon implementation
      const skycons = new Skycons({color: "white"});
      //Conforms to skycons naming
      const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //The api presented icons with - used as spaces in not capital format and the skycons presented the icon names with a capitalized fomrat and _ used as spaces.
      skycons.play(); //Initites the animation
      return skycons.set(iconID, Skycons[currentIcon]); //Return the new icon allowing us to run it above
    }
});