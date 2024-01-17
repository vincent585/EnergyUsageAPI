import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost';
import './App.css';

function App() {
    const [weather, setWeather] = useState([]);
    const WEATHER_QUERY = gql`
        query {
            getWeather {
                date
                temperature
                averageHumidity
            }
        }`;

    const { loading, error, data } = useQuery(WEATHER_QUERY)

    useEffect(() => {
        if (error) {
            console.error('Error fetching weather data:', error);
            return;
        }

        if (!loading && data) {
            console.log('Weather data:', data); // Log data to the console
            setWeather(data.getWeather);
        }
    }, [loading, data, error]);

    const contents = loading
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : (
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature (C)</th>
                        <th>Average Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {weather.map(w =>
                        <tr key={w.date}>
                            <td>{w.date}</td>
                            <td>{w.temperature}</td>
                            <td>{w.averageHumidity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
}

export default App;