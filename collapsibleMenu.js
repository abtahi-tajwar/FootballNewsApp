var dropDownDiv = document.querySelector(".menu");
var drop = document.querySelector(".dropdown");
var closedrop = document.querySelector(".close_dropdown");

drop.addEventListener("click", () => {
    dropDownDiv.style.height = "100vh";
});
closedrop.addEventListener("click", () => {
    dropDownDiv.style.height = "0px";
});

var select_league_dropdown = document.querySelector(".select_league_dropdown");
var dropdown_click_area = document.querySelector(".dropdown_click_area");
let dropdown_open_state = false;
if(select_league_dropdown != null) {
    dropdown_click_area.addEventListener("click", () => {
        if(dropdown_open_state) {
            select_league_dropdown.style.height = "33px";
            dropdown_open_state = !dropdown_open_state;
        }
        else {
            if(window.innerHeight - getOffset(select_league_dropdown).top >= 264) {
                select_league_dropdown.style.height = window.innerHeight - getOffset(select_league_dropdown).top + "px";
                dropdown_open_state = !dropdown_open_state;
            }
            else {
                select_league_dropdown.style.height = "264px";
                dropdown_open_state = !dropdown_open_state;
            }
            
        }
    });
}
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top
    }
}