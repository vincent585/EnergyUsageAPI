using EnergyUsage.Repository.Dtos;
using EnergyUsage.Repository.Repositories;

namespace EnergyUsage.Services.Queries
{
    public class EnergyUsageQuery
    {
        private readonly IEnergyUsageRepository _energyUsageRepository;

        public EnergyUsageQuery(IEnergyUsageRepository energyUsageRepository)
        {
            _energyUsageRepository = energyUsageRepository ?? throw new ArgumentNullException(nameof(energyUsageRepository));
        }

        public async Task<IEnumerable<EnergyConsumption>> GetEnergyConsumption(int pageSize, int page)
        {
            return await _energyUsageRepository.GetEnergyConsumptionAsync(pageSize, page);
        }

        public async Task<IEnumerable<EnergyConsumption>> GetConsumptionAnomalies()
        {
            return await _energyUsageRepository.GetEnergyConsumptionAnomaliesAsync();
        }
    }
}
