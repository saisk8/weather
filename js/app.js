// API call
$(document)
    .ready(function() {
        var lat, long, city, country;

        // Get the location

        $.getJSON('http://ipinfo.io', function(data) {

            var coord = data.loc.split(",");
            console.log(data);
            city = data.city;
            country = data.region;
            lat = coord[0];
            long = coord[1];
            console.log(lat);


            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=188b68e6b443a5380ce7ee0f0bb49cfc";
            console.log(url);
            $.getJSON(url, function(data) {
                var rawJson = JSON.stringify(data);
                var json = JSON.parse(rawJson);
                console.log(json);
                setWeather(json); //Update Weather parameters
            });
        });

        function setWeather(json) {
            var condition = json.weather[0].description.substr(0, 1)
                .toUpperCase() + json.weather[0].description.substr(1);
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

            function changingImg(x) {
                document.getElementById("y")
                    .src = x;
            }

            // Set the correct Skycon
            var weather = json.weather[0].description;

            if (weather.indexOf("rain") >= 0) {
                changingImg("http://i.imgur.com/iJjHjLU.png");
                console.log("Success 1!");
            } else if (weather.indexOf("sunny") >= 0) {
                changingImg("http://i.imgur.com/wGL6Qgp.png");
                console.log("Success 2!");
            } else if (weather.indexOf("clear") >= 0) {
                changingImg("http://i.imgur.com/wGL6Qgp.png");
                console.log("Success 3!");
            } else if (weather.indexOf("cloud") >= 0) {
                changingImg("http://i.imgur.com/Watl8Ck.png");
                console.log("Success 4!");
            } else if (weather.indexOf("thunderstorm") >= 0) {
                changingImg("http://i.imgur.com/ciY2IGD.png");
                console.log("Success 5!");
            } else if (weather.indexOf("snow") >= 0) {
                changingImg("http://i.imgur.com/kJNeuYj.png");
                console.log("Success 6!");
            } else {
                console.log("Fail!");
            }
        }
    });
