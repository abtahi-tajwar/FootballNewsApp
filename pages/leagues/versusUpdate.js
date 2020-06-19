let teamOne = "/";
let teamTwo = "/";
function addVersusEventListener() {
    let listItems = document.querySelectorAll(".leagues_list .list_body:nth-child(2) ul li");
    listItems.forEach(item => {
        item.addEventListener('click', (e)=> {
            if(teamOne === "/") {
                teamOne = e.target.attributes["id"].value;
                document.querySelector(".versus-home-team").innerHTML = e.target.attributes["tag"].value;
            }
            else if(teamTwo === "/" && teamOne !== "/") {
                teamTwo = e.target.attributes["id"].value;
                document.querySelector(".versus-away-team").innerHTML = e.target.attributes["tag"].value;
            }
        })
    })
}
addVersusEventListener();

async function fetchH2hData(teamOne, teamTwo)
{
    let data = await fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/%7Bteam_one%7D/%7Bteam_two%7D?timezone=Europe%252FLondon", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "f7c349acecmsh9b10dfe4084b189p1b054cjsn114ad81fc120"
        }
    })
}
