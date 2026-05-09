using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ProRippleTalk.Configuration;
using ProRippleTalk.EntityFrameworkCore;
using ProRippleTalk.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace ProRippleTalk.Migrator;

[DependsOn(typeof(ProRippleTalkEntityFrameworkModule))]
public class ProRippleTalkMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public ProRippleTalkMigratorModule(ProRippleTalkEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(ProRippleTalkMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            ProRippleTalkConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(ProRippleTalkMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
