import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const weatherApiKey = import.meta.env.VITE_WEATHER_KEY

  // Fetch all countries when app loads
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Handle search input
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  // Filter countries
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  // Fetch weather when one country is selected
  useEffect(() => {
    const countryToShow =
      selectedCountry || (filtered.length === 1 ? filtered[0] : null)

    if (countryToShow) {
      const capital = countryToShow.capital[0]

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherApiKey}&units=metric`
        )
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [selectedCountry, filtered, weatherApiKey])

  // Decide which country to display
  const countryToShow =
    selectedCountry || (filtered.length === 1 ? filtered[0] : null)

  return (
    <div>
      <h2>Find countries</h2>
      <input value={search} onChange={handleSearch} />

      {/* If one country selected */}
      {countryToShow ? (
        <div>
          <h2>{countryToShow.name.common}</h2>

          <p>Capital: {countryToShow.capital}</p>
          <p>Area: {countryToShow.area}</p>

          <h3>Languages</h3>
          <ul>
            {Object.values(countryToShow.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={countryToShow.flags.png}
            alt="flag"
            width="150"
          />

          {/* Weather Section */}
          {weather && (
            <div>
              <h3>Weather in {countryToShow.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          )}
        </div>
      ) : filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length > 1 ? (
        filtered.map(country => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>
              show
            </button>
          </div>
        ))
      ) : (
        <p>No matches</p>
      )}
    </div>
  )
}

export default App
