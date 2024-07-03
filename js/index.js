import { 
  getTeamsId,  
  pieChartData  
        } from "./data.js";

import { 
  dropDownOptions, 
  displayTenLastFixtures, 
  printHomeHeader, 
  printAwayHeader 
} from "./UI.js";

import { 
   createChart,
   gamesAndIndex, 
   goalsData, 
   pieChartDataset, 
   pinkGreenPalette, 
   blueGreenPalette, 
   purplePalette 
  } from "./utils.js";


/**FOMR DATA */
const form = document.getElementById('data-form');
const leagueMenu = document.getElementById('league-dropdown');
const teamMenu = document.getElementById('team-dropdown');
teamMenu.style.display = 'none';

/**PAST FIXTURE CONTAINER */
const homeHeader = document.getElementById('home-team-name-header');
const awayHeader = document.getElementById('away-team-name-header');

/**Teamn name and logo */
const homeFixturesContainer = document.getElementById('past-fixtures-container-home');
const awayFixturesContainer = document.getElementById('past-fixtures-container-away');


document.addEventListener('DOMContentLoaded', () => {
  leagueMenu.selectedIndex = 0
  leagueMenu.addEventListener('change', () => {
    teamMenu.style.display = leagueMenu.value != 0 ? 'block':'none';
   
    dropDownOptions(`https://v3.football.api-sports.io//teams?league=${leagueMenu.value}&season=2023`, teamMenu);
})
})

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
       const teamIds = await getTeamsId(`https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamMenu.value}`);
      
        
        printHomeHeader(teamIds, 0, homeHeader);
        printAwayHeader(teamIds, 1, awayHeader);

        displayTenLastFixtures(`https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamIds[0].id}`, homeFixturesContainer, teamIds[0].name);
        displayTenLastFixtures(`https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamIds[1].id}`, awayFixturesContainer, teamIds[1].name);
        

        try {
          console.log('DOM fully loaded and parsed');
          const urlHome = `https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamIds[0].id}`
          const urlPieHome = `https://v3.football.api-sports.io/teams/statistics?league=${leagueMenu.value}&season=2023&team=${teamIds[0].id}`;
          const urlAway = `https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamIds[1].id}`
          const urlPieAway = `https://v3.football.api-sports.io/teams/statistics?league=${leagueMenu.value}&season=2023&team=${teamIds[1].id}`;

  
          const goalsAndIndexesHome = await gamesAndIndex(urlHome, teamIds[0].name);
      

          // Values for the chart data
          const scored = goalsAndIndexesHome[0]; 
          const conceded = goalsAndIndexesHome[1]; 
          const indexes = goalsAndIndexesHome[2]; 

          const goalsAndIndexesAway = await gamesAndIndex(urlAway, teamIds[1].name);
          console.log('Goals and Indexes:', goalsAndIndexesAway);

          // Values for the chart data
          const scoredAway = goalsAndIndexesAway[0]; 
          const concededAway = goalsAndIndexesAway[1]; 
          const indexesAway = goalsAndIndexesAway[2]; 
  
          const gameOutcome = await pieChartData(urlPieHome);
          console.log('Game Outcome:', gameOutcome);

          const wins = gameOutcome.total.wins;
          const losses = gameOutcome.total.losses;
          const draws = gameOutcome.total.draws;
  
          const winsHome = gameOutcome.home.wins;
          const lossesHome = gameOutcome.home.losses;
          const drawsHome = gameOutcome.home.draws;
  
          const winsAway = gameOutcome.away.wins;
          const lossesAway = gameOutcome.away.losses;
          const drawsAway = gameOutcome.away.draws;
  
          console.log('Chart Data:', { scored, conceded, indexes, wins, losses, draws, winsHome, lossesHome, drawsHome, winsAway, lossesAway, drawsAway });
  
          const pieChartDatasetTotal = pieChartDataset(wins, losses, draws, purplePalette);
          const pieChartDatasetHome = pieChartDataset(winsHome, lossesHome, drawsHome, blueGreenPalette);
          const pieChartDatasetAway = pieChartDataset(winsAway, lossesAway, drawsAway, pinkGreenPalette);

          const gameOutcomeAway = await pieChartData(urlPieAway);
          console.log('Game Outcome Away:', gameOutcomeAway);

          const winsAwayAwayTeam = gameOutcomeAway.total.wins;
          const lossesAwayAwayTeam = gameOutcomeAway.total.losses;
          const drawsAwayAwayTeam = gameOutcomeAway.total.draws;

          const winsHomeAwayTeam = gameOutcomeAway.home.wins;
          const lossesHomeAwayTeam = gameOutcomeAway.home.losses;
          const drawsHomeAwayTeam = gameOutcomeAway.home.draws;

          const winsAwayAway = gameOutcomeAway.away.wins;
          const lossesAwayAway = gameOutcomeAway.away.losses;
          const drawsAwayAway = gameOutcomeAway.away.draws;

          const pieChartDatasetTotalAway = pieChartDataset(winsAwayAwayTeam, lossesAwayAwayTeam, drawsAwayAwayTeam, purplePalette);
          const pieChartDatasetHomeAway = pieChartDataset(winsHomeAwayTeam, lossesHomeAwayTeam, drawsHomeAwayTeam, blueGreenPalette);
          const pieChartDatasetAwayAway = pieChartDataset(winsAwayAway, lossesAwayAway, drawsAwayAway, pinkGreenPalette);

                    
  
          console.log('Creating charts...');
  
          createChart('goals-line-chart', goalsData('Scored', 'Conceded', indexes, scored, conceded), 'line');
          createChart('goals-bar-chart', goalsData('Scored', 'Conceded', indexes, scored, conceded), 'bar');
  
          createChart('goals-line-chart-away', goalsData('Scored', 'Conceded', indexesAway, scoredAway, concededAway), 'line');
          createChart('goals-bar-chart-away', goalsData('Scored', 'Conceded', indexesAway, scoredAway, concededAway), 'bar');
  
          createChart('goals-pie-chart', pieChartDatasetTotal, 'pie');
          createChart('goals-pie-chart-2', pieChartDatasetHome, 'pie');
          createChart('goals-pie-chart-3', pieChartDatasetAway, 'pie');
  
          createChart('goals-pie-chart-away', pieChartDatasetTotalAway, 'pie');
          createChart('goals-pie-chart-away-2', pieChartDatasetHomeAway, 'pie');
          createChart('goals-pie-chart-away-3', pieChartDatasetAwayAway, 'pie');
  
          console.log('Charts created');
      } catch (error) {
          console.error('Error creating charts:', error);
      }
        //createChart(homeLineChart, `https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamIds[0].id}`, teamIds[0].name, 'line');
        //createChart(awayLineChart, `https://v3.football.api-sports.io/fixtures?league=${leagueMenu.value}&season=2023&team=${teamIds[1].id}`, teamIds[1].name, 'line');
        
      });
    });
