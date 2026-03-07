using System;
using System.Web;
using System.Web.Http;

namespace PlayerStatsAPI
{
    /// <summary>
    /// Legacy Web API Application - .NET Framework 4.8
    /// NEEDS MIGRATION to .NET 8 with minimal APIs
    /// </summary>
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Configure Web API routes
            GlobalConfiguration.Configure(WebApiConfig.Register);

            // Legacy initialization
            Console.WriteLine("🎮 Player Stats API (Legacy) starting...");
            Console.WriteLine("⚠️  WARNING: Using .NET Framework 4.8 with blocking I/O");
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            // Log the exception (in production, use proper logging)
            System.Diagnostics.Debug.WriteLine($"Application Error: {exception?.Message}");
        }

        protected void Application_End(object sender, EventArgs e)
        {
            Console.WriteLine("Player Stats API shutting down...");
        }
    }
}
