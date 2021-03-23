using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using BITS_API.Models;
using BITS_API.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BITS_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // This will get the connection string from our appsettings.json
            services.AddDbContext<BitsDatabaseContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // this will tell the app that we want to use these services in the controller, you have to add one of these for each service you have
            services.AddScoped<IConcessionsInventoryService, ConcessionsInventoryService>();
            services.AddScoped<ICustomerInfoService, CustomerInfoService>();
            services.AddScoped<IEmployeeInfoService, EmployeeInfoService>();
            services.AddScoped<IEquipmentService, EquipmentService>();
            // Add a service for Event_Type table?
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
