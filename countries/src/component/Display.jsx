import { useEffect, useState } from "react"
import axios from "axios"

const CountryList = ({country, setDisplay}) => {
    const handleShow = () => {
        setDisplay([country])
    }
    return (
        <>
        <p>{country.name.common} <button onClick={handleShow}>show</button></p>
        </>
    )
}

const Country = ({country}) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`).then(response => {
        setWeatherData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [weatherData])
    
    if (!weatherData) return

    return (
        <>
        <h1>{country.name.common}</h1>
        <br/>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <br/>
        <b>languages:</b>
        <ul>
            {Object.values(country.languages).map(c => 
                <li key={c}>{c}</li>
            )}
        </ul>
        <br/>
        <img src={country.flags.png}/>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {Math.round((weatherData.main.temp-273)*100)/100} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
        <p>wind {weatherData.wind.speed} m/s</p>
        </>
    )
}

const Display = ({display, setDisplay}) => {
    const toDisplay = display
    if (toDisplay.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    } else if (toDisplay.length > 1) {
        return (
        <>
        {toDisplay.map(country =>
            <CountryList key={country.name.common} country = {country} setDisplay={setDisplay}/>
        )}
        </>
    )
    } else if (toDisplay.length == 1) {
        return (
            <>
            <Country country={toDisplay[0]}/>
            </>
        )
    }
    return <></>
}

export default Display