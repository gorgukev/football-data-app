import { apiKey } from './config.js';
const url = 'https://v3.football.api-sports.io/fixtures?league=140&season=2023&team=541';

/**FUNCTION TO FETCH DATA SIMPLY BASED ON URL WITH THE SPECIFIC HEADERS AND OPTIONS NECESSARY*/
export const fetchData = async (url) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", apiKey);
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();
        return data.response; 
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

/**RETURNS TEAMS ID TO BE ABLE TO FETCH DATA FOR HOME AND AWAY TEAM URL IN INDEX.JS*/
export const getTeamsId = async (url) => {
    const data = await fetchData(url);

    if (data.length === 0) {
        console.error('No data available');
        return [];
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].score.fulltime.home === null || data[i].score.fulltime.away === null) {
            return [
                { id: data[i].teams.home.id, name: data[i].teams.home.name, logo: data[i].teams.home.logo },
                { id: data[i].teams.away.id, name: data[i].teams.away.name, logo: data[i].teams.away.logo }
            ];
        }
    }

    const lastFixture = data[data.length - 1];
    return [
        { id: lastFixture.teams.home.id, name: lastFixture.teams.home.name, logo: lastFixture.teams.home.logo },
        { id: lastFixture.teams.away.id, name: lastFixture.teams.away.name, logo: lastFixture.teams.away.logo }
    ];
};

/**GAMES DATA FOR PRINTING OUT GOLAS AND SPECIFIC DATA PER GAME */
export async function gamesData(url, teamName) {
    const data = await fetchData(url);
    const homeTeam = [];
    const scoredGoals = [];
    const concededGoals = [];
    const date = [];
    
    for (let i = 0; i < data.length; i++) {
        const match = data[i];
        if (match.teams.home.name === teamName) {
            homeTeam.push({
                homeTeam: true,
            });
            scoredGoals.push({ 
                opponent: match.teams.away.name, 
                goalsScored: match.score.fulltime.home, 
            });
            concededGoals.push({ 
                opponent: match.teams.away.name, 
                goalsConceded: match.score.fulltime.away, 
            });
        } else if (match.teams.away.name === teamName) {
            homeTeam.push({
                homeTeam: false,
            });
            scoredGoals.push({ 
                opponent: match.teams.home.name, 
                goalsScored: match.score.fulltime.away, 
            });
            concededGoals.push({ 
                opponent: match.teams.home.name, 
                goalsConceded: match.score.fulltime.home, 
            });
        }
        date.push({ date: match.fixture.date });
    }
    
    scoredGoals.reverse();
    concededGoals.reverse();
    date.reverse();

    return { homeTeam: homeTeam, scored: scoredGoals, conceded: concededGoals, dates: date };
}

//

/**RETURNS THE LAST 10 FIXTURES for the displayTenFixtures function*/
export const pastFixtures = async (url, teamName) => {
   
    const data = await gamesData(url, teamName);
    const lastFixtures = [] 
    const fixturesLength = Math.min(10, data.scored.length);
    lastFixtures.push({})

    for (let i = 0; i < fixturesLength; i++) {
       lastFixtures.push({
            homeTeam: data.homeTeam[i].homeTeam,
            opponent: data.scored[i].opponent,
            scored: data.scored[i].goalsScored,
            conceded: data.conceded[i].goalsConceded
        });    }
    return lastFixtures
};

export const pieChartData = async (url) => {
    const data = await fetchData(url);

    return {
        home: {
            played: data.fixtures.played.home, 
            wins: data.fixtures.wins.home, 
            losses: data.fixtures.loses.home, 
            draws: data.fixtures.draws.home,
            goalsFor: data.goals.for.total.home, 
            goalsAgaisnt: data.goals.against.total.home, 
            goalsAvearage: data.goals.for.average.home
        }, 
        away: {
            played: data.fixtures.played.away, 
            wins: data.fixtures.wins.away, 
            losses: data.fixtures.loses.away, 
            draws: data.fixtures.draws.away,
            goalsFor: data.goals.for.total.away, 
            goalsAgaisnt: data.goals.against.total.away, 
            goalsAvearage: data.goals.for.average.away
        }, 
        total: {
             played: data.fixtures.played.total, 
             wins: data.fixtures.wins.total, 
             losses: data.fixtures.loses.total, 
             draws: data.fixtures.draws.total,
             goalsFor: data.goals.for.total.total, 
             goalsAgaisnt: data.goals.against.total.total, 
             goalsFOrAvearage: data.goals.for.average.total,
             goalsAgainstAvearage: data.goals.against.average.total,
             goalsScoredPerMinute: {
                "0-15": data.goals.for.minute["0-15"].percentage,
                "16-30": data.goals.for.minute["16-30"].percentage,
                "16-30": data.goals.for.minute["16-30"].percentage,
                "46-60": data.goals.for.minute["46-60"].percentage,
                "61-75": data.goals.for.minute["61-75"].percentage,
                "76-90": data.goals.for.minute["76-90"].percentage,
                "91-105": data.goals.for.minute["91-105"].percentage,
                "106-120": data.goals.for.minute["106-120"].percentage,
             },
             goalsConcededPerMinute: {
                "0-15": data.goals.against.minute["0-15"].percentage,
                "16-30": data.goals.against.minute["16-30"].percentage,
                "16-30": data.goals.against.minute["16-30"].percentage,
                "46-60": data.goals.against.minute["46-60"].percentage,
                "61-75": data.goals.against.minute["61-75"].percentage,
                "76-90": data.goals.against.minute["76-90"].percentage,
                "91-105": data.goals.against.minute["91-105"].percentage,
                "106-120": data.goals.against.minute["106-120"].percentage,
             }

        }
    }
}  



