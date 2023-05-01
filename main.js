//GLOBAL CONSTANTS
var htmlButton = document.querySelector('#get-forecast');

var elementOffice       = document.getElementById('office');
var elementGridX        = document.getElementById('grid-x');
var elementGridY        = document.getElementById('grid-y');
var elementForecastText = document.getElementById('forecast-text');

//ADD EVENT FUNCTION TO HTML BUTTON 
//htmlButton.addEventListener('click', function () { UseClass();})

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
        
    ReturnLocation(position.coords.latitude, position.coords.longitude);
}
    
function error() {
    
    console.log("ERROR");
    
    if (!navigator.geolocation) {
    
     console.log = "Geolocation is not supported by your browser";
    
    } else {
    
    console.log = "Locating…";
    
    }
}

function ReturnLocation(latitude, longitude) {

    fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
    
    .then(response => {        
        return response.json();
    })
    
    .then(data => {
        console.log(data);

        var gridArray = [data.properties.gridId, data.properties.gridX, data.properties.gridY]

        console.log(`"${data.properties.gridId}, ${data.properties.gridX}, ${data.properties.gridY}"`)

        document.getElementById('office').value = data.properties.gridId;
        document.getElementById('grid-x').value = data.properties.gridX;
        document.getElementById('grid-y').value = data.properties.gridY;

        RequestForecast(gridArray);
    });
}

function RequestForecast(gridArray) {
    /*let office                = this.elementOffice.value;
    let gridX                 = this.elementGridX.value;
    let gridY                 = this.elementGridY.value;
    */

    let ajax                  = new XMLHttpRequest; //Asynchronous JavaScript And Xml
    let requestMethod         = "GET";              //Give me data

    let requestUrl            = `https://api.weather.gov/gridpoints/${gridArray[0]}/${gridArray[1]},${gridArray[2]}/forecast`;                 //Url
    let requestIsAsyncronous  = false;               //dont hold up wepage when waiting response

    //SEND AJAX REQUEST TO THE URL
    ajax.open(requestMethod, requestUrl, requestIsAsyncronous); //ajax.open(method, url, async)

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