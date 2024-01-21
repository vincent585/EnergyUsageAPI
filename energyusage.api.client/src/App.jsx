import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './App.css';

function App() {
    const [weather, setWeather] = useState([]);
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

    const { loading, error, data } = useQuery(WEATHER_QUERY, {
        variables: {
            pageSize,
            page: currentPage
        },
    })

    useEffect(() => {
        if (error) {
            console.error('Error fetching weather data:', error);
            return;
        }

        if (!loading && data) {
            console.log('Weather data:', data);
            setWeather(data.getWeather);
        }
    }, [loading, data, error]);

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
                }))
            }]
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    const contents = loading
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
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <button onClick={handlePreviousPage}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
    );
}

export default App;