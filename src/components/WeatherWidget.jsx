import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faDroplet, faCloud, faTemperatureThreeQuarters, faRotateRight, faMinus} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const WeatherWidget = ({weatherInfo}) => {

  const [unit, setUnit] = useState({
    name: 'celsius',
    symbol: '°C',
    wind: 'm/s',
    letterC: <strong>°C</strong>,
    letterF: '°F'
  })

  const changeUnit = () => {
    (unit.name == 'celsius') ? 
    setUnit({
      name: 'fahrenheit',
      symbol: '°F',
      wind: 'mph',
      letterC: '°C',
      letterF: <strong>°F</strong>,
    })
    : setUnit({
      name: 'celsius',
      symbol: '°C',
      wind: 'm/s',
      letterC: <strong>°C</strong>,
      letterF: '°F'
    })
  }

  const [tempLevel, setTempLevel] = useState('unknown')

  useEffect(() => {
    if(weatherInfo.temp.celsius == '--') {null}
    else if(weatherInfo.temp.celsius < 27) {setTempLevel('cold')} else {setTempLevel('hot')}
  }, [weatherInfo.temp.celsius])
  

  function reload() {
    location.reload()
  }

  return (
    <div className="widget filter">
      <div className='widget__effect'></div>
      <button className='widget__buttonReload button' onClick={reload}><FontAwesomeIcon icon={faRotateRight} /></button>
      <button className='widget__buttonTemp button' onClick={changeUnit}><div>{unit.letterC}</div><div className='widget__buttonTemp__separator'><FontAwesomeIcon icon={faMinus} /></div><div>{unit.letterF}</div></button>
      <div className="widget__simplyInfo">
        <p className='widget__simplyInfo__description'>{weatherInfo.description}</p>
        <div className="widget__simplyInfo__icon__container"><img className='widget__simplyInfo__icon' src={(weatherInfo.iconCode !== 'unknown') ? `http://openweathermap.org/img/wn/${weatherInfo.iconCode}@4x.png` : ''} alt="" id="wicon" /></div>
      </div>
      <div className={`widget__temp ${tempLevel}`}>
        <div className="widget_temperature">
          <FontAwesomeIcon icon={faTemperatureThreeQuarters} /><h2 className='widget__temp__temp'>{weatherInfo.temp[unit.name]}{unit.symbol}</h2>
        </div>
      </div>
      <p>{weatherInfo.ubication}</p>
      <div className="widget__extraData">
        <div className="widget__extraData__element">
          <FontAwesomeIcon className='widget__extraData__icon' icon={faWind} />
          <p className='widget__extraData__element__text'>{weatherInfo.windSpeed[unit.name]}</p>
        </div>
        <div className="widget__extraData__element">
          <FontAwesomeIcon className='widget__extraData__icon' icon={faDroplet} />
          <p className='widget__extraData__element__text'>{weatherInfo.humidity}</p>
        </div>
        <div className='widget__extraData__element'>
        <FontAwesomeIcon className='widget__extraData__icon' icon={faCloud} />
          <p className='widget__extraData__element__text'>{weatherInfo.clouds}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget