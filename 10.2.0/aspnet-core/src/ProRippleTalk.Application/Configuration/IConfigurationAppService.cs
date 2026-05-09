using ProRippleTalk.Configuration.Dto;
using System.Threading.Tasks;

namespace ProRippleTalk.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
