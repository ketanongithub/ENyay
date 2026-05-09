using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace ProRippleTalk.EntityFrameworkCore;

public static class ProRippleTalkDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<ProRippleTalkDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<ProRippleTalkDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
