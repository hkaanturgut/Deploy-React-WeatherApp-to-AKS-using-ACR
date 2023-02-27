import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default function UseEffectExample() {

    var country = 'Toronto'
    var apiKey = "3bd17d30c9cf309f9cbf592bee440b1d"
    var unit = "metric"
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=${unit}`


    const [weather, setWeather] = useState([]);

    const icon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`


    useEffect(() => {
        axios.get(url)
            .then(res => {
                setWeather({
                    name: res.data.name,
                    main: res.data.weather[0].main,
                    description: res.data.weather[0].description,
                    icon: res.data.weather[0].icon,
                    temp: res.data.main.temp,
                    feels_like: res.data.main.feels_like,
                    humidity: res.data.main.humidity,
                    sunrise: res.data.sys.sunrise,
                    sunset: res.data.sys.sunset,
                })
            })
            .catch(err => { console.log(err) })

    }, [])



    return (
        <div>
            <Card>
                <Card.Content>
                    <div className="main">
                        <p className="header"> {weather.name}</p>
                        <div class="container">
                            <img src={icon} alt="weather" />
                        </div>
                        <div className="flex day">
                            <p >Day: {moment().format('dddd')}</p>
                            <p >Sunrise: {new Date(weather.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                            <p>Sunset: {new Date(weather.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                            <p>Description: {weather.description}</p>
                            <p>Humidity: {weather.humidity} %</p>
                            <p>Date: {moment().format('LL')}</p>
                        </div>

                        <div className="flex">
                            <p className="temp">Temprature: {weather.temp} &deg;C</p>
                            <p className="temp">Humidity: {weather.humidity} %</p>
                        </div>
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}
