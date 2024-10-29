const WeatherAdvice = ({ location }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            // Fetch weather data
            const response = await fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`);
            const data = await response.json();
            setWeather(data);
        };
        fetchWeather();
    }, [location]);

    return (
        <div className="weather-advice">
            <h3>Weather-based Recommendations</h3>
            {weather && (
                <div className="weather-tips">
                    <div className="current-conditions">
                        <span className="weather-icon">🌤️</span>
                        <span>{weather.temperature}°C</span>
                    </div>
                    <div className="recommendations">
                        {generateWeatherAdvice(weather, selectedPlant)}
                    </div>
                </div>
            )}
        </div>
    );
};