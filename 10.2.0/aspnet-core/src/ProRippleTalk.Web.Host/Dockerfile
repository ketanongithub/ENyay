FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/ProRippleTalk.Web.Host/ProRippleTalk.Web.Host.csproj", "src/ProRippleTalk.Web.Host/"]
COPY ["src/ProRippleTalk.Web.Core/ProRippleTalk.Web.Core.csproj", "src/ProRippleTalk.Web.Core/"]
COPY ["src/ProRippleTalk.Application/ProRippleTalk.Application.csproj", "src/ProRippleTalk.Application/"]
COPY ["src/ProRippleTalk.Core/ProRippleTalk.Core.csproj", "src/ProRippleTalk.Core/"]
COPY ["src/ProRippleTalk.EntityFrameworkCore/ProRippleTalk.EntityFrameworkCore.csproj", "src/ProRippleTalk.EntityFrameworkCore/"]
WORKDIR "/src/src/ProRippleTalk.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/ProRippleTalk.Web.Host", "src/ProRippleTalk.Web.Host"]
COPY ["src/ProRippleTalk.Web.Core", "src/ProRippleTalk.Web.Core"]
COPY ["src/ProRippleTalk.Application", "src/ProRippleTalk.Application"]
COPY ["src/ProRippleTalk.Core", "src/ProRippleTalk.Core"]
COPY ["src/ProRippleTalk.EntityFrameworkCore", "src/ProRippleTalk.EntityFrameworkCore"]
WORKDIR "/src/src/ProRippleTalk.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "ProRippleTalk.Web.Host.dll"]
