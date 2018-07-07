var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat = "lat=";
var lon = "&lon=";
var temp = "";
var cUnit = "C";

$(document).ready(function() {
	fetchWeatherData();
	$("#toggleTempBtn").on("click", toggleTemp);
	$("#refreshBtn").on("click", function() {
		fetchWeatherData();
	});
});

function fetchWeatherData() {
	$("#weather-card").css("visibility","hidden");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
			lat += pos.coords.latitude;
			lon += pos.coords.longitude;
			api += lat + lon;

			$.getJSON(api, function(data) {
				temp = data.main["temp"];
				$("#location").text( data.name.toUpperCase() + ", " + data.sys.country);
				$("#temp-icon").attr("src",	data.weather[0].icon);
				$("#temp-desc").text(" " + data.main["temp"] + " °C ");
				$("#toggleTempBtn").html("Switch to °F");
				$("#weather-desc").text(data.weather[0].main);
			
				changeBackground(data.weather[0].main);
			});
			$("#weather-card").css("visibility", "visible");
		});
	}
}
function changeBackground(weather) {
	if (weather === "Rain") {
		$("body").addClass("rain");
	} else if (weather === "Clear") {
		$("body").addClass("clear");
	} else if (weather === "Clouds") {
		$("body").addClass("clouds");
	} else if (weather === "Smoke") {
		$("body").addClass("smoke");
	}
}
function toggleTemp() {
	if (cUnit === "F") {
		temp = (temp - 32) * (5 / 9);
		$("#temp-desc").html(temp.toFixed(2) + " °C ");
		$("#toggleTempBtn").html("Switch to °F");
		cUnit = "C";
	} else if (cUnit === "C") {
		temp = temp * (9 / 5) + 32;
		$("#temp-desc").html(temp.toFixed(2) + " °F ");
		$("#toggleTempBtn").html("Switch to °C");
		cUnit = "F";
	}
}
