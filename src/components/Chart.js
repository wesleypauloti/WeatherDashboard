// src/components/Chart.js
import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ title, value }) {
  const chartRef = useRef(null);  

  const data = {
    labels: [title],
    datasets: [
      {
        label: 'Valor',
        data: [value],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();  // Destrua o gráfico existente
      }
    }
  }, [title, value]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="h-64">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
