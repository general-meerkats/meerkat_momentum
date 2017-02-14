/* jshint esversion:6 */
/* globals $, navigator, console */

var Weather = (function () {
    'use strict';

    // html5 geolocation
    function getLocation() {
        var geoOptions = {
            enableHighAccuracy: true,
            timeout    : 10000,
            maximumAge : 300000
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(geoSuccess, getIpLocation, geoOptions);
        } else {
            getIpLocation(); // fallback to ip-based location
        }

    }


    // handle html5 geolocation success
    function geoSuccess(res) {
        console.log('Using html5 geolocation...');

        // normalize position & call getWeather()
        getWeather({
            'latitude'  : res.coords.latitude,
            'longitude' : res.coords.longitude
        });
    }


    // ip-based location fallback
    function getIpLocation() {
        console.log('html5 geolocation failed, using IP-based location instead...');

        $.getJSON('https://freegeoip.net/json/')
            .then(getWeather)
            .catch(weatherErrors);
    }


    // get weather
    function getWeather(position) {

        var api = {
            proxy    : 'https://cors-anywhere.herokuapp.com/',
            endpoint : 'https://api.darksky.net/forecast/',
            key      : "3530553cce7adca5c5525b813494ada0/",
            lat      : position.latitude,
            lon      : position.longitude
        };

        $.getJSON(api.proxy + api.endpoint + api.key + api.lat + ',' + api.lon)
            .then(function (weather) {
                return getCity({
                    position : position,
                    weather  : weather
                });
            })
            .then(function (data) {
                console.log('{city: String, weather: Object} // ', data);
                renderFeature(data);
                renderPanel(data);
            })
            .catch(weatherErrors);

    }

    // obtain city name
    function getCity(data) {
        
        // console.log('getCity ', data);  // diag

        // just return if data.position already has city,
        // which it will if we used ip-based location
        if (data.position.city) {
            return {
                city     : data.position.city,
                weather  : data.weather
            };

        } else {

            var api = {
                endpoint: 'https://nominatim.openstreetmap.org/reverse',
                params: {
                    format : 'json',
                    lat    : data.position.latitude,
                    lon    : data.position.longitude,
                    addressdetails: 1
                }
            };

            return $.getJSON(api.endpoint, api.params)
                .then(function (loc) {
                    return {
                        city : translateCity(loc),
                        weather  : data.weather
                    };
                });
        }
    }
    
    
    // translate location data response to ensure we give a 'city'
    // to the feature renderer. Needed because location responses can include
    // non-city entities (town, village, etc)
    function translateCity(c) {
        
        // console.log(c); // diag
        
        var okCities = ['city', 'village', 'hamlet', 'town', 'suburb', 'neighbourhood'],
            keys     = Object.keys(c.address),
            match    = keys.filter( (key) => (okCities.indexOf(key) !== -1) )[0];
        
        return (match) ? c.address[match] : 'Forecast';
    }


    // render feature
    function renderFeature(data) {
        var icon  = data.weather.currently.icon,
            temp  = Math.round(data.weather.currently.temperature),
            city  = data.city.toUpperCase(),
            $wi   = $('<span id="icon_img"></span>'),
            $temp = '<span class="temp">' + temp + '&deg</span>',
            $loc  = '<p class="location">' + city + '</p>';

        $wi.append('<i class="wi wi-forecast-io-' + icon + '"></i>');

        $('#weather-feature')
            .append($wi)
            .append($temp)
            .append($loc);
    }


    // render weather-panel
    function renderPanel(data) {
        var summary  = data.weather.daily.summary,
            daily    = data.weather.daily.data,
            $weatherPanel = $('#weather-panel .panel-content'),
            $summary = $('<p>Summary: ' + summary + '</p>'),
            $table   = $('<table></table>'),
            $daily   = $('<pre>' + JSON.stringify(daily, null, 2) + '</pre>');

        $table
            .append(`<thead>
                       <tr>
                         <th class="left">Day</th>
                         <th>Low</th>
                         <th>High</th>
                         <th>Weather</th>
                       </tr>
                     </thead>
                     <tbody>`);

        daily.forEach(function (day) {

            var date = new Date(day.time * 1000).toDateString(),
                $trA = $('<tr></tr>'),
                $trB = $('<tr></tr>');

            $trA
                .append('<td class="left">' + date.slice(0, 10) + '</td>')
                .append('<td>' + Math.round(day.temperatureMin) + '&deg</td>')
                .append('<td>' + Math.round(day.temperatureMax) + '&deg</td>')
                .append('<td><i class="wi wi-forecast-io-' + day.icon + '"></i></td>');

            $trB
                .append('<td class="left" colspan="4">' + day.summary + '</td>');

            $table
                .append($trA)
                .append($trB);

        });

        $weatherPanel
            .append($summary)
            .append($table);

    }


    // handle location errors
    function weatherErrors() {
        console.warn('Error fetching weather');
    }


    // public init method
    function init() {
        getLocation();
    }


    // export public methods
    return {
        init: init
    };

}());