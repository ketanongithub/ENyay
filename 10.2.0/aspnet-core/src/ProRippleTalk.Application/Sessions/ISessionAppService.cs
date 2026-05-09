using Abp.Application.Services;
using ProRippleTalk.Sessions.Dto;
using System.Threading.Tasks;

namespace ProRippleTalk.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
