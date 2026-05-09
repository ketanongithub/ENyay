using Abp.Authorization;
using ProRippleTalk.Authorization.Roles;
using ProRippleTalk.Authorization.Users;

namespace ProRippleTalk.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
