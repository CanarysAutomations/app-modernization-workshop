using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace PlayerStatsAPI
{
    /// <summary>
    /// Web API Configuration - Legacy Setup
    /// Needs migration to minimal APIs in .NET 8
    /// </summary>
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Enable attribute routing
            config.MapHttpAttributeRoutes();

            // Configure default routes
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Configure JSON formatter
            var jsonFormatter = config.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            jsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;

            // Remove XML formatter (return JSON by default)
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}
