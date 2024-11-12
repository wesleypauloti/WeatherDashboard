// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HourlyChart from './HourlyChart';
import DailyChart from './DailyChart';
import RainChanceChart from './components/RainChanceChart';
import CitySearch from './components/CitySearch';

const Dashboard = () => {
  const key = 'b31a6078550b413695d215547241011';
  const [forecastData, setForecastData] = useState(null);
  const [selectedCity, setSelectedCity] = useState('São Paulo');
  const [nextDayData, setNextDayData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const encodedCity = encodeURIComponent(selectedCity);
        // Requisição para obter a previsão de 7 dias, incluindo as 24 horas do primeiro dia
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectedCity}&days=7&hours=24`
        );
        setForecastData(response.data.forecast.forecastday);
        setCurrentWeather(response.data.current);

        // Requisição para obter a previsão do próximo dia (apenas um dia)
        const nextDayResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodedCity}&days=1`
        );
        setNextDayData(nextDayResponse.data.forecast.forecastday[0].hour);
      } catch (error) {
        console.error('Erro ao buscar previsão do tempo:', error);
      }
    };

    fetchForecastData();
  }, [selectedCity]);

  if (!forecastData || !nextDayData) {
    return <p>Carregando dados...</p>;
  }

  const hourlyData = forecastData[0].hour;
  const dailyData = forecastData;

  const formatHour = (time) => {
    return time.slice(11, 16); // Exibe hora no formato HH:mm
  };

  const adjustRainChanceForDays = (dailyData) => {
    let adjustedData = [...dailyData];
    let lastNonZeroRain = null;

    for (let i = 0; i < adjustedData.length; i++) {
      if (adjustedData[i].day.daily_chance_of_rain === 0 && lastNonZeroRain !== null) {
        adjustedData[i].day.daily_chance_of_rain = lastNonZeroRain;
      } else if (adjustedData[i].day.daily_chance_of_rain !== 0) {
        lastNonZeroRain = adjustedData[i].day.daily_chance_of_rain;
      }
    }

    return adjustedData;
  };

  const adjustedDailyData = adjustRainChanceForDays(dailyData);

  const getNextWeekdays = () => {
    const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
    const today = new Date().getDay();
    let nextDays = [];

    for (let i = 1; i <= 6; i++) {
      nextDays.push(daysOfWeek[(today + i) % 7]);
    }

    return nextDays;
  };

  const nextWeekdays = getNextWeekdays();

  return (
    <div className="min-h-screen bg-gray-100 p-5" style={{ backgroundColor: 'white' }}>
      <h1 className="text-3xl font-bold mb-8" style={{ textAlign: 'center' }}>Dashboard de Previsão do Tempo</h1>

      {/* Componente de busca e seleção de cidade */}
      <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>{selectedCity}</h2>

      {/* Exibição da temperatura atual, max e min */}
      <div style={{
        textAlign: 'center', marginTop: '0.1%', display: 'flex', width: 'auto', margin: 'auto',
        flexDirection: 'column', borderRadius: '50%', backgroundColor: 'rgba(128, 128, 128, 0.2)'
        , padding: '1%',
        height: '10vw',
        maxWidth: '12%',
        maxHeight: '10%',
        minWidth: 140,
        minHeight: 140,
      }}>
        <img
          src={currentWeather.condition.icon} // Ícone do tempo
          alt="Weather Icon"
          style={{ width: '80px', height: '80px', verticalAlign: 'middle', margin: 'auto', marginTop: '-10%' }}
        />
        <div style={{
          alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', margin: 'auto',
          marginTop: '-20%', marginBottom: '5%'
        }}>
          <span className="text-2xl font-bold">{currentWeather.temp_c.toFixed()}°C</span>
          <div
            className="mt-2"
            style={{
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 10
            }}
          >
            <span className="text-lg">{dailyData[0].day.maxtemp_c.toFixed()}°C</span>
            <span className="text-lg">{dailyData[0].day.mintemp_c.toFixed()}°C</span>
          </div>
        </div>
      </div>

      <CitySearch onCitySelect={(city) => setSelectedCity(city.name)} />

      <h2 className="text-3xl font-bold mb-8" style={{ textAlign: 'center' }}>Informações do Dia</h2>

      {/* Tabela com as horas, temp e chance de chuva na horizontal */}
      <div style={{
        overflowX: 'auto', width: '100%', scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <table className="min-w-full border-collapse mb-8">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {hourlyData.map((hour, index) => (
                <th key={index} className="border p-2">{formatHour(hour.time)}</th>
              ))}
            </tr>
            {/* Linha dos ícones */}
            <tr>
              <td className="border p-2">Ícone</td>
              {hourlyData.map((hour, index) => (
                <td key={index} className="border p-2">
                  <img
                    src={hour.condition.icon} // URL do ícone
                    alt="weather icon"
                    style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '8px' }}
                  />
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Temp.(°C)</td>
              {hourlyData.map((hour, index) => (
                <td key={index} className="border p-2">{hour.temp_c}º</td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">Chance de Chuva (%)</td>
              {hourlyData.map((hour, index) => (
                <td key={index} className="border p-2">{hour.chance_of_rain}%</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{
        borderTop: '2px solid black',
        paddingTop: '10px',
      }}></div>
      <HourlyChart hourlyData={hourlyData} />

      <h2 className="text-3xl font-bold mb-8" style={{
        textAlign: 'center',
        marginTop: '3%',
        borderBottom: '2px solid black',
        paddingBottom: '10px',
      }}>Informações da Semana</h2>
      {/* Tabela para os próximos 7 dias */}
      <table className="min-w-full border-collapse mb-8">
        <thead>
          <tr>
            <th className="p-2"></th>
            {nextWeekdays.map((dayName, index) => (
              <th key={index} className="p-2" style={{ textAlign: 'start' }}>{dayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2" style={{ width: '10%', minWidth: 15, textAlign: 'end' }}>Temp. Máxima (°C)</td>
            {adjustedDailyData.slice(1, 7).map((day, index) => (
              <td key={index} className="p-2" style={{ textAlign: 'start' }}>
                <img
                  src={day.day.condition.icon}
                  alt="weather icon"
                  style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '8px' }}
                />
                {day.day.maxtemp_c.toFixed()}º
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2" style={{ width: '10%', minWidth: 15, textAlign: 'end' }}>Temp. Mínima (°C)</td>
            {adjustedDailyData.slice(1, 7).map((day, index) => (
              <td key={index} className="p-2" style={{ textAlign: 'start' }}>
                {day.day.mintemp_c.toFixed()}º
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2" style={{ width: '10%', minWidth: 15, textAlign: 'end' }}>Chance de Chuva (%)</td>
            {adjustedDailyData.slice(1, 7).map((day, index) => (
              <td key={index} className="p-2" style={{ textAlign: 'start' }}>
                {day.day.daily_chance_of_rain}%
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {/* Exibindo os gráficos lado a lado ou em coluna */}
      <div className="flex flex-col lg:flex-row justify-between gap-8"
        style={{
          borderTop: '2px solid black',
          paddingTop: '10px',
        }}>
        <div className="flex-1">
          <DailyChart dailyData={adjustedDailyData} />
        </div>
        <div className="flex-1">
          <RainChanceChart dailyData={adjustedDailyData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
