import { useState } from "react";
import "./App.css";
import Weatherresult from "./components/Weatherresult";
import ReactLoading from 'react-loading';


function App() {
const API_KEY = process.env.REACT_APP_API_KEY;
  

  const [wheatherData, setWheatherData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const citytext = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  async function getdata(value) {
    setLoading(true);
    try {
      const data = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=3&aqi=no&alerts=no`
      );
      const result = await data.json();
      setWheatherData(result.forecast.forecastday);
      setError(false);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setCityName(inputValue);
    getdata(inputValue);
    setInputValue("");
  };
  return (
    <div>
     <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a City"
          value={inputValue}
          onChange={citytext}
        />
        <button type="submit">Search</button>
      </form>
      {!loading && error ? (
        <div className="wrong">you misspelled or something went wrong...</div>
      ) : !loading ? (
        <div>
          <h2>{cityName} next three three days </h2>

          {wheatherData.map((item, index) => (
            <Weatherresult
              key={index}
              date={item.date}
              icon={item.day.condition.icon}
              condition={item.day.condition.text}
              temp={item.day.avgtemp_c}
              humidity={item.day.avghumidity}
            />
          ))}
        </div>
      ) : (
        <ReactLoading className="loading" type="spinningBubbles" color="rgb(255, 217, 0)" height={97} width={97} />
       

      )}
    </div>
  );
}

export default App;
  