let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  let crd = pos.coords;

 sessionStorage.setItem('latitude', crd.latitude);
 sessionStorage.setItem('longitude', crd.longitude);
 console.log(sessionStorage.getItem('latitude'));
 console.log(sessionStorage.getItem('longitude'));
};
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(success, error, options);

let latitude = sessionStorage.getItem('latitude');
let longitude = sessionStorage.getItem('longitude');

fetch(`https://api.darksky.net/forecast/4ec1983185d2c03f41bb0aba2a0a0254/${latitude},${longitude}?units=auto`)
.then((response) => {
   //Turns the the JSON into a JS object
   return response.json();
 })
 .then((data) => {
  console.log(data);
let temperature = Math.round(data.currently.apparentTemperature);
let humidity = data.currently.humidity;
let windSpeed = data.currently.windSpeed;
let uvIndex = data.currently.uvIndex;
let pressure = Math.round(data.currently.pressure);


$('.info_clima').append(`<h1>${temperature}°C</h1>`);
$('.info_clima').append(`<div class='table-responsive col-xs-12'><table><tr><th>Wind</th><td>${windSpeed} m/s</td></tr><tr><th>Humidity</th><td>${humidity*100} %</td></tr>
  <tr><th>UV index</th><td>${uvIndex}</td></tr><tr><th>Pressure</th><td>${pressure} hPa</td></tr></table><div>`);

/*var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;*/

    let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let myDay= [];
    for (let i = 1; i < data.daily.data.length; i++) {
      let dNumber = data.daily.data[i].time;
      let dName = new Date(dNumber *1000).getDay();
      myDay.push(dName);
    }

let dia1_max = Math.round(data.daily.data[1].temperatureHigh);
let dia1_min = Math.round(data.daily.data[1].temperatureLow);
let dia2_max = Math.round(data.daily.data[2].temperatureHigh);
let dia2_min = Math.round(data.daily.data[2].temperatureLow);
let dia3_max = Math.round(data.daily.data[3].temperatureHigh);
let dia3_min = Math.round(data.daily.data[3].temperatureLow);
let dia4_max = Math.round(data.daily.data[4].temperatureHigh);
let dia4_min = Math.round(data.daily.data[4].temperatureLow);
let dia5_max = Math.round(data.daily.data[5].temperatureHigh);
let dia5_min = Math.round(data.daily.data[5].temperatureLow);
let dia6_max = Math.round(data.daily.data[6].temperatureHigh);
let dia6_min = Math.round(data.daily.data[6].temperatureLow);
let dia7_max = Math.round(data.daily.data[7].temperatureHigh);
let dia7_min = Math.round(data.daily.data[7].temperatureLow);


$('.prediction').click(function(){
  $('.info_clima').addClass('hidden');
  $('.prediction').addClass('hidden');
  $('.info_week').removeClass('hidden');
  $('.regresar').removeClass('hidden');
  //var today     = moment(new Date());
 GetRandomBackground();

});
 $('.info_week').append(`<div class='table-responsive col-xs-12'><table><tr><th>${day[myDay[0]]}</th><td>${dia1_min}-${dia1_max}ºC</td></tr><tr><th>${day[myDay[1]]}
  </th><td>${dia2_min}-${dia2_max}ºC</td></tr><tr><th>${day[myDay[2]]}</th><td>${dia3_min}-${dia3_max}ºC</td></tr><tr><th>${day[myDay[3]]}
  </th><td>${dia4_min}-${dia4_max}ºC</td></tr><tr><th>${day[myDay[4]]}</th><td>${dia5_min}-${dia5_max}ºC</td></tr><tr><th>${day[myDay[5]]}</th><td>${dia6_min}-${dia6_max}ºC
  </td></tr><tr><th>${day[myDay[6]]}</th><td>${dia7_min}-${dia7_max}ºC</td></tr></table><div>`);

$('.regresar').click(function(){
  $('.regresar').addClass('hidden');
  $('.info_week').addClass('hidden');
  $('.info_clima').removeClass('hidden');
  $('.prediction').removeClass('hidden');




});

 });

//backgraund random desde api unsplash
 function GetRandomBackground()
  {
    var app_id = '7dbce83ac901820e4e87d5ed27f54648c8d692df4a8cd6cdc5d3d1badd7a8411'
    var url = 'https://api.unsplash.com/photos/random?client_id=' + app_id;    
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(json) {
        var src = json.urls.regular;
        $('body').css('background-image','url('+src+')').css('background-size','auto');
      }
    });
  }
  GetRandomBackground();