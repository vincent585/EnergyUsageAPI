namespace EnergyUsage.Repository.Dtos;

public class EnergyConsumption
{
    public int Id { get; set; }
    public DateTime Time { get; set; }
    public decimal Consumption { get; set; }
}
