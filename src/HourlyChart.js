// src/HourlyChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HourlyChart = ({ hourlyData }) => {
    // Organiza os dados para o gráfico de Temperatura
    const tempData = {
        labels: hourlyData.map(hour => {
            const hourTime = new Date(hour.time);
            return hourTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        }), // Horários formatados
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: hourlyData.map(hour => hour.temp_c), // Temperaturas
                borderColor: 'rgba(255, 159, 64, 1)', // Cor alaranjada para temperatura
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
            },
        ],
    };

    // Organiza os dados para o gráfico de Chance de Chuva
    const rainData = {
        labels: hourlyData.map(hour => {
            const hourTime = new Date(hour.time);
            return hourTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        }), // Horários formatados
        datasets: [
            {
                label: 'Chance de Chuva (%)',
                data: hourlyData.map(hour => hour.chance_of_rain), // Dados de chance de chuva ajustados
                borderColor: 'rgba(54, 162, 235, 1)', // Cor azulada para chance de chuva
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                yAxisID: 'y1', // Definindo um eixo Y separado para a chance de chuva
            },
        ],
    };

    // Configurações para o gráfico de Temperatura
    const tempOptions = {
        responsive: true,
        scales: {
            y: {
                min: 0,   // Valor mínimo do eixo Y
                max: 40,  // Valor máximo do eixo Y
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Previsão de Temperatura nas Próximas 24 Horas',
            },
        },
    };

    // Configurações para o gráfico de Chance de Chuva
    const rainOptions = {
        responsive: true,
        scales: {
            y1: {
                min: 0,   // Valor mínimo do eixo Y
                max: 100,
                type: 'linear',
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Chance de Chuva (%)',
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Previsão de Chance de Chuva nas Próximas 24 Horas',
            },
        },
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Gráfico de Temperatura */}
            <div className="lg:w-1/2 w-full h-[400px]">
                <Line data={tempData} options={tempOptions} />
            </div>

            {/* Gráfico de Chance de Chuva */}
            <div className="lg:w-1/2 w-full h-[400px]">
                <Line data={rainData} options={rainOptions} />
            </div>
        </div>
    );
};

export default HourlyChart;
