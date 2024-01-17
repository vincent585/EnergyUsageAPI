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
        public Task<IEnumerable<Weather>> GetWeather() => _weatherQuery.GetWeather();

        [GraphQLName("getEnergyConsumption")]
        public Task<IEnumerable<EnergyConsumption>> GetEnergyConsumption() => _energyUsageQuery.GetEnergyConsumption();

        [GraphQLName("getConsumptionAnomalies")]
        public Task<IEnumerable<EnergyConsumption>> GetConsumptionAnomalies() => _energyUsageQuery.GetConsumptionAnomalies();
    }

}
