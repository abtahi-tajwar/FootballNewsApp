let teamOne = "/";
let teamTwo = "/";
let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
            addVersusPanelOpenListener();
        })
    })
}
document.querySelector(".versus-home-team").addEventListener('click', removeVersusTeamOne);
document.querySelector(".versus-away-team").addEventListener('click', removeVersusTeamTwo);
function removeVersusTeamOne()
{
  teamOne = "/";
  document.querySelector(".versus-home-team").innerHTML = "Select Team";
}
function removeVersusTeamTwo()
{
  teamTwo = "/";
  document.querySelector(".versus-away-team").innerHTML = "Select Team";
}
//Expanding versus panel
function addVersusPanelOpenListener() {
  if(teamOne !== "/" && teamTwo !== "/") {
    document.querySelector(".expand").addEventListener('click', ()=> {
        if(teamOne !== "/" && teamTwo !== "/") {
          document.querySelector(".history_container").style.top = "63px";
          updateVersusPanel();
        }
    });
    document.querySelector(".collapse_history").addEventListener('click', ()=> {
        document.querySelector(".history_container").style.top = "100vh";
    });
  }
}

addVersusEventListener();

async function fetchH2hData(teamOne, teamTwo)
{
  try{
    let response = await fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/${teamOne}/${teamTwo}?timezone=${timezone}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "f7c349acecmsh9b10dfe4084b189p1b054cjsn114ad81fc120"
        }
    });
    data = await response.json();
    return data;
  }
  catch {
    console.log(err);
    return null;
  }
}
async function updateVersusPanel()
{
  let data = await fetchH2hData(teamOne, teamTwo);
  let history = document.querySelector('.content');
  history.innerHTML = ``;
  history.innerHTML += `
    <div class="team-info-panel">
        <div class="home-info">
            <img src="${data.api.teams[0].team_logo}" alt="Home Team logo">
            <p>${data.api.teams[0].team_name}</p>
        </div>
        <div class="home-stat">
            <p>Home Win: <span class="home-win">${data.api.teams[0].statistics.wins.home}/${data.api.teams[0].statistics.wins.home + data.api.teams[0].statistics.loses.home}</span><span class="star_score"><img src="../../exported/star.png" alt=""></span></p>
            <p>Away Win: <span class="away-win">${data.api.teams[0].statistics.wins.away}/${data.api.teams[0].statistics.wins.away + data.api.teams[0].statistics.loses.away}</span> <span class="star_score"><img src="../../exported/star.png" alt=""></span></p>
            <p>Win: <span class="win">${data.api.teams[0].statistics.wins.home + data.api.teams[0].statistics.wins.away}/${data.api.teams[0].statistics.loses.home + data.api.teams[0].statistics.loses.away}</span> <span class="star_score"><img src="../../exported/star.png" alt=""></span></p>
        </div>
        <div class="match_played">
            <div>
                <p>${data.api.teams[0].statistics.played.total}</p>
                <p>Matches<br>Played</p>
            </div>
        </div>
        <div class="away-stat">
            <p><span class="star_score"><img src="../../exported/star.png" alt=""></span>Home Win: <span class="home-win">${data.api.teams[1].statistics.wins.home}/${data.api.teams[1].statistics.wins.home + data.api.teams[1].statistics.loses.home}</span></p>
            <p><span class="star_score"><img src="../../exported/star.png" alt=""></span>Away Win: <span class="away-win">${data.api.teams[1].statistics.wins.away}/${data.api.teams[1].statistics.wins.away + data.api.teams[1].statistics.loses.away}</span> </p>
            <p><span class="star_score"><img src="../../exported/star.png" alt=""></span>Win: <span class="win">${data.api.teams[1].statistics.wins.home + data.api.teams[1].statistics.wins.away}/${data.api.teams[1].statistics.loses.home + data.api.teams[1].statistics.loses.away}</span> </p>
        </div>
        <div class="away-info">
            <img src="${data.api.teams[1].team_logo}" alt="Home Team logo">
            <p>${data.api.teams[1].team_name}</p>
        </div>
    </div>
    <div class="prediction_winchance-bar">
        <div class="home-winchance"><p>${Math.round(data.api.teams[0].statistics.wins.total / (data.api.teams[0].statistics.played.total + data.api.teams[1].statistics.played.total) * 100)}%</p></div>
        <div class="draw-chance"><p>${Math.round((data.api.teams[0].statistics.draws.total + data.api.teams[1].statistics.draws.total) / (data.api.teams[0].statistics.played.total + data.api.teams[1].statistics.played.total) * 100)}%</p></div>
        <div class="away-winchance"><p>${Math.round(data.api.teams[1].statistics.wins.total / (data.api.teams[0].statistics.played.total + data.api.teams[1].statistics.played.total) * 100)}%</p></div>
    </div>
  `

}
