# ---------- Build the .NET API ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-api
WORKDIR /src
COPY InfinityMarket.api/ ./InfinityMarket.api/
WORKDIR /src/InfinityMarket.api
RUN dotnet restore InfinityMarket.api.sln
RUN dotnet publish -c Release -o /app-api InfinityMarket.api/InfinityMarket.api.csproj

# ---------- Runtime Container ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copy API
COPY --from=build-api /app-api ./api

# Entrypoint script
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]

