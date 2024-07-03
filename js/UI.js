import { fetchData, gamesData, getTeamsId, pastFixtures } from "./data.js";



export const dropDownOptions = async (url, htmlElement) => {
    const data = await fetchData(url);
    let optionsHTML = "";
    
    data.forEach(e => {
        optionsHTML += `<option class="option" value="${e.team.id}">${e.team.name}</option>\n`;
    });
    
    htmlElement.innerHTML = optionsHTML;
};

export const printHomeHeader = (teamIds, index, element) => {
    element.innerHTML = ""
    element.innerHTML = `<img src="${teamIds[index].logo}"> ${teamIds[index].name}`;
}
export const printAwayHeader = (teamIds, index, element) => {
    element.innerHTML = ""
    element.innerHTML = `${teamIds[index].name} <img src="${teamIds[index].logo}">`;
}

export const displayTenLastFixtures = async (url, element, teamName) => {
    element.innerHTML = ''; 
    const data = await pastFixtures(url, teamName); 

    for (let i = 0; i < data.length; i++) {
     if(data[i].scored != undefined || data[i].conceded != undefined || data[i].homeTeam != undefined) {
        if (data[i].scored > data[i].conceded) {
            element.innerHTML += ` <div class="past-fixture">
                <span>✅</span><br />
                <p>${data[i].opponent}</p>
                <p>${data[i].scored} - ${data[i].conceded}</p>
            </div>`; 
        } else if (data[i].scored < data[i].conceded) {
            element.innerHTML += ` <div class="past-fixture">
                <span>❌</span><br />
                <p>${data[i].opponent}</p>
                <p>${data[i].scored} - ${data[i].conceded}</p>
            </div>`; 
        } else if (data[i].scored == data[i].conceded) {
            element.innerHTML += ` <div class="past-fixture">
                <span>🤝</span><br />
                <p>${data[i].opponent}</p>
                <p>${data[i].scored} - ${data[i].conceded}</p>
            </div>`; 
        }
    }
 }
};

