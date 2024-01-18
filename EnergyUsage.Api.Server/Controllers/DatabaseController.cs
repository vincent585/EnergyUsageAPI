using EnergyUsage.Repository.Seeder;
using Microsoft.AspNetCore.Mvc;

namespace EnergyUsage.Api.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        private readonly IDatabaseSeeder _databaseSeeder;

        public DatabaseController(IDatabaseSeeder databaseSeeder)
        {
            _databaseSeeder = databaseSeeder ?? throw new ArgumentNullException(nameof(databaseSeeder));
        }

        [HttpPost]
        public void SeedDb()
        {
            _databaseSeeder.Seed();
        }
    }
}
