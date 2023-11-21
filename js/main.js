window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

// var settings;
var obj = {};

if(localStorage.getItem("Settings") !== null && localStorage.getItem("Settings").length > 0) {
    // settings = JSON.parse(localStorage.getItem("Settings"));
    obj = JSON.parse(localStorage.getItem("Settings"));
}

if(obj.theme === undefined || obj.theme === "" || obj.theme === null) {
    obj.theme = "red";
}

if(obj.card === undefined || obj.card === "" || obj.card === null) {
    obj.card = "1";
}

if(obj.bg === undefined || obj.bg === "" || obj.bg === null) {
    obj.bg = "1";
}


localStorage.setItem("Settings", JSON.stringify(obj));

var theme = obj.theme;

switch(theme) {
    case "orange":
        if(window.location.href.includes("index.html")) {
            document.getElementById("cssTheme").href = "./css/Themes/orange-blue-theme.css";
        }
        else {
            document.getElementById("cssTheme").href = "../css/Themes/orange-blue-theme.css";
        }
    break;
    case "red":
        if(window.location.href.includes("index.html")) {
            document.getElementById("cssTheme").href = "./css/Themes/red-black-theme.css";
        }
        else {
            document.getElementById("cssTheme").href = "../css/Themes/red-black-theme.css";
        }
    break;
    case "light":
        if(window.location.href.includes("index.html")) {
            document.getElementById("cssTheme").href = "./css/Themes/light-theme.css";
        }
        else {
            document.getElementById("cssTheme").href = "../css/Themes/light-theme.css";
        }
    break;
    case "dark":
        if(window.location.href.includes("index.html")) {
            document.getElementById("cssTheme").href = "./css/Themes/dark-theme.css";
        }
        else {
            document.getElementById("cssTheme").href = "../css/Themes/dark-theme.css";
        }
    break;
    default:
        if(window.location.href.includes("index.html")) {
            document.getElementById("cssTheme").href = "./css/Themes/orange-blue-theme.css";
        }
        else {
            document.getElementById("cssTheme").href = "../css/Themes/orange-blue-theme.css";
        }
    break;
}