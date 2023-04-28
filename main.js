//GLOBAL CONSTANTS
var htmlButton = document.querySelector('#get-forecast');

var elementOffice       = document.getElementById('office');
var elementGridX        = document.getElementById('grid-x');
var elementGridY        = document.getElementById('grid-y');
var elementForecastText = document.getElementById('forecast-text');

//ADD EVENT FUNCTION TO HTML BUTTON 
htmlButton.addEventListener('click', function () { UseClass();})

function UseClass() {
    // var geoInst = new Geo();
    // var geoCoords = new Geo();

    // geoCoords = geoInst.GetLocation();
    // RequestForecast(geoCoords);
    function success(position) {
        
        fetchdata(position.coords.latitude, position.coords.longitude);
        
        }
        
        function error() {
        
        console.log("ERROR");
        }
        
        if (!navigator.geolocation) {
        
         console.log = "Geolocation is not supported by your browser";
        
        } else {
        
        console.log = "Locating…";
        
        navigator.geolocation.getCurrentPosition(success, error);
        
        }

}

function SendLocation(lat, lon){
    let ajax                  = new XMLHttpRequest; //Asynchronous JavaScript And Xml
    let requestMethod         = "GET";              //Give me data

    let requestUrl            = `https://api.weather.gov/points/${lat},${lon}`;                 //Url
    let requestIsAsyncronous = false;

    ajax.open(requestMethod, requestUrl, requestIsAsyncronous);
}

function fetchdata(latitude, longitude) {

        fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
    
        .then(response => {
    
        return response.json();
    
        })
    
        .then(data => {
    
            console.log(data);
    
        });
}

function RequestForecast(office, gridX, gridY) {
    let office                = this.elementOffice.value;
    let gridX                 = this.elementGridX.value;
    let gridY                 = this.elementGridY.value;

    let ajax                  = new XMLHttpRequest; //Asynchronous JavaScript And Xml
    let requestMethod         = "GET";              //Give me data

    let requestUrl3           = `https://api.weather.gov/points/${lat},${lon}`;
    let requestUrl            = `https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`;                 //Url
    let requestUrl2           = "https://api.weather.gov/gridpoints/" + office + "/" + gridX + "," + gridY + "/forecast";  //Url
    let requestIsAsyncronous  = false;               //dont hold up wepage when waiting response

    //SEND AJAX REQUEST TO THE URL
    ajax.open(requestMethod, requestUrl3, requestIsAsyncronous); //ajax.open(method, url, async)

    //SET CALLBACK FUNCTION (this function gets called automatically when the response gets back) ***
    ajax.onreadystatechange = ReturnForecast;

    //SEND REQUEST
    var data = ajax.send();

    console.log("----data----");
    console.log(data);

}//END FUNCTION 

function ReturnForecast() {
    var responseStatusOk = this.status === 200;   //STATUS 200 means OK
    var responseComplete = this.readyState === 4; //readyState 4 means response is ready

    if(responseStatusOk && responseComplete){
        //console.log(this.responseText.properties); //debug

        //PARSE THE RESPONSE - convert values to JSON
        let responseData = JSON.parse(this.responseText);

        //GET THE WEATHER FROM THE RESPONSE TEXT
        let properties = responseData.properties;
        let forecast   = properties.periods[0];
        let message    = forecast.detailedForecast;

        elementForecastText.innerHTML = message;
    }else{
        //SOMETHING WENT WRONG
        console.log(this);
    }//end if
}//END FUNCTION