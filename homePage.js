var dropDownDiv = document.querySelector(".menu");
var drop = document.querySelector(".dropdown");
var closedrop = document.querySelector(".close_dropdown");

drop.addEventListener("click", () => {
    dropDownDiv.style.height = "100vh";
});
closedrop.addEventListener("click", () => {
    dropDownDiv.style.height = "0px";
});