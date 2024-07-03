import { createChart, gamesAndIndex, goalsData, pieChartDataset } from "./utils.js";
import { pieChartData } from "./data.js";

const url = 'https://v3.football.api-sports.io/fixtures?league=140&season=2023&team=541';
const urlPie = 'https://v3.football.api-sports.io/teams/statistics?league=140&season=2023&team=541';



document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM fully loaded and parsed');

        const goalsAndIndexes = await gamesAndIndex(url, 'Real Madrid');
        console.log('Goals and Indexes:', goalsAndIndexes);

        const gameOutcome = await pieChartData(urlPie);
        console.log('Game Outcome:', gameOutcome);

        // Values for the chart data
        const scored = goalsAndIndexes[0]; 
        const conceded = goalsAndIndexes[1]; 
        const indexes = goalsAndIndexes[2]; 

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

        console.log('Creating charts...');

        createChart('goals-line-chart', goalsData('Scored', 'Conceded', indexes, scored, conceded), 'line');
        createChart('goals-bar-chart', goalsData('Scored', 'Conceded', indexes, scored, conceded), 'bar');

        createChart('goals-line-chart-away', goalsData('Scored', 'Conceded', indexes, scored, conceded), 'line');
        createChart('goals-bar-chart-away', goalsData('Scored', 'Conceded', indexes, scored, conceded), 'bar');

        createChart('goals-pie-chart', pieChartDatasetTotal, 'pie');
        createChart('goals-pie-chart-2', pieChartDatasetHome, 'pie');
        createChart('goals-pie-chart-3', pieChartDatasetAway, 'pie');

        createChart('goals-pie-chart-away', pieChartDatasetTotal, 'pie');
        createChart('goals-pie-chart-away-2', pieChartDatasetHome, 'pie');
        createChart('goals-pie-chart-away-3', pieChartDatasetAway, 'pie');

        console.log('Charts created');
    } catch (error) {
        console.error('Error creating charts:', error);
    }
});
