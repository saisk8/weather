// API call
$(document)
    .ready(function() {
        var lat, long, city, country, url;

        // Get the location
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(function(position) {
                makeURL(position.coords.latitude, position.coords.longitude);
            });
        } else {
            /* geolocation IS NOT available */
            alert("Location not available");
        }

        function makeURL(lat, long) {
            var base = "https://fcc-weather-api.glitch.me/api/current?";
            url = base + "lat=" + lat + "&lon=" + long;
            console.log(url);
        }

        $.getJSON(url, function(data) {
            var rawJson = JSON.stringify(data);
            var json = JSON.parse(rawJson);
            console.log(json);
            updateWeather(json);
        });

        function updateWeather(json) {
            var condition = json.weather[0].description;
            country = json.sys.country;
            city = json.name;
            $("#condition")
                .html(condition);
            $("#country")
                .html(country);
            $("#city")
                .html(city);
            var temp = [(json.main.temp - 273.15)
                .toFixed(0) + "°C", (1.8 * (json.main.temp - 273.15) + 32)
                .toFixed(0) + "F"
            ];
            $(".temp-celsius")
                .html(temp[0]);
            $(".temp-fahrenheit")
                .html(temp[1]);
            value = 'c';
            $(".temperature")
                .click(function(value) {
                    $(".temp-celsius")
                        .toggle();
                    $(".temp-fahrenheit")
                        .toggle();
                });
            document.getElementById("y")
                .src = json.weather.icon;
        }
    });