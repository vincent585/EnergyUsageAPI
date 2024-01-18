namespace EnergyUsage.Repository.Dtos;

public class Weather
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal Temperature { get; set; }
    public decimal AverageHumidity { get; set; }

}