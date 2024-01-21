import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './App.css';

function App() {
    const [weather, setWeather] = useState([]);
    const [energy, setEnergy] = useState([]);
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

    useEffect(() => {
        console.log('Weather data:', weatherData);
        console.log('Energy data:', energyData);

        if (!weatherData) {
            console.error('No weather data received.');
            return;
        }

        if (!energyData) {
            console.error('No energy data received.');
            return;
        }

        // Assuming the structure of the data, adjust this based on the actual response
        const weatherResponse = weatherData.data?.getWeather || [];
        const energyResponse = energyData.data?.getEnergyConsumption || [];

        console.log('Processed Weather data:', weatherResponse);
        console.log('Processed Energy data:', energyResponse);

        setWeather(weatherResponse);
        setEnergy(energyResponse);
    }, [weatherData, energyData]);




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
                const tooltipContent = `<b>${Highcharts.dateFormat('%H:%M', this.x)}</b><br/>
                ${this.points.map(point => `
                ${point.series.name}: ${point.y} ${point.series.name === 'Temperature' ? 'C' : '%'}`).join('<br/>')}`;
                return tooltipContent;
            },
            shared: true,
        },
        series: [{
            name: 'Temperature',
            data: weather.map(w => ({
                x: new Date(w.date).getTime(),
                y: w.temperature
            }))
        },
        //{
        //    name: 'Humidity',
        //    data: weather.map(w => ({
        //        x: new Date(w.date).getTime(),
        //        y: w.averageHumidity * 100
        //    }))
        //},
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