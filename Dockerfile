# ---------- Build the .NET API ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-api
WORKDIR /src
COPY InfinityMarket.api/ ./InfinityMarket.api/
WORKDIR /src/InfinityMarket.api
RUN dotnet restore
RUN dotnet publish -c Release -o /app-api


# ---------- Build the React/Next.js Client ----------
FROM node:20 AS build-client
WORKDIR /src/client
COPY InfinityMarket.api/infinitymarket.client/ ./
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate
RUN pnpm install
RUN pnpm run build


# ---------- Runtime Container ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Install Node for frontend
RUN apt-get update && \
    apt-get install -y curl ca-certificates gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g corepack && \
    corepack enable && corepack prepare pnpm@8.15.5 --activate && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy API
COPY --from=build-api /app-api ./api

# Copy built Next.js app
WORKDIR /app/client
COPY --from=build-client /src/client/.next ./.next
COPY --from=build-client /src/client/public ./public
COPY --from=build-client /src/client/node_modules ./node_modules
COPY --from=build-client /src/client/package.json ./package.json
COPY --from=build-client /src/client/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build-client /src/client/next.config.mjs ./next.config.mjs

# Back to root app directory
WORKDIR /app

# Entrypoint script
COPY entrypoint.sh .
RUN sed -i 's/\r$//' ./entrypoint.sh && chmod +x ./entrypoint.sh

# Set non-root user for safety
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

EXPOSE 5000
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]