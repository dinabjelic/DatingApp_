using DatingApp.Data;
using DatingApp_.API.Interface;
using DatingApp_.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp_.API.Extensions
{
    public static class ApplicatonServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();

            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(
                    config.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}
