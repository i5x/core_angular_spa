using Intalex.NetCore.Angular.SPA.Services.Configuration;
using Intalex.NetCore.Angular.SPA.Services.Discovery;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SRF.Api.Core;
using SRF.Api.Core.Discovery;
using SRF.Api.Core.Links;
using SRF.Api.Core.Mapping;

namespace Intalex.NetCore.Angular.SPA.Services.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static void AddPortalWebsiteServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<PortalProxyConfiguration>(configuration.GetSection("Proxy"));
            services.AddAutomap();
            services.AddLinkBuilder();
            services.AddDiscoveryMap<DiscoveryLinks>();
            services.AddProductInformation<Startup>();
            services.AddHttpContextAccessor();

        }
    }
}
