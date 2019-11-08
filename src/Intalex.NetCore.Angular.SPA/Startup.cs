using Intalex.NetCore.Angular.SPA.Services;
using Intalex.NetCore.Angular.SPA.Services.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SRF.Api.Core.NetCore;
using SRF.Api.Proxy;

namespace Intalex.NetCore.Angular.SPA
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
            services.AddMvc(o =>
            {
                o.AddDiscoveryFormatter();
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddPortalWebsiteServices(Configuration);
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
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.RunProxy(Configuration.GetSection("Proxy"));

            app.UseMvc(routes =>
            {
                routes.MapDiscovery();
                routes.MapRoute(
                    name: "partials",
                    template: "partials/{*url}",
                    defaults: new { controller = "Home", action = "Partials" });
                routes.MapRoute(
                    name: "app",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" },
                    constraints: new { url = new AppRouteConstraint() });
            });
        }
    }
}
