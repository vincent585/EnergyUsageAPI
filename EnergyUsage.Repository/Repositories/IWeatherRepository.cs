using EnergyUsage.Repository.Dtos;

namespace EnergyUsage.Repository.Repositories
{
    public interface IWeatherRepository
    {
        Task<IEnumerable<Weather>> GetWeatherAsync(int pageSize, int page);
        void Seed(IEnumerable<Weather> dataToSeed);
    }
}
