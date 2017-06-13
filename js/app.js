// API call
$(document)
    .ready(function() {
        var lat, long, city, country;

        // Get the location

        $.getJSON('https://ipinfo.io/json', function(data) {

            var coord = data.loc.split(",");
            console.log(data);
            city = data.city;
            country = data.region;
            lat = coord[0];
            long = coord[1];
            console.log(lat);


            var url = "https://api.darksky.net/forecast/bf4bd9f99479ebc92a9707ecd8f2b52a/" +
                lat + "," + long;
            console.log(url);
            $.getJSON(url, function(data) {
                var rawJson = JSON.stringify(data);
                var json = JSON.parse(rawJson);
                console.log(json);
                setWeather(json); //Update Weather parameters
            });
        });

        function setWeather(json) {
            var condition = json.currently.summary;
            var windSpeed = json.currently.windSpeed;
            var windBearing = json.currently.windBearing;
            $("#condition")
                .html(condition);
            $("#country")
                .html(country);
            $("#city")
                .html(city);
            $("#windSpeed")
                .html(windSpeed);
            $("#windBearing")
                .html(windBearing);
            var temp = [(json.currently.temperature - 32) / 1.8
                .toFixed(0) + "°C", (json.currently.temperature)
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
            var weather = json.currently.icon;

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
