# SwishLab 🏀

SwishLab é um aplicativo mobile/web de treinos de basquete com **arquitetura em camadas**: Frontend (Expo/React Native), Backend (Node.js/Express) e Banco de Dados (PostgreSQL) rodando em Docker.

## 📊 Arquitetura

```
┌─────────────────────┐
│   Frontend (Web)    │  ← Expo Web (Port 8081)
│   React Native      │
└──────────┬──────────┘
           │ API REST
           ↓
┌─────────────────────┐
│  Backend API        │  ← Node.js/Express (Port 3000)
│  TypeScript         │
└──────────┬──────────┘
           │ Query
           ↓
┌─────────────────────┐
│   PostgreSQL 16     │  ← Database (Port 5432)
│   Docker Container  │
└─────────────────────┘
```

## ✨ Funcionalidades

- ✅ Autenticação com JWT (sem Supabase)
- ✅ Cadastro e login de usuários
- ✅ Listar categorias e posições de treino
- ✅ Exibir detalhes dos treinos
- ✅ Reproduzir vídeos de treino
- ✅ Acompanhar histórico de treinos
- ✅ Persistência de sessão com AsyncStorage
- ✅ Tudo containerizado com Docker

## 📁 Estrutura do Projeto

```
swishlab/
├── frontend/              ← Aplicação Expo (React Native)
│   ├── app/              # Telas e rotas
│   ├── services/         # Chamadas à API
│   ├── components/       # Componentes reutilizáveis
│   ├── hooks/            # Hooks customizados
│   ├── constants/        # Temas e constantes
│   └── package.json
├── backend/              ← API Node.js/Express
│   ├── src/
│   │   ├── routes/       # Endpoints da API
│   │   ├── controllers/  # Lógica de negócio
│   │   ├── database/     # Connection e migrations
│   │   ├── middleware/   # Auth, error handling
│   │   └── utils/        # JWT, helpers
│   └── package.json
├── docker-compose.yml    # Orquestração (dev)
├── docker-compose.prod.yml  # Orquestração (prod)
└── README.md
```

## 🚀 Como Executar

### Desenvolvimento com Docker

```bash
# Clonar repositório
git clone https://github.com/luiszr21/swishlab.git
cd swishlab

# Iniciar tudo (Frontend + Backend + Database)
docker-compose up -d

# Acessar
# Frontend: http://localhost:8081
# Backend:  http://localhost:3000
# Database: localhost:5432
```

### Desenvolvimento Local (Frontend)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar Expo
npm start

# Opções:
# i = iOS
# a = Android
# w = Web
```

## 🔧 Tecnologias

### Frontend
- Expo
- React Native
- TypeScript
- Expo Router

### Backend
- Node.js 20
- Express 4.18
- TypeScript 5.0
- PostgreSQL 16

### DevOps
- Docker
- Docker Compose
- JWT Authentication
- bcryptjs Password Hashing

## 📋 Variáveis de Ambiente

### Development (`.env.local`)
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

### Production (`.env.prod`)
```env
EXPO_PUBLIC_API_URL=https://api.seu-dominio.com/api
DB_PASSWORD=senha_segura
JWT_SECRET=chave_secreta_longa
```

## 🌐 Portas

| Serviço | Porta (Dev) | Porta (Prod) |
|---------|-----------|------------|
| Frontend | 8081 | 3022 |
| Backend | 3000 | 3021 |
| Database | 5432 | 3020 |

## 📚 Documentação

- **[Frontend README](./frontend/README.md)** - Detalhes sobre a app mobile/web
- **[DOCKER_PROD.md](./DOCKER_PROD.md)** - Guia de produção com Docker
- **[backend/README.md](./backend/README.md)** - API backend documentation

## ⚙️ Requisitos

- Docker e Docker Compose (para executar tudo containerizado)
- Node.js 20+ (para desenvolvimento local)
- npm ou yarn

## 🔐 Autenticação

Sistema de autenticação com JWT:
- Senha criptografada com bcryptjs
- Token JWT com validade de 48h
- Token armazenado em AsyncStorage (frontend)
- Auto-injeção em todas as requisições

## 📊 Database Schema

```sql
-- Usuários
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  username VARCHAR UNIQUE,
  password_hash VARCHAR,
  created_at TIMESTAMP
);

-- Histórico de Treinos
CREATE TABLE training_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  training_id VARCHAR,
  duration_minutes INT,
  notes TEXT,
  completed_at TIMESTAMP
);
```

## 🚀 Deployment em Produção

### Com Docker Compose

```bash
# Clonar e acessar
git clone https://github.com/luiszr21/swishlab.git
cd swishlab

# Configurar variáveis
cp .env.prod .env
# Editar .env com valores de produção

# Iniciar
docker-compose -f docker-compose.prod.yml up -d

# Acompanhar logs
docker-compose -f docker-compose.prod.yml logs -f

# Scripts auxiliares (Windows)
.\docker-prod.ps1 up
.\docker-prod.ps1 logs
.\docker-prod.ps1 down
```

### Endpoints da API

```
POST   /api/auth/register       - Registrar usuário
POST   /api/auth/login          - Login
GET    /api/auth/me             - Perfil atual
POST   /api/auth/logout         - Logout

GET    /api/categories          - Listar categorias
GET    /api/positions           - Listar posições
GET    /api/trainings           - Listar treinos
GET    /api/trainings/:id       - Detalhe treino

POST   /api/users/training-history    - Adicionar ao histórico
GET    /api/users/training-history    - Ver histórico
PATCH  /api/users/training-history/:id - Atualizar notas
```

## 🔄 Fluxo de Desenvolvimento

1. **Clonar** o repositório
2. **Instalar** dependências (`npm install` em ambas as pastas)
3. **Configurar** `.env.local` com URL da API
4. **Executar** `docker-compose up -d` para backend + db
5. **Iniciar** frontend com `npm start`
6. **Acessar** em http://localhost:8081

## 🐛 Troubleshooting

**Erro de conexão com API?**
- Verificar se backend está rodando: `docker-compose ps`
- Verificar URL em `frontend/.env.local`

**Banco de dados não conecta?**
- Verificar logs: `docker-compose logs postgres`
- Deletar volumes: `docker-compose down -v`

**Porta em uso?**
- Mudar porta em `docker-compose.yml`
- Ou liberar porta: `lsof -i :8081` → `kill -9 <PID>`

## 📝 Notas Importantes

- ✅ **Autenticação Local** - JWT com bcryptjs (sem dependência de cloud)
- ✅ **Arquitetura modular** - Frontend / Backend / Database separados
- ✅ **Tudo em Docker** - Fácil deploy e replicação
- ✅ **TypeScript** - Type-safe em ambos os lados
- ✅ **Pronto para Produção** - Com docker-compose.prod.yml
- ⚠️ **Sem Supabase** - Migrado para backend local com PostgreSQL

## 📞 Suporte

Para dúvidas ou issues, abra uma issue no GitHub.
