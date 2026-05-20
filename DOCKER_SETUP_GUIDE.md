# 🚀 SwishLab - Setup Completo com Docker

Este guia fornece instruções para executar o projeto SwishLab completo (Frontend + Backend + Database) usando Docker.

## 📋 Pré-requisitos

- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Geralmente vem com Docker Desktop
- **Git** (opcional, para clonar o repositório)

## ⚡ Quick Start (Recomendado)

### 1. Windows (PowerShell)

```powershell
# Abra o PowerShell na pasta do projeto
cd C:\Users\LUISMATHEUSDOSSANTOS\swishlab

# Execute o script de setup
.\setup-docker.bat
```

### 2. Mac/Linux (Terminal)

```bash
# Navegue para a pasta do projeto
cd ~/swishlab

# Execute o script de setup
bash setup-docker.sh
```

### 3. Manual (Todos os Sistemas)

```bash
# Navegue para a pasta do projeto
cd swishlab

# Inicie os serviços
docker-compose up -d

# Aguarde ~10 segundos para os serviços iniciarem
```

---

## 📊 Serviços em Execução

Após iniciar, você terá:

| Serviço | URL | Porta |
|---------|-----|-------|
| **Backend API** | http://localhost:3000 | 3000 |
| **Frontend (Expo Web)** | http://localhost:8081 | 8081 |
| **Database (PostgreSQL)** | localhost | 5432 |

---

## 🧪 Testando a API

### Health Check

```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "timestamp": "2024-05-13T12:00:00.000Z"
}
```

### Listar Posições

```bash
curl http://localhost:3000/api/positions
```

### Registrar Usuário

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jogador1",
    "email": "jogador@exemplo.com",
    "password": "senha123"
  }'
```

---

## 🛑 Parar os Serviços

```bash
docker-compose down
```

Para remover volumes de dados também:

```bash
docker-compose down -v
```

---

## 📋 Logs

### Ver todos os logs

```bash
docker-compose logs -f
```

### Ver logs de um serviço específico

```bash
# Backend
docker-compose logs -f backend

# Database
docker-compose logs -f postgres

# Frontend
docker-compose logs -f frontend
```

---

## 🔧 Comandos Úteis

### Reconstruir imagens

```bash
docker-compose up -d --build
```

### Executar migrations manualmente

```bash
docker-compose exec backend npm run migrate
```

### Acessar o banco de dados

```bash
docker-compose exec postgres psql -U swishlab -d swishlab_db
```

### Ver status dos containers

```bash
docker-compose ps
```

---

## 📝 Variáveis de Ambiente

As variáveis de ambiente estão configuradas no `docker-compose.yml`:

**Backend (.env)**
```
PORT=3000
NODE_ENV=production
DATABASE_URL=postgresql://swishlab:swishlab123@postgres:5432/swishlab_db
JWT_SECRET=sua_chave_secreta_super_segura_aqui_mude_em_producao
JWT_EXPIRES_IN=48h
```

**Frontend**
```
EXPO_PUBLIC_SUPABASE_URL=https://vnjefdxxdnmgzjtmpbgq.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KQvtUharqZTmn0GuUul3zA_9ZrEnDjG
```

---

## 🗄️ Database

### Conexão

- **Host**: localhost
- **Porta**: 5432
- **Username**: swishlab
- **Password**: swishlab123
- **Database**: swishlab_db

### Ferramentas Recomendadas para Acessar o Database

- [pgAdmin](https://www.pgadmin.org/)
- [DBeaver](https://dbeaver.io/)
- [TablePlus](https://tableplus.com/)

---

## 🐛 Troubleshooting

### Porta já está em uso

Se receber erro de porta já ocupada:

```bash
# Encontrar o processo usando a porta
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Matar o processo ou usar uma porta diferente
```

### Backend não conecta ao database

1. Verifique se o postgres está rodando:
```bash
docker-compose ps postgres
```

2. Verifique os logs:
```bash
docker-compose logs postgres
```

3. Tente reconectar:
```bash
docker-compose restart backend
```

### Container não inicia

Verifique os logs:
```bash
docker-compose logs backend
```

Reconstrua:
```bash
docker-compose up -d --build
```

---

## 📚 Estrutura do Projeto

```
swishlab/
├── app/                              # Frontend (Expo React Native)
│   ├── auth/
│   ├── app.json
│   └── ...
├── backend/                          # API Node.js
│   ├── src/
│   │   ├── routes/
│   │   ├── database/
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml                # Orquestração de containers
├── Dockerfile                        # Frontend container
├── setup-docker.sh                   # Script setup Mac/Linux
├── setup-docker.bat                  # Script setup Windows
└── BACKEND_API_DOCUMENTATION.md      # Documentação da API
```

---

## 🔐 Segurança em Produção

⚠️ **IMPORTANTE**: Antes de usar em produção:

1. **Mude o JWT_SECRET** para uma chave segura
2. **Mude a senha do database** em `docker-compose.yml`
3. **Use variáveis de ambiente externas** em vez de hardcoded
4. **Habilite HTTPS/TLS**
5. **Configure CORS** apropriadamente
6. **Use secrets manager** (AWS Secrets, Azure Key Vault, etc)

---

## 📞 Suporte

Para problemas ou dúvidas:

1. Verifique os logs: `docker-compose logs -f`
2. Consulte a documentação da API: `BACKEND_API_DOCUMENTATION.md`
3. Veja o README do backend: `backend/README.md`

---

## ✅ Checklist Final

- [ ] Docker instalado e rodando
- [ ] docker-compose.yml no diretório raiz
- [ ] `docker-compose up -d` executado com sucesso
- [ ] http://localhost:3000/health retorna OK
- [ ] http://localhost:3000/api/positions retorna posições
- [ ] Frontend acessível em http://localhost:8081
- [ ] Database acessível em localhost:5432

---

**Criado em**: 13 de Maio de 2026
**Versão**: 1.0
