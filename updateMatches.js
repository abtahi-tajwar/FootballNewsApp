let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let tempDate = "";
let warning = document.querySelector(".warning");
let leagueDropDownItem = document.querySelectorAll(".select_league-container ul li");
let predictionPanel = document.querySelector(".prediction_container");
let matchCard = new Array();

function fetchFixture(leagueID) {
    fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/league/"+leagueID+"/next/25?timezone="+timezone, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		"x-rapidapi-key": "f7c349acecmsh9b10dfe4084b189p1b054cjsn114ad81fc120"
	}
    })
    .then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data);
        clearContainer();
        if(data.api.results === 0) {
            warning.style.display = "block";
        }
        else {
            warning.style.display = "none";
            updateNextMatch(data.api.fixtures[0].homeTeam.team_name, data.api.fixtures[0].awayTeam.team_name,data.api.fixtures[0].homeTeam.logo, data.api.fixtures[0].awayTeam.logo, data.api.fixtures[0].event_date);
            updateFixtures(data.api.fixtures);
        }
        return data;     

    }).then(data => {
        matchCard = document.querySelectorAll(".match_card");
        //..
        console.log(matchCard);
        matchCard.forEach((card, i) => {
            card.addEventListener("click", () => {
                predictionContainerOpen(data.api.fixtures[i].fixture_id, data.api.fixtures[0].homeTeam.logo, data.api.fixtures[0].awayTeam.logo);
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
}
//fetchFixture(524);

function predictionContainerOpen(id, homeLogo, awayLogo)
{
    predictionPanel.style.height = "500px";
    let predictionContent = document.querySelector(".prediction_container");
    fetch("https://api-football-v1.p.rapidapi.com/v2/predictions/"+id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "f7c349acecmsh9b10dfe4084b189p1b054cjsn114ad81fc120"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        // data.api.predictions[0].teams.home.
        document.querySelector(".prediction_home_team img").src = homeLogo;
        document.querySelector(".prediction_away_team img").src = awayLogo;
        document.querySelector(".prediction_home_team_name").innerHTML = data.api.predictions[0].teams.home.team_name;
        document.querySelector(".prediction_away_team_name").innerHTML = data.api.predictions[0].teams.away.team_name;
        document.querySelector(".prediction_score").innerHTML = Math.round(data.api.predictions[0].goals_home)*-1 + ":" + Math.round(data.api.predictions[0].goals_away)*-1;
        
        //Setting winning chance bar and text
        document.querySelector(".home-winchance p").innerHTML = data.api.predictions[0].winning_percent.home;
        document.querySelector(".home-winchance").style.width = data.api.predictions[0].winning_percent.home;
        document.querySelector(".away-winchance p").innerHTML = data.api.predictions[0].winning_percent.away;
        document.querySelector(".away-winchance").style.width = data.api.predictions[0].winning_percent.away;
        document.querySelector(".draw-chance p").innerHTML = data.api.predictions[0].winning_percent.draws;
        document.querySelector(".draw-chance").style.width = data.api.predictions[0].winning_percent.draws;

        //Setting stat
            //Home
        document.querySelector(".prediction-home-possession .stat-percentage").innerHTML = data.api.predictions[0].comparison.forme.home;
        document.querySelector(".prediction-home-possession .stat_bar").style.width = data.api.predictions[0].comparison.forme.home;
        //
        document.querySelector(".prediction-home-att .stat-percentage").innerHTML = data.api.predictions[0].comparison.att.home;
        document.querySelector(".prediction-home-att .stat_bar").style.width = data.api.predictions[0].comparison.att.home;
        //
        document.querySelector(".prediction-home-def .stat-percentage").innerHTML = data.api.predictions[0].comparison.def.home;
        document.querySelector(".prediction-home-def .stat_bar").style.width = data.api.predictions[0].comparison.def.home;
            //Away
        document.querySelector(".prediction-away-possession .stat-percentage").innerHTML = data.api.predictions[0].comparison.forme.away;
        document.querySelector(".prediction-away-possession .stat_bar").style.width = data.api.predictions[0].comparison.forme.away;
        //
        document.querySelector(".prediction-away-att .stat-percentage").innerHTML = data.api.predictions[0].comparison.att.away;
        document.querySelector(".prediction-away-att .stat_bar").style.width = data.api.predictions[0].comparison.att.away;
        //
        document.querySelector(".prediction-away-def .stat-percentage").innerHTML = data.api.predictions[0].comparison.def.away;
        document.querySelector(".prediction-away-def .stat_bar").style.width = data.api.predictions[0].comparison.def.away;
    })
    .then(() => {
        predictionContent.style.display = "block";
    })
    .catch(err => {
        console.log(err);
    });

}

function updateNextMatch(home, away, homeLogo, awayLogo, dateTime)
{
    let next_match_teams = document.querySelector(".next_match .next_match-info p:nth-child(1)");
    let next_match_date = document.querySelector(".next_match .next_match-info p:nth-child(2)");
    let next_match_time = document.querySelector(".next_match .next_match-info p:nth-child(3)");
    let home_logo = document.querySelector(".team-one-logo img");
    let away_logo = document.querySelector(".team-two-logo img");

    next_match_teams.innerHTML = home + " vs " + away;
    next_match_date.innerHTML = formatDate(dateTime);
    next_match_time.innerHTML = formatTime(dateTime);
    home_logo.src = homeLogo;
    away_logo.src = awayLogo;
}
function clearContainer() {
    document.querySelector(".all_matches").innerHTML = "";
}
function updateFixtures(fixtures)
{
    let container = document.querySelector(".all_matches");
    fixtures.forEach((fixture) => {
        if(formatDate(fixture.event_date) === tempDate) {           
            let matchCard = `
            <div class="matches_container">
            <div class="match_card">
                <div class="match_card-home">
                    <img src="${fixture.homeTeam.logo}" alt="Home Team Logo">
                    <p>${fixture.homeTeam.team_name}</p>
                </div>
                <div class="match_card-time">
                    <p>${formatTime(fixture.event_date)}</p>
                </div>
                <div class="match_card-away">
                    <p>${fixture.awayTeam.team_name}</p>
                    <img src="${fixture.awayTeam.logo}" alt="Away Team Logo">                    
                </div>
            </div>
        </div>        
            `;
            container.innerHTML += matchCard;

        }
        else {
            tempDate = formatDate(fixture.event_date);
            let matchCard = `
            <div class="match_date">
                <p>${formatDate(tempDate)}</p>
            </div>
            <div class="matches_container">
            <div class="match_card">
                <div class="match_card-home">
                    <img src="${fixture.homeTeam.logo}" alt="Home Team Logo">
                    <p>${fixture.homeTeam.team_name}</p>
                </div>
                <div class="match_card-time">
                    <p>${formatTime(fixture.event_date)}</p>
                </div>
                <div class="match_card-away">
                    <p>${fixture.awayTeam.team_name}</p>
                    <img src="${fixture.awayTeam.logo}" alt="Away Team Logo">                    
                </div>
            </div>
        </div>        
            `;
            container.innerHTML += matchCard;
        }
    });
}
function formatDate(input)
{
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    let dateTime = new Date(input);
    return dateTime.getDate()+" "+month[dateTime.getMonth()]+", "+dateTime.getFullYear();
    
}
function formatTime(input)
{
    let dateTime = new Date(input);
    return dateTime.getHours()+":"+dateTime.getMinutes();
}

leagueDropDownItem.forEach((Item) => {
    console.log("Adding");
    Item.addEventListener("click", (event) => {
        console.log("Clicked");
        let leagueID = event.target.attributes["tag"].value;
        console.log(leagueID);
        fetchFixture(leagueID);
        
        //..
        if(matchCard !== null) console.log(matchCard);
    });
});
document.querySelector(".prediction_minimize").addEventListener("click", () => {
    document.querySelector(".prediction_container").style.display = "none";
    predictionPanel.style.height = "0px";
});
