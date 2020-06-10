console.log((window.innerWidth-1000)/2);
let one = document.querySelector(".team-one-logo");
let two = document.querySelector(".team-two-logo");

one.style.width = (document.querySelector(".container").clientWidth-1000)/2 + "px";
two.style.width = (document.querySelector(".container").clientWidth-1000)/2 + "px";