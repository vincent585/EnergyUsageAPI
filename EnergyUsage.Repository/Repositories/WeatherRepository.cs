﻿using System.Data;
using Dapper;
using EnergyUsage.Repository.DbConnection;
using EnergyUsage.Repository.Dtos;
using Z.Dapper.Plus;

namespace EnergyUsage.Repository.Repositories
{
    public class WeatherRepository : IWeatherRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;

        public WeatherRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));
        }

        public async Task<IEnumerable<Weather>> GetWeatherAsync(int pageSize, int page)
        {
            using var connection = _dbConnectionFactory.Create();
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pageSize);
            parameters.Add("@Page", page);

            return await connection.QueryAsync<Weather>("dbo.Weather_GetPaged", parameters, commandType: CommandType.StoredProcedure);
        }

        public void Seed(IEnumerable<Weather> dataToSeed)
        {
            using var connection = _dbConnectionFactory.Create();

            DapperPlusManager.Entity<Weather>().Table("Weather").Key(x => x.Id);

            connection.UseBulkOptions(opts => opts.InsertIfNotExists = true).BulkInsert(dataToSeed);
        }
    }
}
