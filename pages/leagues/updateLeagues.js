// console.log(window.localStorage.getItem("epl"));
//fetchTeams("524");

let leaguesDetails  = [
    {
        "name": "worldcup",
        "id": "1014"
    },
    {
        "name": "epl",
        "id": "524"
    },
    {
        "name": "ucl",
        "id": "530"
    },
    {
        "name": "laliga",
        "id": "775"
    },
    {
        "name": "league1",
        "id": "525"
    },
    {
        "name": "seriesA",
        "id": "891"
    },
    {
        "name": "bundesliga",
        "id": "754"
    }
    
];
function initStorage()
{
    leaguesDetails.forEach(savetoStorage);
}
async function savetoStorage(league)
{    
    let data = await fetchTeams(league.id);
    if(data !== null) {
        localStorage.setItem(league.name, JSON.stringify(data));
        //console.log(JSON.parse(localStorage.getItem(league.name)));
    }
    else {
        e.preventDefault();
    }
}

async function fetchTeams(id)
{
    try {
        let response = await fetch("https://api-football-v1.p.rapidapi.com/v2/teams/league/"+id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "f7c349acecmsh9b10dfe4084b189p1b054cjsn114ad81fc120"
            }
        });
        let data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
        return null;
    }  
}
//Handling league click
//Filling out teams list in UI
showTeamsFromLocalStorage('epl');
document.querySelectorAll(".leagues_list .list_body:nth-child(1) ul li").forEach(league => {
    league.addEventListener('click', (e) => {
        showTeamsFromLocalStorage(e.target.attributes["tag"].value);
    })
});
function showTeamsFromLocalStorage(key)
{
    let datas = JSON.parse(localStorage.getItem(key)).api.teams;    
    let list = document.querySelector(".leagues_list .list_body:nth-child(2) ul");
    list.innerHTML = "";
    datas.forEach(data => {
        list.innerHTML += `
        <li>
            <img src="${data.logo}" alt="Team Logo">
            <p>${data.name}</p>
        </li>
        `
    })
}