// src/RainChanceChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RainChanceChart = ({ dailyData }) => {
    // Função para obter os próximos seis dias da semana, começando de amanhã
    const getNextWeekdays = () => {
        const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
        const today = new Date().getDay();
        let nextDays = [];

        for (let i = 1; i <= 6; i++) {
            nextDays.push(daysOfWeek[(today + i) % 7]);
        }

        return nextDays;
    };

    const labels = getNextWeekdays(); // Labels para os próximos seis dias da semana
    const rainChanceData = dailyData.slice(1, 7).map(day => day.day.daily_chance_of_rain); // Chance de chuva para os próximos seis dias

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Chance de Chuva (%)',
                data: rainChanceData,
                borderColor: 'rgba(75, 192, 192, 1)', // Cor para a linha da chance de chuva
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.4, // Curvatura da linha
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chance de Chuva para os Próximos 6 Dias',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Chance de Chuva (%)',
                },
            },
        },
    };

    return (
        <div style={{ width: '80%', height: '300px', margin: '0 auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default RainChanceChart;
