window.onload = () => {
    document.getElementById("start-button").onclick = function () {
        Game.init();
        document.getElementById("start-button").style.zIndex = "-1";
        document.getElementById("start-button").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("title").style.zIndex = "-1";

    };
}