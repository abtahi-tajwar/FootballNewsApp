const list = document.querySelectorAll(".list_body ul li");
list.forEach(elem => {
    elem.addEventListener("click", () => {
        document.querySelector(".leagues_list").style.marginLeft = "-100vw";
    });
})
document.querySelector(".list_back").addEventListener('click', () => {
    document.querySelector(".leagues_list").style.marginLeft = "0vw";
})
