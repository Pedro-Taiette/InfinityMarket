#!/bin/bash

# Start backend
dotnet ./api/InfinityMarket.api.dll &

# Start frontend
cd client
pnpm start

wait
