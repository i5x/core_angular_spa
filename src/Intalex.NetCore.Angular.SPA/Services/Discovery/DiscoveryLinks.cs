using Intalex.NetCore.Angular.SPA.Services.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SRF.Api.Core;
using SRF.Api.Core.Discovery;
using SRF.Platform.Api.Core;
using System.Collections.Generic;

namespace Intalex.NetCore.Angular.SPA.Services.Discovery
{
    public class DiscoveryLinks : IDiscoveryLinks
    {
        public DiscoveryLinks(IOptions<PortalProxyConfiguration> proxyOptions, IHttpContextAccessor contextAccessor)
        {
            var request = contextAccessor.HttpContext.Request;
            var links = new List<Link>();
            foreach (var proxy in proxyOptions.Value.Mappings)
            {
                links.Add(new Link(request.ToAbsolute(proxy.LocalPath).ToString(), proxy.Rel, "application/vnd.srf.disco+json"));
            }
            this.Links = links;
        }
        public IEnumerable<Link> Links { get; } = new Link[0];
    }
}
