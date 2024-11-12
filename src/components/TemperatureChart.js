// src/TemperatureChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Registro do tipo de gráfico
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const TemperatureChart = ({ forecastData }) => {
  // Preparando os dados para o gráfico
  const labels = forecastData.map(day => day.date);
  const maxTemps = forecastData.map(day => day.day.maxtemp_c);
  const minTemps = forecastData.map(day => day.day.mintemp_c);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperatura Máxima (°C)',
        data: maxTemps,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Temperatura Mínima (°C)',
        data: minTemps,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Temperaturas Máximas e Mínimas</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TemperatureChart;
