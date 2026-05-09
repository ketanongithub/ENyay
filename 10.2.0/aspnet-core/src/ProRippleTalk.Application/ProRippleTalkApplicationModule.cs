using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ProRippleTalk.Authorization;

namespace ProRippleTalk;

[DependsOn(
    typeof(ProRippleTalkCoreModule),
    typeof(AbpAutoMapperModule))]
public class ProRippleTalkApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<ProRippleTalkAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(ProRippleTalkApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}
