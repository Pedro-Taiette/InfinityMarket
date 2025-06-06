#!/bin/bash
set -e

# Iniciar o backend
cd /app/api
dotnet InfinityMarket.api.dll --urls "http://0.0.0.0:5000"

# Função para encerrar os processos quando o container for parado
function cleanup() {
    echo "Encerrando processos..."
    exit 0
}

# Capturar sinais para encerramento limpo
trap cleanup SIGTERM SIGINT

# Manter o container em execução
wait

