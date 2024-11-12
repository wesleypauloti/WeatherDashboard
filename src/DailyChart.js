// src/DailyChart.js
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

const DailyChart = ({ dailyData }) => {
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
    const maxTemps = dailyData.slice(1, 7).map(day => day.day.maxtemp_c); // Temperaturas máximas para os próximos seis dias
    const minTemps = dailyData.slice(1, 7).map(day => day.day.mintemp_c); // Temperaturas mínimas para os próximos seis dias

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperatura Máxima',
                data: maxTemps,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Temperatura Mínima',
                data: minTemps,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Temperaturas para os Próximos 6 Dias',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 40,
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
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

export default DailyChart;
