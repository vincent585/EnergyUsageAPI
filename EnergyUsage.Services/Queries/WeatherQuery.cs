using EnergyUsage.Repository.Dtos;
using EnergyUsage.Repository.Repositories;

namespace EnergyUsage.Services.Queries
{
    public class WeatherQuery
    {
        private readonly IWeatherRepository _weatherRepository;

        public WeatherQuery(IWeatherRepository weatherRepository)
        {
            _weatherRepository = weatherRepository ?? throw new ArgumentNullException(nameof(weatherRepository));
        }

        [GraphQLName("getWeather")]
        public async Task<IEnumerable<Weather>> GetWeather(int pageSize, int page) => await _weatherRepository.GetWeatherAsync(pageSize, page);
    }
}
