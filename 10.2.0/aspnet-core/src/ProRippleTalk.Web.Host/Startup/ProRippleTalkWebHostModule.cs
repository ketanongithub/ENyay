using Abp.Modules;
using Abp.Reflection.Extensions;
using ProRippleTalk.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace ProRippleTalk.Web.Host.Startup
{
    [DependsOn(
       typeof(ProRippleTalkWebCoreModule))]
    public class ProRippleTalkWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ProRippleTalkWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ProRippleTalkWebHostModule).GetAssembly());
        }
    }
}
