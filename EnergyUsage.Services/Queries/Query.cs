using EnergyUsage.Repository.Dtos;

namespace EnergyUsage.Services.Queries
{
    public class Query
    {
        private readonly WeatherQuery _weatherQuery;
        private readonly EnergyUsageQuery _energyUsageQuery;

        public Query(WeatherQuery weatherQuery, EnergyUsageQuery energyUsageQuery)
        {
            _weatherQuery = weatherQuery;
            _energyUsageQuery = energyUsageQuery;
        }

        [GraphQLName("getWeather")]
        public Task<IEnumerable<Weather>> GetWeather(int pageSize, int page) => _weatherQuery.GetWeather(pageSize, page);

        [GraphQLName("getEnergyConsumption")]
        public Task<IEnumerable<EnergyConsumption>> GetEnergyConsumption(int pageSize, int page) => _energyUsageQuery.GetEnergyConsumption(pageSize, page);

        [GraphQLName("getConsumptionAnomalies")]
        public Task<IEnumerable<EnergyConsumption>> GetConsumptionAnomalies() => _energyUsageQuery.GetConsumptionAnomalies();
    }

}
