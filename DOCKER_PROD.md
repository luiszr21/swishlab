# 🚀 Docker Compose Production Configuration

Este arquivo contém a configuração de produção do SwishLab usando portas 3020-3029.

## 📍 Portas de Produção

| Serviço | Porta | Container | URL |
|---------|-------|-----------|-----|
| **PostgreSQL** | 3020 | swishlab-db-prod | `localhost:3020` |
| **Backend API** | 3021 | swishlab-backend-prod | `http://localhost:3021` |
| **Frontend Web** | 3022 | swishlab-frontend-prod | `http://localhost:3022` |

## 🚀 Como Usar

### Opção 1: PowerShell (Recomendado)

```powershell
# Iniciar containers de produção
.\docker-prod.ps1 up

# Ver logs em tempo real
.\docker-prod.ps1 logs

# Parar containers
.\docker-prod.ps1 down

# Reiniciar containers
.\docker-prod.ps1 restart

# Ver status dos containers
.\docker-prod.ps1 ps

# Reconstruir imagens
.\docker-prod.ps1 build
```

### Opção 2: Batch Script (Windows CMD)

```batch
# Iniciar containers de produção
docker-prod.bat up

# Ver logs
docker-prod.bat logs

# Parar containers
docker-prod.bat down
```

### Opção 3: Docker Compose Direto

```bash
# Iniciar com arquivo de produção
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Parar containers
docker-compose -f docker-compose.prod.yml down

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🔐 Configurações de Produção

### Variáveis de Ambiente (.env.prod)

```env
# Database
DB_PASSWORD=swishlab123_production_change_this

# JWT Secret (MUDE ISTO EM PRODUÇÃO!)
JWT_SECRET=sua_chave_jwt_super_secreta_mude_isto_em_producao

# API URL
EXPO_PUBLIC_API_URL=http://localhost:3021/api
```

### ⚠️ Antes de Deploying para Produção

1. **Altere as senhas:**
   ```env
   DB_PASSWORD=senha_segura_e_diferente
   JWT_SECRET=chave_secreta_longa_e_aleatoria
   ```

2. **Configure a URL correta da API:**
   ```env
   EXPO_PUBLIC_API_URL=https://seu-dominio.com/api
   ```

3. **Habilite HTTPS:**
   - Configure um reverse proxy (Nginx/Apache)
   - Use certificados SSL/TLS

4. **Configure backup do banco:**
   ```bash
   docker-compose -f docker-compose.prod.yml exec postgres \
     pg_dump -U swishlab swishlab_db > backup.sql
   ```

## 📊 Verificar Status

```powershell
# Ver todos os containers de produção
.\docker-prod.ps1 ps

# Testar saúde do backend
curl http://localhost:3021/health

# Testar endpoint de categorias
curl http://localhost:3021/api/categories
```

## 🔄 Atualizar Código em Produção

```powershell
# Parar containers
.\docker-prod.ps1 down

# Fazer pull das atualizações
git pull origin main

# Reconstruir imagens
.\docker-prod.ps1 build

# Iniciar containers novamente
.\docker-prod.ps1 up
```

## 🆘 Troubleshooting

### Porta em uso
```powershell
# Liberar porta (exemplo porta 3021)
netstat -ano | findstr :3021
taskkill /PID <PID> /F
```

### Banco de dados não conecta
```powershell
# Ver logs do banco
.\docker-prod.ps1 logs postgres
```

### Limpar tudo
```powershell
# Parar e remover containers, volumes e redes
docker-compose -f docker-compose.prod.yml down -v
```

## 📝 Notas

- Os containers têm healthchecks configurados
- Auto-restart está habilitado (`restart: always`)
- Volumes persistentes garantem dados seguros
- Network isolada para melhor segurança

## 🔗 Acesso aos Serviços

- **Frontend:** http://localhost:3022
- **Backend API:** http://localhost:3021/api
- **Health Check:** http://localhost:3021/health
- **Database:** postgresql://swishlab@localhost:3020/swishlab_db
