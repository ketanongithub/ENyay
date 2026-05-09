using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ProRippleTalk.EntityFrameworkCore;
using ProRippleTalk.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ProRippleTalk.Web.Tests;

[DependsOn(
    typeof(ProRippleTalkWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class ProRippleTalkWebTestModule : AbpModule
{
    public ProRippleTalkWebTestModule(ProRippleTalkEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(ProRippleTalkWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(ProRippleTalkWebMvcModule).Assembly);
    }
}