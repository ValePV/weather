function skycons() { // icons
  var i,
    icons = new Skycons({
      'color': '#FFFFFF',
      'resizeClear': true // nasty android hack
    }),
    list = [ // listing of all possible icons
      'clear-day',
      'clear-night',
      'partly-cloudy-day',
      'partly-cloudy-night',
      'cloudy',
      'rain',
      'sleet',
      'snow',
      'wind',
      'fog'
    ];
 
    // loop thru icon list array
  for (i = list.length; i--;) {
    var weatherType = list[i], // select each icon from list array
      // icons will have the name in the array above attached to the 
      // canvas element as a class so let's hook into them.
      elements = document.getElementsByClassName(weatherType);
    // loop thru the elements now and set them up
    for (e = elements.length; e--;) {
      icons.set(elements[e], weatherType);
    }
  }
  // animate the icons
  icons.play();
}

let options = { // current position
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
    // Turns the the JSON into a JS object
    return response.json();
  })
  .then((data) => {
    console.log(data);
    let temperature = Math.round(data.currently.apparentTemperature);
    let humidity = parseInt(data.currently.humidity);
    let windSpeed = Math.round(data.currently.windSpeed);
    let uvIndex = data.currently.uvIndex;
    let pressure = Math.round(data.currently.pressure);

    $('.info_clima').append(`<h1>${temperature}°C</h1><canvas>${data.currently.icon}</canvas>`);
    $('.info_clima').append(`<div class='table-responsive col-xs-12'><table><tr><th>Wind</th><td>${windSpeed} m/s</td></tr><tr><th>Humidity</th><td>${humidity*1000} %</td></tr>
  <tr><th>UV index</th><td>${uvIndex}</td></tr><tr><th>Pressure</th><td>${pressure} hPa</td></tr></table><div>`);

    /* var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;*/

    let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let myDay = [];
    for (let i = 1; i < data.daily.data.length; i++) {
      let dNumber = data.daily.data[i].time;
      let dName = new Date(dNumber * 1000).getDay();
      myDay.push(dName);
    }

    let dia1Max = Math.round(data.daily.data[1].temperatureHigh);
    let dia1Min = Math.round(data.daily.data[1].temperatureLow);
    let dia2Max = Math.round(data.daily.data[2].temperatureHigh);
    let dia2Min = Math.round(data.daily.data[2].temperatureLow);
    let dia3Max = Math.round(data.daily.data[3].temperatureHigh);
    let dia3Min = Math.round(data.daily.data[3].temperatureLow);
    let dia4Max = Math.round(data.daily.data[4].temperatureHigh);
    let dia4Min = Math.round(data.daily.data[4].temperatureLow);
    let dia5Max = Math.round(data.daily.data[5].temperatureHigh);
    let dia5Min = Math.round(data.daily.data[5].temperatureLow);
    let dia6Max = Math.round(data.daily.data[6].temperatureHigh);
    let dia6Min = Math.round(data.daily.data[6].temperatureLow);
    let dia7Max = Math.round(data.daily.data[7].temperatureHigh);
    let dia7Min = Math.round(data.daily.data[7].temperatureLow);


    $('.prediction').click(function() {
      $('.info_clima').addClass('hidden');
      $('.prediction').addClass('hidden');
      $('.info_week').removeClass('hidden');
      $('.regresar').removeClass('hidden');
      // var today     = moment(new Date());
      GetRandomBackground();
    });
    $('.info_week').append(`<div class='table-responsive col-xs-12'><table><tr><th>${day[myDay[0]]}</th><td>${dia1Min}-${dia1Max}ºC</td></tr><tr><th>${day[myDay[1]]}
  </th><td>${dia2Min}-${dia2Max}ºC</td></tr><tr><th>${day[myDay[2]]}</th><td>${dia3Min}-${dia3Max}ºC</td></tr><tr><th>${day[myDay[3]]}
  </th><td>${dia4Min}-${dia4Max}ºC</td></tr><tr><th>${day[myDay[4]]}</th><td>${dia5Min}-${dia5Max}ºC</td></tr><tr><th>${day[myDay[5]]}</th><td>${dia6Min}-${dia6Max}ºC
  </td></tr><tr><th>${day[myDay[6]]}</th><td>${dia7Min}-${dia7Max}ºC</td></tr></table><div>`);

    $('.regresar').click(function() {
      $('.regresar').addClass('hidden');
      $('.info_week').addClass('hidden');
      $('.info_clima').removeClass('hidden');
      $('.prediction').removeClass('hidden');
    });
    skycons();
  });

// backgraund random desde api unsplash
function GetRandomBackground() {
  var appId = '7dbce83ac901820e4e87d5ed27f54648c8d692df4a8cd6cdc5d3d1badd7a8411';
  var url = 'https://api.unsplash.com/photos/random?client_id=' + appId;    
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(json) {
      var src = json.urls.regular;
      $('body').css('background-image', 'url(' + src + ')').css('background-size', 'auto');
    }
  });
}
GetRandomBackground();
