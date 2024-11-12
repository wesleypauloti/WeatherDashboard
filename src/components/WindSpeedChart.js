// src/components/WindSpeedChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  RadarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, RadialLinearScale,
    RadarController, Title, Tooltip, Legend);

const WindSpeedChart = ({ forecastData }) => {
  if (!forecastData) return <p>Carregando gráfico de vento...</p>;

  const labels = forecastData.map(day => day.date);
  const windSpeeds = forecastData.map(day => day.day.maxwind_kph);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Velocidade do Vento (km/h)',
        data: windSpeeds,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBackgroundColor: '#36A2EB'
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h3 className="font-semibold mb-2">Velocidade do Vento (Próximos Dias)</h3>
      <Radar data={data} />
    </div>
  );
};

export default WindSpeedChart;
