import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherWidget from './components/WeatherWidget'

function App() {

  // Estado de los Datos

  const [coords, setCoords] = useState('Loading Coords')
  const [weather, setWeather] = useState('Loading Weather Info')
  const [weatherInfo, setWeatherInfo] = useState({
    description: '---',
    iconCode: 'unknown',
    temp: {
      celsius: '--',
      fahrenheit: '--'
    },
    ubication: 'Esperando permisos de Ubicación...',
    humidity: '--',
    windSpeed: {
      celsius: '--',
      fahrenheit: '--'
    },
    id: '800',
    clouds: '--'
  })

  // Obtener Coordenadas

  useEffect(() => {
    const success = pos => {
      const latAndLon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latAndLon)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  // Obtener Datos del Clima

  useEffect(() => {
    if(coords !== 'Loading Coords') {
      const APIKEY = 'c25ea1cf8b5ba0309ca6fad457ec7fe9'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}&units=Metric&lang=es`
      axios.get(URL)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
    }
  }, [coords])

  // Definir Valores del Clima

  useEffect(() => {
    if (weather !== 'Loading Weather Info') {
      setWeatherInfo({
        description: weather.weather[0].description,
        iconCode: weather.weather[0].icon,
        temp: {
          celsius: weather.main.temp,
          fahrenheit: parseFloat((weather.main.temp * 9/5) + 32).toFixed(2),
        },
        ubication: weather.name + ', ' + weather.sys.country,
        humidity: weather.main.humidity + '%',
        windSpeed: {
          celsius: (weather.wind.speed + 1) + 'm/s',
          fahrenheit: parseFloat((weather.wind.speed + 1) * 2.237).toFixed(2) + 'mph'
        },
        id: weather.weather[0].id,
        clouds: weather.clouds.all + '%'
    })
    }
  }, [weather])

  //Establecer Background

  const bkgdImgs = {
    thunderstorm: {backgroundImage: 'url(https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'},
    drizzle: {backgroundImage: 'url(https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'},
    rain: {backgroundImage: 'url(https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'},
    snow: {backgroundImage: 'url(https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1508&q=80)'},
    atmosphere: {backgroundImage: 'url(https://images.unsplash.com/photo-1513147122760-ad1d5bf68cdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80)'},
    clear: {backgroundImage: 'url(https://images.unsplash.com/photo-1522011916481-b7f27c0bf69b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80)'},
    clouds: {backgroundImage: 'url(https://images.unsplash.com/uploads/14122598319144c6eac10/5f8e7ade?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80)'}
  }

  const [background, setBackground] = useState(bkgdImgs.clear)

  useEffect(() => {
    (weatherInfo.id < 300) ? setBackground(bkgdImgs.thunderstorm) :
    (weatherInfo.id < 500) ? setBackground(bkgdImgs.drizzle) :
    (weatherInfo.id < 600) ? setBackground(bkgdImgs.rain) :
    (weatherInfo.id < 700) ? setBackground(bkgdImgs.snow) :
    (weatherInfo.id < 800) ? setBackground(bkgdImgs.atmosphere) :
    (weatherInfo.id == 800) ? setBackground(bkgdImgs.clear) :
    (weatherInfo.id < 900) ? setBackground(bkgdImgs.clouds) : console.log(err)
  }, [weatherInfo.id])
  

  // Estructura JSX 

  return (
    <div style={background} className="App">
      <h1 className='App__title'>Widget del Clima</h1>
        <WeatherWidget 
          weatherInfo={weatherInfo}
        />
    </div>
  )
}

export default App
