using Abp.Application.Services;
using ProRippleTalk.MultiTenancy.Dto;

namespace ProRippleTalk.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

