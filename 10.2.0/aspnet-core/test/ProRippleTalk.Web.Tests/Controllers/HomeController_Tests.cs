using ProRippleTalk.Models.TokenAuth;
using ProRippleTalk.Web.Controllers;
using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace ProRippleTalk.Web.Tests.Controllers;

public class HomeController_Tests : ProRippleTalkWebTestBase
{
    [Fact]
    public async Task Index_Test()
    {
        await AuthenticateAsync(null, new AuthenticateModel
        {
            UserNameOrEmailAddress = "admin",
            Password = "123qwe"
        });

        //Act
        var response = await GetResponseAsStringAsync(
            GetUrl<HomeController>(nameof(HomeController.Index))
        );

        //Assert
        response.ShouldNotBeNullOrEmpty();
    }
}