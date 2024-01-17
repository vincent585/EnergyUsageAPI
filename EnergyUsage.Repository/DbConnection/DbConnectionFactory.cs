using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace EnergyUsage.Repository.DbConnection
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        private readonly IConfiguration _configuration;

        public DbConnectionFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection Create()
        {
            return new SqlConnection(_configuration.GetConnectionString("Default"));
        }
    }
}
