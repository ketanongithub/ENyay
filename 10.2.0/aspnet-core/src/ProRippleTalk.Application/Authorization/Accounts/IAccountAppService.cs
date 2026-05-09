using Abp.Application.Services;
using ProRippleTalk.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace ProRippleTalk.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
