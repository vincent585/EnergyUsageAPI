using EnergyUsage.Repository.Dtos;

namespace EnergyUsage.Repository.Repositories
{
    public interface IEnergyUsageRepository
    {
        Task<IEnumerable<EnergyConsumption>> GetEnergyConsumptionAsync(int pageSize, int page);
        Task<IEnumerable<EnergyConsumption>> GetEnergyConsumptionAnomaliesAsync();
        void Seed(string tableName, IEnumerable<EnergyConsumption> dataToSeed);
    }
}
