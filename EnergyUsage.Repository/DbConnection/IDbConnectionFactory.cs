using System.Data;

namespace EnergyUsage.Repository.DbConnection
{
    public interface IDbConnectionFactory
    {
        IDbConnection Create();
    }
}
