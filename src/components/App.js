import React, { useState, useEffect } from 'react';
import StockList from './StockList';
import MyPortfolio from './MyPortfolio';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [myPortfolio, setMyPortfolio] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  const handleBuy = (stock) => {
    setMyPortfolio(prevPortfolio => [...prevPortfolio, stock]);
  };

  const handleSell = (stock) => {
    setMyPortfolio(prevPortfolio => prevPortfolio.filter(item => item.id !== stock.id));
  };

  const handleSort = (criteria) => {
    let sortedStocks = [...stocks];
    if (criteria === 'ticker') {
      sortedStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
    } else if (criteria === 'price') {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    setStocks(sortedStocks);
  };

  const handleFilter = (type) => {
    let filteredStocks = [...stocks];
    if (type !== 'All') {
      filteredStocks = filteredStocks.filter(stock => stock.type === type);
    }
    setStocks(filteredStocks);
  };

  return (
    <div>
      <h1>Flatiron Stock Exchange</h1>
      <MyPortfolio myPortfolio={myPortfolio} onSell={handleSell} />
      <div>
        <button onClick={() => handleSort('ticker')}>Sort by Ticker</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>
      <StockList stocks={stocks} onClick={handleBuy} />
    </div>
  );
};

export default App;
