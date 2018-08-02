using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.ResponseCompression;
using OrchardCore.Modules;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using System.Linq;
using Microsoft.AspNetCore.Blazor.Server;

namespace TheConferenceTheme
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression(options =>
            {
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                {
                    MediaTypeNames.Application.Octet,
                    WasmMediaTypeNames.Application.Wasm,
                });
            });
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseResponseCompression();
            app.MapWhen(OrchardRout, OrchardCommonRout);
        }

        private static void OrchardCommonRout(IApplicationBuilder app)
        {
            app.UseBlazor<RoadShow.Program>();
        }

        private static bool OrchardRout(HttpContext context)
        {
            if(context.Request.Path.StartsWithSegments("/Admin"))
            {
                return false;
            }
            if (context.Request.Path.StartsWithSegments("/Login"))
            {
                return false;
            }
            if (context.Request.Path.StartsWithSegments("/Error"))
            {
                return false;
            }
            if (context.Request.Path.StartsWithSegments("/admin"))
            {
                return false;
            }
            //if (context.Request.Path.StartsWithSegments("/css"))
            //{
            //    return false;
            //}
            if (context.Request.Path.StartsWithSegments("/TheConferenceTheme"))
            {
                return false;
            }
            return true;
        }
    }
}
