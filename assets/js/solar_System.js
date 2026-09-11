const space = document.getElementById("space");
let started = false;

function startJourney() {
    if (started) return;

    started = true;
    space.classList.add("active");

    setTimeout(function () {
        space.classList.add("system");
    }, 3500);
}

window.addEventListener("load", function () {
    setTimeout(function () {
        startJourney();
    }, 1000);
});
