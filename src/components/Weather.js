import React, { useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'

export default function Weather() {

    const API_KEY = '16072140a034f8c22bf5c373399c4b76'
    const [city, setcity] = useState('');
    const [weather, setweather] = useState('');
    const [humidity, sethumidity] = useState('');
    const [mintemp, setmintemp] = useState('')
    const [maxtemp, setmaxtemp] = useState('');
    const [feels, setfeels] = useState('');
    const [pressure, setpressure] = useState('');
    const [wind, setwind] = useState('');


    function onChange(e) {
        setcity(e.target.value)
    }

    function onButtonClick() {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        fetch(url).then(data => data.json()).then(result => {
            console.log(result);
            setweather(result.weather[0].main)
            sethumidity(result.main.humidity)
            setmintemp(convertKtoF(result.main.temp_min))
            setmaxtemp(convertKtoF(result.main.temp_max))
            setfeels(convertKtoF(result.main.feels_like))
            setpressure(result.main.pressure)
            setwind(result.wind.speed)

        })
    }
    function convertKtoF(kelvin) {
        return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(3)
    }
    function getCelcius(temp) {
        return ((temp - 32) * 5 / 9).toFixed(3)
    }


    return (
        <Container>
            <h1 className='text-center text-warning'> Weather </h1>

            <Row className='d-flex justify-content-center p-2'>
                <Col lg={6}>
                    <input type='text' placeholder='city name' onChange={onChange} value={city} />
                    <button onClick={onButtonClick} className='btn btn-warning rounded-pill mx-2'>Search</button>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col lg={6} className='bg-dark rounded txt'>
                    <span style={{ fontSize: '1.5rem' }}>Weather Type : </span> {weather} <br />
                    <span style={{ fontSize: '1.5rem' }}>Humidity : </span> {humidity}%<br />
                    <span style={{ fontSize: '1.5rem' }}>Min Temp : </span> {getCelcius(mintemp)}°C or {mintemp}°F <br />
                    <span style={{ fontSize: '1.5rem' }}>Max Temp : </span> {getCelcius(maxtemp)}°C or {maxtemp}°F <br />
                    <span style={{ fontSize: '1.5rem' }}>Feels like :</span> {getCelcius(feels)}°C or {feels}°F <br />
                    <span style={{ fontSize: '1.5rem' }}>Pressure :</span> {pressure} Pa <br />
                    <span style={{ fontSize: '1.5rem' }}>Wind Speed :</span> {wind} m/s
                </Col>
            </Row>

        </Container >
    )
}
