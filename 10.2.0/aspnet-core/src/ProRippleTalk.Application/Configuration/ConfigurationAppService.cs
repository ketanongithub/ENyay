using Abp.Authorization;
using Abp.Runtime.Session;
using ProRippleTalk.Configuration.Dto;
using System.Threading.Tasks;

namespace ProRippleTalk.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : ProRippleTalkAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
