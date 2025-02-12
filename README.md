# Carrinho de Compras com NestJS e Angular

Este projeto é um sistema de carrinho de compras desenvolvido com **NestJS** no backend e **Angular** no frontend. Ele permite o cadastro de produtos, a exibição de uma lista de produtos, a visualização de detalhes de um produto e a adição/remoção de produtos no carrinho de compras.

## Funcionalidades

### Backend (NestJS)
- **Cadastro de Produtos**: Endpoint para cadastrar novos produtos com nome, descrição, preço e imagem (opcional).
- **Listagem de Produtos**: Endpoint para listar todos os produtos cadastrados.
- **Detalhes do Produto**: Endpoint para buscar os detalhes de um produto específico.
- **Validação de Dados**: Validação dos dados recebidos nos endpoints.
- **Banco de Dados**: Utilização do **PostgreSQL** com **Prisma** para armazenar os produtos.

### Frontend (Angular)
- **Lista de Produtos**: Exibe todos os produtos cadastrados, com opção de filtro por nome ou descrição.
- **Detalhes do Produto**: Página para exibir os detalhes de um produto, incluindo nome, descrição, preço e imagem.
- **Carrinho de Compras**: Permite adicionar/remover produtos e alterar a quantidade de itens no carrinho.
- **Navegação**: Rotas para navegar entre a lista de produtos, detalhes do produto e o carrinho.

## Tecnologias Utilizadas

- **Backend**:
  - NestJS
  - Prisma (ORM)
  - PostgreSQL (Banco de dados)
  - Validação de dados com `class-validator` e `class-transformer`

- **Frontend**:
  - Angular
  - Angular Router (Navegação entre páginas)
  - Angular HttpClient (Comunicação com o backend)
  - Angular Forms (Formulários e validações)

- **Outras Ferramentas**:
  - Node.js
  - npm (Gerenciador de pacotes)
  - Docker (Opcional, para rodar o PostgreSQL)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)
- PostgreSQL (ou Docker para rodar o PostgreSQL em um contêiner)
- Angular CLI (opcional, para desenvolvimento frontend)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/carrinho-compras.git
cd carrinho-compras
