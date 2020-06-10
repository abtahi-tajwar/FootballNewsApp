let league = 1;
function clickHandleInternational(){
    document.querySelector(".international").classList.add("selected");
    document.querySelector(".League").className = "League";
    console.log(document.querySelector(".League").className);
    document.querySelector(".select_league-container").innerHTML = `
    <ul>
        <li tag="${1014}">FIFA Club World Cup</li>
        <li tag="${1011}">UEFA Youth League</li>
    </ul>
    `;
    addEventListenerToDropdown(document.querySelectorAll(".select_league-container ul li"));
    document.querySelector(".all_matches").innerHTML = " ";
    document.querySelector(".League").removeEventListener('click', clickHandleInternational);
    fetchFixture(524);
    league = 0;
}
function clickHandleLeague() {
        console.log("launching");
        document.querySelector(".League").classList.add("selected");
        document.querySelector(".international").className = "international";
        document.querySelector(".select_league-container").innerHTML = `
        <ul>
            <li tag="524">Barkley's Premier League</li>
            <li tag="775">La Liga</li>
            <li tag="530">Champions League</li>
            <li tag="754">Bundesliga</li>
            <li tag="525">France League 1</li>
            <li tag="891">Series A</li>
        </ul>
        `;
        addEventListenerToDropdown(document.querySelectorAll(".select_league-container ul li"));        
        document.querySelector(".all_matches").innerHTML = " ";
        document.querySelector(".international").removeEventListener("click", clickHandleLeague);
        fetchFixture(1014); 
        league = 1;
}
if(league === 1) {
    document.querySelector(".international").addEventListener("click", clickHandleInternational);           
        
}
else if(league === 0) {
    document.querySelector(".League").addEventListener("click", clickHandleLeague); 
   
}
