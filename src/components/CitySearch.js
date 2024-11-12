import React, { useState } from 'react';
import axios from 'axios';

const CitySearch = ({ onCitySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (query.length < 3) {
      setCityList([]);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=b31a6078550b413695d215547241011&q=${query}`
      );
      setCityList(response.data);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    onCitySelect(city); // Passa a cidade selecionada para o componente pai
    setSearchQuery(city.name); // Atualiza o campo de busca com o nome da cidade
    setCityList([]); // Limpa as sugestões
  };

  return (
    <div className="city-search">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Digite o nome da cidade"
        className="p-2 border rounded"
      />
      {loading && <p>Carregando...</p>}
      <ul className="city-list">
        {cityList.map((city, index) => (
          <li
            key={index}
            onClick={() => handleCitySelect(city)}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {city.name}, {city.region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;
