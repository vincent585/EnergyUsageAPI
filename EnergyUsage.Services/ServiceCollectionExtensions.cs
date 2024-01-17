using EnergyUsage.Repository.DbConnection;
using EnergyUsage.Repository.Repositories;
using EnergyUsage.Services.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace EnergyUsage.Services
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
            services.AddScoped<IEnergyUsageRepository, EnergyUsageRepository>();
            services.AddScoped<IWeatherRepository, WeatherRepository>();

            services.AddScoped<Query>();
            services.AddScoped<WeatherQuery>();
            services.AddScoped<EnergyUsageQuery>();
            services
                .AddGraphQLServer()
                .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true)
                .AddQueryType<Query>();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAny",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }
    }
}
