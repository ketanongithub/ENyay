using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ProRippleTalk.Controllers
{
    public abstract class ProRippleTalkControllerBase : AbpController
    {
        protected ProRippleTalkControllerBase()
        {
            LocalizationSourceName = ProRippleTalkConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
