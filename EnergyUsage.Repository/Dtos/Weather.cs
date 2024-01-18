namespace EnergyUsage.Repository.Dtos;

public record Weather(int Id, DateTime Date, decimal Temperature, decimal AverageHumidity);