﻿using EnergyUsage.Repository.Dtos;

namespace EnergyUsage.Repository.Repositories
{
    public interface IWeatherRepository
    {
        Task<IEnumerable<Weather>> GetWeatherAsync();
    }
}