using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Linq;

namespace Intalex.NetCore.Angular.SPA.Services
{
    public class AppRouteConstraint : IRouteConstraint
    {
        private static readonly string[] invalidPrefixes = new[] { "api", "js", "css", "hubs" };

        public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var url = values[routeKey]?.ToString();

            if (string.IsNullOrEmpty(url))
                return true;

            if (invalidPrefixes.Any(p => url.StartsWith(p)))
                return false;

            return true;
        }

    }
}
