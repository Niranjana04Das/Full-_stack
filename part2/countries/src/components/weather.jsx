import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [capital, api_key])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>

      <p>Temperature: {weather.main.temp} °C</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
