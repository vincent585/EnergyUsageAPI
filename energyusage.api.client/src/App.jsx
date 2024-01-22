import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './App.css';

function App() {
    const [weather, setWeather] = useState([]);
    const [energy, setEnergy] = useState([]);
    const [anomalies, setAnomalies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 48 // Adjust as needed
    const WEATHER_QUERY = gql`
        query GetWeather($pageSize: Int!, $page: Int!) {
            getWeather(pageSize: $pageSize, page: $page) {
                date
                temperature
                averageHumidity
            }
        }`;

    const ENERGY_QUERY = gql`
        query GetEnergyConsumption($pageSize: Int!, $page: Int!) {
            getEnergyConsumption(pageSize: $pageSize, page: $page) {
                time,
                consumption
            }
        }`;

    const ANOMALIES_QUERY = gql`
        query {
            getConsumptionAnomalies {
                time,
                consumption
             }
        }`;

    const weatherData = useQuery(WEATHER_QUERY, {
        variables: {
            pageSize,
            page: currentPage
        },
    })

    const energyData = useQuery(ENERGY_QUERY, {
        variables: {
            pageSize,
            page: currentPage
        },
    })

    const anomaliesData = useQuery(ANOMALIES_QUERY);

    useEffect(() => {
        console.log('Weather data:', weatherData);
        console.log('Energy data:', energyData);
        console.log('Anomalies data:', anomaliesData)

        if (!weatherData) {
            console.error('No weather data received.');
            return;
        }

        if (!energyData) {
            console.error('No energy data received.');
            return;
        }

        if (!anomaliesData) {
            console.error('No anomalies data received.');
            return;
        }

        const weatherResponse = weatherData.data?.getWeather || [];
        const energyResponse = energyData.data?.getEnergyConsumption || [];
        const anomaliesResponse = anomaliesData.data?.getConsumptionAnomalies || [];

        setWeather(weatherResponse);
        setEnergy(energyResponse);
        setAnomalies(anomaliesResponse);
    }, [weatherData, energyData, anomaliesData]);




    const options = {
        title: {
            text: 'Weather data'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%H:%M}', // Display hours and minutes
            },
            tickInterval: 30 * 60 * 1000, // 30 minutes in milliseconds
        },
        yAxis: [
            {
                title: {
                    text: 'Temperature (C)',
                },
            },
            {
                title: {
                    text: 'Energy Consumption',
                },
                opposite: true, // Display this axis on the opposite side
            },
        ],
        tooltip: {
            formatter: function () {
                const formattedX = Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x)

                const tooltipContent = `<b>${formattedX}</b><br/>
            ${this.points.map(point => {
                    let content = `${point.series.name}: ${point.y}`;
                    if (point.series.name === 'Temperature') {
                        content += ' C';
                    } else if (point.series.name === 'Humidity') {
                        content = `${point.series.name}: ${point.y * 100}%`
                    } else if (point.series.name === 'Energy Consumption') {
                        const isAnomaly = anomalies.some(anomaly => {
                            const anomalyTime = Highcharts.dateFormat('%Y-%m-%d %H:%M', new Date(anomaly.time).getTime());
                            return anomalyTime === formattedX && Math.abs(anomaly.consumption - point.y) < 0.01;
                        });

                        if (isAnomaly) {
                            content +=  `<b> (Anomaly) </b>`;
                        }
                    }
                    return content;
                }).join('<br/>')}`;
                return tooltipContent;
            },
            shared: true,
        },
        plotOptions: {
            series: {
                visible: true,
            },
        },
        series: [{
            name: 'Temperature',
            data: weather.map(w => ({
                x: new Date(w.date).getTime(),
                y: w.temperature
            }))
        },
        {
            name: 'Humidity',
            data: weather.map(w => ({
                x: new Date(w.date).getTime(),
                y: w.averageHumidity
            })),
        },
        {
            name: 'Energy Consumption',
            data: energy.map(en => ({
                x: new Date(en.time).getTime(),
                y: en.consumption
            }))
        }],

    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    const contents = weatherData.loading
       ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>

       )

    return (
        <div>
            <h1 id="tabelLabel">Weather data</h1>
            
            {contents}
            <button onClick={handlePreviousPage}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
    );
}

export default App;