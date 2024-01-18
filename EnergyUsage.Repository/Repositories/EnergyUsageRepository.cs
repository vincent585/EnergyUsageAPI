using System.Data;
using Dapper;
using EnergyUsage.Repository.DbConnection;
using EnergyUsage.Repository.Dtos;
using Z.Dapper.Plus;

namespace EnergyUsage.Repository.Repositories
{
    public class EnergyUsageRepository : IEnergyUsageRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;

        public EnergyUsageRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));
        }

        public async Task<IEnumerable<EnergyConsumption>> GetEnergyConsumptionAsync()
        {
            using var connection = _dbConnectionFactory.Create();

            return await connection.QueryAsync<EnergyConsumption>("dbo.Energy_GetAll", commandType: CommandType.StoredProcedure);

        }

        public async Task<IEnumerable<EnergyConsumption>> GetEnergyConsumptionAnomaliesAsync()
        {
            using var connection = _dbConnectionFactory.Create();

            return await connection.QueryAsync<EnergyConsumption>("dbo.Energy_GetAllAnomalies", commandType: CommandType.StoredProcedure);
        }

        public void Seed(string tableName, IEnumerable<EnergyConsumption> dataToSeed)
        {
            using var connection = _dbConnectionFactory.Create();

            DapperPlusManager.Entity<EnergyConsumption>().Table(tableName).Key(x => x.Id);

            connection.UseBulkOptions(opts => opts.InsertIfNotExists = true).BulkInsert(dataToSeed);
        }
    }
}
