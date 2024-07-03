import { gamesData } from "./data.js";

export const purplePalette = {
    backgroundColor: [
        'rgba(127, 0, 255, 0.8)', // Purple
        'rgba(255, 102, 255, 0.8)', // Medium Orchid
        'rgba(200, 100, 255, 0.8)' // Violet
    ],
    borderColor: [
        'rgba(127, 0, 255, 1)',
        'rgba(255, 102, 255, 1)',
        'rgba(200, 100, 255, 1)'
    ]
};

export const blueGreenPalette = {
    backgroundColor: [
        'rgba(102, 255, 102, 0.8)', // Teal
        'rgba(0, 191, 255, 0.8)', // Deep Sky Blue
        'rgba(0, 128, 255, 0.8)' // Medium Sea Green
    ],
    borderColor: [
        'rgba(102, 255, 102, 0.8)', // Teal
        'rgba(0, 191, 255, 0.8)', // Deep Sky Blue
        'rgba(0, 128, 255, 0.8)' // Medium Sea Green
    ]
};
export const pinkGreenPalette = {
    backgroundColor: [
        'rgba(255, 182, 193, 0.8)', // Light Pink
        'rgba(255, 105, 180, 0.8)', // Hot Pink
        'rgba(144, 238, 144, 0.8)'  // Light Green
    ],
    borderColor: [
        'rgba(255, 182, 193, 1)',
        'rgba(255, 105, 180, 1)',
        'rgba(144, 238, 144, 1)'
    ]
};




export function createChart(chartId, chartData, chartType, chartOptions = {}) {
    const ctx = document.getElementById(chartId).getContext('2d');
  
    const config = {
        type: chartType,
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            },
            ...chartOptions // Merge additional options passed into the function
        }
    };
  
    // Create the pie chart
    new Chart(ctx, config);
  }
  

export const gamesAndIndex = async (url, teamName) => {
    const data = await gamesData(url, teamName);
    const scored = [];
    const conceded = [];
    const indexes = [];
    
    for (let i = 0; i < data.scored.length; i++) {
        scored.push(data.scored[i].goalsScored);
        conceded.push(data.conceded[i].goalsConceded);
        indexes.push(i);
    }
    
    const goalsAndIndexes = [scored, conceded, indexes];
    return goalsAndIndexes
}

export const goalsData = (header, secondHeader, lables, data, secondData) => {
    const goalsData = {
        labels: lables,
        datasets: [
            {
                label: header,
                data: data,
                backgroundColor: [
                    'rgba(153, 255, 153, 0.5)', // Light green background color
                    'rgba(153, 255, 153, 0.5)',
                    'rgba(153, 255, 153, 0.5)',
                    'rgba(153, 255, 153, 0.5)',
                    'rgba(153, 255, 153, 0.5)'
                ],
                borderColor: [
                    'rgba(153, 255, 153, 1)', // Light green border color
                    'rgba(153, 255, 153, 1)',
                    'rgba(153, 255, 153, 1)',
                    'rgba(153, 255, 153, 1)',
                    'rgba(153, 255, 153, 1)'
                ],
                borderWidth: 1,
                tension: 0.4,
                pointRadius: 2
            },
            {
                label: secondHeader, // Add appropriate label for the second dataset
                data: secondData, // Add appropriate data for the second dataset
                backgroundColor: [
                    'rgba(204, 0, 204, 0.5)', // Red background color
                    'rgba(204, 0, 204, 0.5)',
                    'rgba(204, 0, 204, 0.5)',
                    'rgba(204, 0, 204, 0.5)',
                    'rgba(204, 0, 204, 0.5)'
                ],
                borderColor: [
                    'rgba(204, 0, 204, 0.5)', // Red border color
                    'rgba(204, 0, 204, 0.5)',
                    'rgba(204, 0, 204, 0.5)',
                    'rgba(204, 0, 204, 0.5)',
                    'rgba(204, 0, 204, 0.5)'
                ],
                borderWidth: 0.8,
                tension: 0.4,
                pointRadius: 2
            }
        ]
    }
    
return goalsData
};

export const pieChartDataset = (wins, losses, draws, color) => {
    const pieChartDataset = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [{
            label: 'Total',
            data: [wins, losses, draws],
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
            borderWidth: 1
        }]
    };

    return pieChartDataset
}

