const list = document.querySelectorAll(".list_body ul li");

var media_query = 'all and (orientation: landscape) and (min-width: 1000px)';
var matched = window.matchMedia(media_query).matches;
if(!matched)
{
    list.forEach(elem => {
        elem.addEventListener("click", () => {
            document.querySelector(".leagues_list").style.marginLeft = "-100vw";
        });
    })
    document.querySelector(".list_back").addEventListener('click', () => {
        document.querySelector(".leagues_list").style.marginLeft = "0vw";
    });

}
