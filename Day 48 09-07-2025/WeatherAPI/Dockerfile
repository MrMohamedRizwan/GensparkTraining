FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

# Install openssl
RUN apt-get update && apt-get install -y openssl
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj and restore
COPY ["WeatherAPI.csproj", "./"]
RUN dotnet restore "WeatherAPI.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "WeatherAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "WeatherAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage 4: Final runtime
FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS="http://+:8080;https://+:8081"

ENTRYPOINT ["dotnet", "WeatherAPI.dll"]
