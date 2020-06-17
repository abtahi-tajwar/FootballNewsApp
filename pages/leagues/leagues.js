const list = document.querySelectorAll(".list_body ul li");
list.forEach(elem => {
    elem.addEventListener("click", () => {
        document.querySelector(".leagues_list").style.marginLeft = "-100vw";
    });
})
document.querySelector(".list_back").addEventListener('click', () => {
    document.querySelector(".leagues_list").style.marginLeft = "0vw";
});
document.querySelector(".expand").addEventListener('click', ()=> {
    console.log("History Seen");
    document.querySelector(".history_container").style.top = "63px";
});
document.querySelector(".collapse_history").addEventListener('click', ()=> {
    document.querySelector(".history_container").style.top = "100vh";
});
