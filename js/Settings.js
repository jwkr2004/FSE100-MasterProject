var obj = {};

window.addEventListener("load", () => {
    obj = JSON.parse(localStorage.getItem("Settings"));

    var arr = document.querySelectorAll(".SettingsCard");
    arr[Number(obj.card) - 1].style.borderColor = "red";

    var arr = document.querySelectorAll(".SettingsBG");
    arr[Number(obj.bg) - 1].style.borderColor = "red";

    document.querySelectorAll(".SettingsTheme").forEach((elem, index) => {
        elem.addEventListener("click", (div) => {
            switch(index) {
                case 0:
                    obj.theme = "orange"
                break;
                case 1:
                    obj.theme = "red"
                break;
                case 2:
                    obj.theme = "dark"
                break;
                case 3:
                    obj.theme = "light"
                break;
                default:
                    obj.theme = "orange"
                break;
            }
            localStorage.setItem("Settings", JSON.stringify(obj));
            location.reload();
        });
    });

    document.querySelectorAll(".SettingsCard").forEach((elem, index) => {
        elem.addEventListener("click", (div) => {
            switch(index) {
                case 0:
                    obj.card = "1"
                break;
                case 1:
                    obj.card = "2"
                break;
                case 2:
                    obj.card = "3"
                break;
                case 3:
                    obj.card = "4"
                break;
                default:
                    obj.card = "1"
                break;
            }
            localStorage.setItem("Settings", JSON.stringify(obj));
            location.reload();
        });
    });

    document.querySelectorAll(".SettingsBG").forEach((elem, index) => {
        elem.addEventListener("click", (div) => {
            switch(index) {
                case 0:
                    obj.bg = "1"
                break;
                case 1:
                    obj.bg = "2"
                break;
                case 2:
                    obj.bg = "3"
                break;
                default:
                    obj.bg = "1"
                break;
            }
            localStorage.setItem("Settings", JSON.stringify(obj));
            location.reload();
        });
    });
});