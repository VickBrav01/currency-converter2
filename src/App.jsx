import { useEffect, useState } from 'react';
import axios from 'axios';
import './app.css';
import img from '../images/giphy.gif'
const App = () => {
  const [countries, setCountries] = useState(['USD', 'EUR', 'JPY', 'GBP', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD']);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');

  const handleFromCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setFromCurrency(selectedCurrency);
  };

  const handleToCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setToCurrency(selectedCurrency);
  };

  const handleAmountChange = (event) => {
    const enteredAmount = event.target.value;
    setAmount(enteredAmount);
  };

  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {
          q: amount,
          from: fromCurrency,
          to: toCurrency,
        },
        headers: {
          'X-RapidAPI-Key': 'ae9e2b5073msh6297fd8c2c779a2p15817bjsnb9b39c812a14',
          'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then((response) => {
          setExchangeRate(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div style={{display: "flex", flexDirection: "row", marginLeft:"17rem", marginRight:"auto"}}>
    
        <div className="form"> 
    <form className="currency-form">
      <h1>Currency Exchange App</h1>
      <div className="form-group">
        <label htmlFor="fromCurrency">From:</label>
        <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="">Select a currency</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="toCurrency">To:</label>
        <select id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="">Select a currency</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
      </div>
      {exchangeRate && (
        <p>
          {amount} {fromCurrency} = {exchangeRate * amount} {toCurrency}
        </p>
      )}
    </form>
      </div>
      <div className="image">
        <img src={ img} />
      </div>
</div>
  );
};

export default App;
