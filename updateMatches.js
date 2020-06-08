let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let tempDate = "";

fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/league/524/next/25?timezone="+timezone, {
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
    console.log(data.api.fixtures[0].homeTeam.team_name);
    updateNextMatch(data.api.fixtures[0].homeTeam.team_name, data.api.fixtures[0].awayTeam.team_name,data.api.fixtures[0].homeTeam.logo, data.api.fixtures[0].awayTeam.logo, data.api.fixtures[0].event_date);
    updateFixtures(data.api.fixtures);

})
.catch(err => {
	console.log(err);
});
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