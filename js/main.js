// var settings;
var obj = {};

if(localStorage.getItem("Settings") !== null && localStorage.getItem("Settings").length > 0) {
    // settings = JSON.parse(localStorage.getItem("Settings"));
    obj = JSON.parse(localStorage.getItem("Settings"));
}

else {
    obj.theme = "red";
}

localStorage.setItem("Settings", JSON.stringify(obj));

var theme = obj.theme;

switch(theme) {
    case "orange":
        document.getElementById("cssTheme").href = "../css/Themes/orange-blue-theme.css";
    break;
    case "red":
        document.getElementById("cssTheme").href = "../css/Themes/red-black-theme.css";
    break;
    case "light":
        document.getElementById("cssTheme").href = "../css/Themes/light-theme.css";
    break;
    case "dark":
        document.getElementById("cssTheme").href = "../css/Themes/dark-theme.css";
    break;
    default:
        document.getElementById("cssTheme").href = "../css/Themes/orange-blue-theme.css";
    break;
}