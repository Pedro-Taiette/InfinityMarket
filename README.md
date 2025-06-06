# Infinity Market - Sistema de Cotação

Sistema de cotação para empresas, com frontend em HTML/CSS/JavaScript e backend em C#.

## Estrutura do Projeto

- **Backend**: API REST em C# (.NET 8.0)
- **Frontend**: HTML, CSS e JavaScript (Bootstrap 5)
- **Banco de Dados**: SQL Server

## Requisitos

- Docker
- Docker Compose

## Como Executar

1. Clone o repositório
2. Na pasta raiz do projeto, execute:

```bash
docker-compose up -d
```

3. Acesse o frontend em: https://localhost:3000
4. Acesse a API em: https://localhost:5000/swagger

## Funcionalidades

- Gerenciamento de empresas
- Gerenciamento de funcionários
- Publicação de anúncios de compra
- Envio de propostas
- Geração de certificados

## Tecnologias Utilizadas

- Backend: C# / .NET 8.0
- Frontend: HTML, CSS, JavaScript, Bootstrap 5
- Banco de Dados: SQL Server
- Containerização: Docker e Docker Compose

## Estrutura de Arquivos

- `/InfinityMarket.api/` - Backend em C#
- `/InfinityMarket.api/infinitymarket.client/` - Frontend
- `Dockerfile` - Configuração para construção da imagem Docker
- `docker-compose.yml` - Configuração para orquestração dos containers
- `entrypoint.sh` - Script de inicialização dos serviços

site: https://pedro-taiette.github.io/InfinityMarket/
cnpj: https://www.4devs.com.br/gerador_de_cnpj
