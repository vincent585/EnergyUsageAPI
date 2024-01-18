using EnergyUsage.Repository.Dtos;
using EnergyUsage.Repository.Repositories;

namespace EnergyUsage.Repository.Seeder
{
    public class DatabaseSeeder : IDatabaseSeeder
    {
        private readonly IWeatherRepository _weatherRepository;
        private readonly IEnergyUsageRepository _energyUsageRepository;

        public DatabaseSeeder(IWeatherRepository weatherRepository, IEnergyUsageRepository energyUsageRepository)
        {
            _weatherRepository = weatherRepository ?? throw new ArgumentNullException(nameof(weatherRepository));
            _energyUsageRepository = energyUsageRepository ?? throw new ArgumentNullException(nameof(energyUsageRepository));
        }

        public void Seed()
        {
            var files = Directory.EnumerateFiles("../EnergyUsage.Repository/Data", "*.csv");

            var weatherData = new List<Weather>();
            var energyData = new List<EnergyConsumption>();
            var anomaliesData = new List<EnergyConsumption>();

            foreach (var file in files)
            {
                using var fileStream = new FileStream(file, FileMode.Open, FileAccess.Read);
                using var reader = new StreamReader(fileStream);

                var counter = 0;
                while (reader.ReadLine() is { } currentLine)
                {
                    var splitLine = currentLine.Split(',');

                    if (fileStream.Name.Contains("Weather"))
                    {
                        weatherData.Add(new Weather(counter++, DateTime.Parse(splitLine[0]), decimal.Parse(splitLine[1]), decimal.Parse(splitLine[2])));
                    }
                    else if (fileStream.Name.Contains("Anomalies"))
                    {
                        anomaliesData.Add(new EnergyConsumption(counter++, DateTime.Parse(splitLine[0]), decimal.Parse(splitLine[1])));
                    }
                    else
                    {
                        energyData.Add(new EnergyConsumption(counter++, DateTime.Parse(splitLine[0]), decimal.Parse(splitLine[1])));
                    }
                }
            }

            _weatherRepository.Seed(weatherData);
            _energyUsageRepository.Seed("Energy", energyData);
            _energyUsageRepository.Seed("EnergyAnomalies", anomaliesData);
        }
    }
}
