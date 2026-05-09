using Abp.Zero.EntityFrameworkCore;
using ProRippleTalk.Authorization.Roles;
using ProRippleTalk.Authorization.Users;
using ProRippleTalk.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace ProRippleTalk.EntityFrameworkCore;

public class ProRippleTalkDbContext : AbpZeroDbContext<Tenant, Role, User, ProRippleTalkDbContext>
{
    /* Define a DbSet for each entity of the application */

    public ProRippleTalkDbContext(DbContextOptions<ProRippleTalkDbContext> options)
        : base(options)
    {
    }
}
